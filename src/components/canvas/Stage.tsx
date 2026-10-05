"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { Radar, RADAR_R, type RadarDot } from "./Radar";
import { CityPhoto } from "./CityPhoto";
import { readScroll, useScroll } from "@/lib/store";

const TAU = Math.PI * 2;
/** El radar flota en el cielo, por encima del skyline; la cámara desciende a través de él. */
export const RADAR_Y = 26;
/** Distancia de la cámara a la foto de la ciudad. */
export const CITY_DISTANCE = 10;

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/** La cámara va en una curva: del radar en el cielo (01) al skyline (02), gobernada solo por el scroll. */
function CameraRig({ radarX }: { radarX: number }) {
  const { camera } = useThree();
  const v = useMemo(
    () => ({
      target: new THREE.Vector3(),
      pos: new THREE.Vector3(),
      rFrom: new THREE.Vector3(),
      rTo: new THREE.Vector3(),
      rPos: new THREE.Vector3(),
      rTarget: new THREE.Vector3(),
      cFrom: new THREE.Vector3(),
      cTo: new THREE.Vector3(),
      cPos: new THREE.Vector3(),
      cTarget: new THREE.Vector3(),
    }),
    [],
  );

  useFrame(() => {
    const s = readScroll();
    const mobile = s.isMobile;

    // 01 · Radar: alto y lejos → desciende hacia el disco. En escritorio el disco queda a la derecha del titular.
    const pr = s.active === "prologo" ? 0 : s.active === "radar" ? s.progress.radar : 1;
    const camX = mobile ? radarX : radarX - 3.2;
    v.rFrom.set(camX, RADAR_Y + (mobile ? 15 : 14), mobile ? 11 : 12);
    v.rTo.set(camX, RADAR_Y + (mobile ? 8.5 : 7.5), mobile ? 7.5 : 8.5);
    v.rPos.copy(v.rFrom).lerp(v.rTo, pr);
    v.rTarget.set(camX, RADAR_Y, mobile ? -1.2 : -0.6);

    // 02 · Ciudad 2.5D: la foto está en el origen mirando a +z; la cámara se desplaza unos centímetros
    // (lateral y un leve dolly) y el mapa de profundidad convierte ese gesto en parallax
    const pc = s.active === "ciudad" ? s.progress.ciudad : s.active === "bandeja" ? 1 : 0;
    if (mobile) {
      v.cFrom.set(-0.35, 0.15, CITY_DISTANCE + 0.3);
      v.cTo.set(0.35, -0.05, CITY_DISTANCE - 0.4);
    } else {
      v.cFrom.set(-0.7, 0.25, CITY_DISTANCE + 0.4);
      v.cTo.set(0.7, -0.1, CITY_DISTANCE - 0.5);
    }
    v.cTarget.set(0, 0, 0);
    v.cPos.copy(v.cFrom).lerp(v.cTo, pc);

    // Mezcla entre escenas al principio del 02 (la cámara baja del cielo al skyline)
    const blend = s.active === "ciudad" ? Math.min(1, s.progress.ciudad / 0.12) : s.active === "bandeja" ? 1 : 0;
    const eased = blend * blend * (3 - 2 * blend);
    v.pos.copy(v.rPos).lerp(v.cPos, eased);
    v.target.copy(v.rTarget).lerp(v.cTarget, eased);

    camera.position.lerp(v.pos, 0.16);
    camera.lookAt(v.target);
  });
  return null;
}

/**
 * Un único canvas fijo detrás de la página. Solo trabaja en los tramos que lo necesitan
 * (prólogo, 01, 02) y se oculta en el resto para no gastar GPU.
 */
export function Stage() {
  const [on, setOn] = useState(true);
  const [mobile, setMobile] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apply = () => {
      const s = useScroll.getState();
      const active = s.active === "prologo" || s.active === "radar" || s.active === "ciudad" || (s.active === "bandeja" && s.progress.bandeja < 0.3);
      setOn(active);
      setMobile(s.isMobile);
    };
    apply();
    return useScroll.subscribe(apply);
  }, []);

  const dots = useMemo(() => {
    const r = seeded(3);
    const arr: RadarDot[] = [];
    for (let i = 0; i < 26; i++) {
      const a = r() * TAU;
      const rad = 0.8 + Math.sqrt(r()) * (RADAR_R - 0.4);
      const k = r();
      arr.push({ x: Math.cos(a) * rad, z: Math.sin(a) * rad, kind: k < 0.7 ? "new" : k < 0.9 ? "ok" : "alert" });
    }
    return arr;
  }, []);

  const radarX = mobile ? 0 : 4;

  return (
    <div ref={wrap} className="pointer-events-none fixed inset-0 z-0" style={{ visibility: on ? "visible" : "hidden" }} aria-hidden="true">
      <Canvas
        dpr={[1, mobile ? 1.5 : 2]}
        camera={{ fov: 34, near: 0.1, far: 120, position: [0.8, RADAR_Y + 14, 12] }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        frameloop={on ? "always" : "never"}
      >
        <color attach="background" args={["#0A0A0A"]} />
        <CameraRig radarX={radarX} />
        <group position={[radarX, RADAR_Y, 0]}>
          <Radar dots={dots} />
        </group>
        <CityPhoto distance={CITY_DISTANCE} />
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.4} intensity={mobile ? 0.6 : 0.9} mipmapBlur radius={0.7} />
          <Vignette eskil={false} offset={0.2} darkness={0.75} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
