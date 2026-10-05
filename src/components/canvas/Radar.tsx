"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { readScroll } from "@/lib/store";

export const RADAR_R = 4.2;
const TAU = Math.PI * 2;

const sweepVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const sweepFrag = /* glsl */ `
  varying vec2 vUv;
  uniform float uAngle;
  uniform float uOpacity;
  void main() {
    vec2 p = vUv - 0.5;
    float r = length(p) * 2.0;
    if (r > 1.0) discard;
    float a = atan(p.y, p.x);
    float d = mod(uAngle - a, 6.28318530718);
    float sweep = smoothstep(1.2, 0.0, d) * 0.11;
    float edge = smoothstep(0.025, 0.0, d) * 0.7;
    float alpha = (sweep + edge) * (0.3 + 0.7 * r) * uOpacity;
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
  }
`;

function circlePoints(radius: number, n = 96): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * TAU;
    pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
  }
  return pts;
}

export interface RadarDot {
  x: number;
  z: number;
  kind: "new" | "ok" | "alert";
}

/**
 * El radar: disco de anillos hairline, barrido que gira por tiempo y puntos (anuncios)
 * que se encienden cada vez que el barrido pasa. Vive en el prólogo y el capítulo 01.
 */
export function Radar({ dots }: { dots: RadarDot[] }) {
  const group = useRef<THREE.Group>(null);
  const sweepMat = useRef<THREE.ShaderMaterial>(null);
  const inst = useRef<THREE.InstancedMesh>(null);
  const ringMats = useRef<THREE.Material[]>([]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const rings = useMemo(() => [RADAR_R, RADAR_R * 0.75, RADAR_R * 0.5, RADAR_R * 0.25].map((r) => circlePoints(r)), []);

  useEffect(() => {
    const m = inst.current;
    if (!m) return;
    const c = new THREE.Color();
    dots.forEach((d, i) => {
      c.set(d.kind === "ok" ? "#22C55E" : d.kind === "alert" ? "#D4A017" : "#FFFFFF");
      m.setColorAt(i, c);
    });
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [dots]);

  useFrame((state) => {
    const s = readScroll();
    const t = state.clock.elapsedTime;
    // los progresos se quedan en 0 antes del capítulo y en 1 después: sirven también fuera del tramo pegado
    const pr = s.progress.radar;
    const pp = s.progress.prologo;
    const o = s.onScreen;
    // solo mientras el prólogo o el 01 tocan el viewport; nunca con la ciudad (ahí el fondo es el skyline)
    const visible = !!(o.prologo || o.radar) && !(o.ciudad || o.bandeja);
    if (group.current) group.current.visible = visible;
    if (!visible) return;

    // Opacidad: entra durante el prólogo, se apaga en el último tramo del 01
    const fadeIn = Math.min(1, pp / 0.7);
    const fadeOut = 1 - Math.max(0, pr - 0.85) / 0.15;
    const opacity = Math.max(0, Math.min(1, fadeIn * fadeOut));

    const angle = -t * 0.8;
    if (sweepMat.current) {
      sweepMat.current.uniforms.uAngle.value = angle;
      sweepMat.current.uniforms.uOpacity.value = opacity;
    }
    ringMats.current.forEach((m) => {
      (m as THREE.Material & { opacity: number }).opacity = opacity;
    });

    if (inst.current) {
      const lift = Math.max(0, pr - 0.8) / 0.2;
      dots.forEach((d, i) => {
        // El plano del barrido está girado -90° en X: su ángulo uv equivale a atan2(-z, x)
        const a = Math.atan2(-d.z, d.x);
        const da = (((angle - a) % TAU) + TAU) % TAU; // 0 = el barrido acaba de pasar
        const revealed = t > 0.4 + i * 0.22;
        const pulse = 1 - Math.min(1, da / TAU) * 0.75;
        const sc = revealed ? 0.035 + pulse * 0.04 : 0.0001;
        dummy.position.set(d.x, 0.04 + lift * (2.5 + (i % 5) * 0.4), d.z);
        dummy.scale.setScalar(sc * (1 - lift * 0.5));
        dummy.updateMatrix();
        inst.current!.setMatrixAt(i, dummy.matrix);
      });
      inst.current.instanceMatrix.needsUpdate = true;
      (inst.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  return (
    <group ref={group}>
      {rings.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={i === 0 ? "#3A3A3A" : "#262626"}
          lineWidth={1}
          transparent
          ref={(l) => {
            if (l) ringMats.current[i] = (l as unknown as THREE.Mesh).material as THREE.Material;
          }}
        />
      ))}
      <Line points={[[-RADAR_R, 0, 0], [RADAR_R, 0, 0]]} color="#1C1C1C" lineWidth={1} transparent ref={(l) => { if (l) ringMats.current[4] = (l as unknown as THREE.Mesh).material as THREE.Material; }} />
      <Line points={[[0, 0, -RADAR_R], [0, 0, RADAR_R]]} color="#1C1C1C" lineWidth={1} transparent ref={(l) => { if (l) ringMats.current[5] = (l as unknown as THREE.Mesh).material as THREE.Material; }} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[RADAR_R * 2, RADAR_R * 2]} />
        <shaderMaterial
          ref={sweepMat}
          vertexShader={sweepVert}
          fragmentShader={sweepFrag}
          uniforms={{ uAngle: { value: 0 }, uOpacity: { value: 1 } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.15, 32]} />
        <meshBasicMaterial color="#fff" transparent ref={(m) => { if (m) ringMats.current[6] = m; }} />
      </mesh>
      <instancedMesh ref={inst} args={[undefined, undefined, dots.length]} frustumCulled={false}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color="#fff" transparent toneMapped={false} />
      </instancedMesh>
    </group>
  );
}
