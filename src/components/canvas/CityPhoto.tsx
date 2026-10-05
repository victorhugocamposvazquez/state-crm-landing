"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { cityPhoto, listings, euro } from "@/lib/script";
import { readScroll } from "@/lib/store";

/**
 * LA CIUDAD 2.5D.
 * Una fotografía nocturna (base), la misma con los edificios protagonistas encendidos (lit) y su mapa de
 * profundidad (depth). El plano se desplaza en profundidad según el mapa, así el ligero movimiento de cámara
 * del scroll produce parallax real; cada anuncio enciende su edificio con una máscara circular y cuelga su tarjeta.
 *
 * Las imágenes se generan FUERA (IA de imagen + estimador de profundidad); aquí solo se montan. Ver script.ts → cityPhoto.
 */

const MAX_ANCHORS = 8;
const MAX_SPARKS = 24;

const vert = /* glsl */ `
  uniform sampler2D uDepth;
  uniform float uStrength;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    float d = texture2D(uDepth, uv).r;
    vec3 p = position;
    p.z += (d - 0.5) * uStrength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  uniform sampler2D uBase;
  uniform sampler2D uLit;
  uniform float uOpacity;
  uniform float uAspect;
  uniform vec4 uAnchors[${MAX_ANCHORS}];   // u, v, radio, intensidad
  uniform vec3 uTints[${MAX_ANCHORS}];
  uniform vec3 uSparks[${MAX_SPARKS}];     // u, v, intensidad
  uniform vec3 uBg;
  varying vec2 vUv;

  void main() {
    vec3 base = texture2D(uBase, vUv).rgb;
    vec3 lit = texture2D(uLit, vUv).rgb;
    float blend = 0.0;
    vec3 glow = vec3(0.0);
    for (int i = 0; i < ${MAX_ANCHORS}; i++) {
      vec4 a = uAnchors[i];
      if (a.w <= 0.0) continue;
      vec2 d = (vUv - a.xy) * vec2(uAspect, 1.0);
      float dist = length(d);
      float m = smoothstep(a.z, a.z * 0.35, dist) * a.w;
      blend = max(blend, m);
      glow += uTints[i] * smoothstep(a.z * 1.6, 0.0, dist) * a.w * 0.07;
    }
    vec3 col = mix(base, lit, blend) + glow;
    for (int i = 0; i < ${MAX_SPARKS}; i++) {
      vec3 s = uSparks[i];
      if (s.z <= 0.0) continue;
      vec2 d = (vUv - s.xy) * vec2(uAspect, 1.0);
      float dist = length(d);
      // una ventana que se enciende: punto nítido + halo suave
      col += vec3(1.0) * (smoothstep(0.006, 0.0, dist) * 0.9 + smoothstep(0.02, 0.0, dist) * 0.12) * s.z;
    }
    col = mix(uBg, col, uOpacity);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const revealAt = (i: number) => 0.08 + i * 0.16;
const kindColor = (k: (typeof listings)[number]["kind"]) => (k === "particular" ? "#22C55E" : k === "encubierta" ? "#D4A017" : "#FFFFFF");

/** Carga las tres imágenes y, además, deja el mapa de profundidad legible desde JS para colocar las tarjetas. */
function useCityTextures() {
  const [tex, setTex] = useState<{ base: THREE.Texture; lit: THREE.Texture; depth: THREE.Texture; sample: (u: number, v: number) => number } | null>(null);
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let alive = true;
    Promise.all([loader.loadAsync(cityPhoto.base), loader.loadAsync(cityPhoto.lit), loader.loadAsync(cityPhoto.depth)]).then(([base, lit, depth]) => {
      if (!alive) return;
      for (const t of [base, lit]) t.colorSpace = THREE.SRGBColorSpace;
      for (const t of [base, lit, depth]) {
        t.minFilter = THREE.LinearFilter;
        t.generateMipmaps = false;
      }
      // lectura del mapa de profundidad para anclar tarjetas
      const img = depth.image as HTMLImageElement;
      const c = document.createElement("canvas");
      c.width = 256;
      c.height = 144;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0, 256, 144);
      const data = ctx.getImageData(0, 0, 256, 144).data;
      const sample = (u: number, v: number) => {
        const x = Math.max(0, Math.min(255, Math.round(u * 255)));
        const y = Math.max(0, Math.min(143, Math.round(v * 143)));
        return data[(y * 256 + x) * 4] / 255;
      };
      setTex({ base, lit, depth, sample });
    });
    return () => {
      alive = false;
    };
  }, []);
  return tex;
}

export function CityPhoto({ distance = 10 }: { distance?: number }) {
  const tex = useCityTextures();
  const { camera, size } = useThree();
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);

  // El plano cubre el viewport a la distancia de la cámara, con un 14 % de margen para el parallax
  const plane = useMemo(() => {
    const fov = ((camera as THREE.PerspectiveCamera).fov * Math.PI) / 180;
    const visH = 2 * distance * Math.tan(fov / 2);
    const visW = visH * (size.width / size.height);
    let w = visW * 1.14;
    let h = w / cityPhoto.aspect;
    if (h < visH * 1.14) {
      h = visH * 1.14;
      w = h * cityPhoto.aspect;
    }
    return { w, h };
  }, [camera, size.width, size.height, distance]);

  const uniforms = useMemo(
    () => ({
      uBase: { value: null as THREE.Texture | null },
      uLit: { value: null as THREE.Texture | null },
      uDepth: { value: null as THREE.Texture | null },
      uStrength: { value: cityPhoto.depthStrength },
      uOpacity: { value: 0 },
      uAspect: { value: cityPhoto.aspect },
      uAnchors: { value: Array.from({ length: MAX_ANCHORS }, () => new THREE.Vector4(0, 0, 0, 0)) },
      uTints: { value: Array.from({ length: MAX_ANCHORS }, () => new THREE.Vector3(1, 1, 1)) },
      uSparks: { value: Array.from({ length: MAX_SPARKS }, () => new THREE.Vector3(0, 0, 0)) },
      uBg: { value: new THREE.Color("#0A0A0A") },
    }),
    [],
  );

  // R3F clona el objeto `uniforms` al crear el material: se trabaja siempre sobre los del material.
  useEffect(() => {
    const m = mat.current;
    if (!tex || !m) return;
    const u = m.uniforms as typeof uniforms;
    u.uBase.value = tex.base;
    u.uLit.value = tex.lit;
    u.uDepth.value = tex.depth;
    cityPhoto.anchors.forEach((a, i) => {
      const c = new THREE.Color(kindColor(listings[a.listing].kind));
      u.uTints.value[i].set(c.r, c.g, c.b);
      u.uAnchors.value[i].set(a.u, a.v, a.r, 0);
    });
    cityPhoto.sparks.forEach(([su, sv], i) => u.uSparks.value[i].set(su, sv, 0));
    m.needsUpdate = true;
  }, [tex, uniforms]);

  useFrame(() => {
    const s = readScroll();
    const visible = s.active === "ciudad" || s.active === "bandeja" || (s.active === "radar" && s.progress.radar > 0.8);
    if (group.current) group.current.visible = visible && !!tex;
    if (!visible || !tex) return;
    const m = mat.current;
    if (!m) return;
    const u = m.uniforms as typeof uniforms;
    const p = s.active === "ciudad" ? s.progress.ciudad : s.active === "bandeja" ? 1 : 0;
    const fadeIn = s.active === "radar" ? 0 : Math.min(1, p / 0.14);
    const fadeOut = s.active === "bandeja" ? Math.max(0, 1 - s.progress.bandeja / 0.25) : 1;
    u.uOpacity.value = fadeIn * fadeOut;
    cityPhoto.anchors.forEach((a, i) => {
      const at = revealAt(i);
      u.uAnchors.value[i].w = p >= at ? Math.min(1, (p - at) / 0.04) : 0;
    });
    cityPhoto.sparks.forEach((_, i) => {
      const at = 0.12 + (i / cityPhoto.sparks.length) * 0.7;
      u.uSparks.value[i].z = p >= at ? Math.min(1, (p - at) / 0.03) : 0;
    });
  });

  return (
    <group ref={group} visible={false}>
      <mesh>
        <planeGeometry args={[plane.w, plane.h, 192, 108]} />
        <shaderMaterial ref={mat} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} />
      </mesh>
      {tex &&
        cityPhoto.anchors.map((a, i) => {
          const d = tex.sample(a.u, a.v);
          const pos: [number, number, number] = [(a.u - 0.5) * plane.w, (0.5 - a.v) * plane.h, (d - 0.5) * cityPhoto.depthStrength + 0.02];
          return <ListingCard key={a.listing} position={pos} index={i} side={a.side} />;
        })}
    </group>
  );
}

function ListingCard({ position, index, side }: { position: [number, number, number]; index: number; side: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const l = listings[cityPhoto.anchors[index].listing];
  const color = kindColor(l.kind);
  const isHero = index === 0;
  const at = revealAt(index);

  useFrame(() => {
    const el = ref.current;
    if (!el) return;
    const s = readScroll();
    const p = s.active === "ciudad" ? s.progress.ciudad : s.active === "bandeja" ? 1 : 0;
    const t = Math.max(0, Math.min(1, (p - at) / 0.05));
    const end = s.active === "bandeja" ? 1 : Math.max(0, (p - 0.86) / 0.1);
    const vis = s.isMobile ? 0 : t * (1 - end); // en móvil las tarjetas van en DOM, apiladas abajo
    el.style.opacity = String(vis);
    el.style.transform = `translateY(${(1 - t) * 16}px)`;
  });

  const lineH = isHero ? 96 : 64;
  return (
    <Html position={position} zIndexRange={[20, 10]} style={{ pointerEvents: "none" }} center={false}>
      <div ref={ref} className="flex flex-col items-start" style={{ opacity: 0, transform: "translateY(16px)" }}>
        <div className="ml-[3px] w-px" style={{ height: lineH, background: `linear-gradient(to top, ${color}, #737373)` }} />
        <div
          className="card flex w-[280px] flex-col gap-[7px] px-4 py-[13px] md:w-[320px]"
          style={{
            marginTop: -lineH - (isHero ? 118 : 96),
            marginLeft: side === "left" ? -316 : 0,
            borderColor: isHero ? color : "#3A3A3A",
            boxShadow: isHero ? `0 0 0 1px ${color}40, 0 30px 60px rgba(0,0,0,.7)` : undefined,
          }}
        >
          <div className="mono flex items-center justify-between gap-2 text-[11px] text-grey5">
            <span className="whitespace-nowrap">
              hace {1 + index * 3} min · {l.portal}
            </span>
            <span className={`st ${l.kind === "particular" ? "st-g" : l.kind === "encubierta" ? "st-a" : "st-n"}`}>
              {l.kind === "particular" ? `● particular${l.phone === "capturado" ? " · tel." : ""}` : l.kind === "encubierta" ? "● agencia encubierta" : "agencia"}
            </span>
          </div>
          <div className="text-[15px] font-medium text-white8">{l.title}</div>
          <div className="flex gap-[10px] text-[12px] text-grey6">
            <span>
              <b className="font-medium text-white8">{l.m2}</b> m²
            </span>
            <span>
              <b className="font-medium text-white8">{l.rooms}</b> hab
            </span>
            <span>
              <b className="font-medium text-white8">{l.baths}</b> baños
            </span>
            <span>
              <b className="font-medium text-white8">{euro(l.price)}</b>
            </span>
          </div>
          {isHero && <div className="mono text-[11px] text-grey5">id.{l.id} · 3º izq · 14 fotos · asignado a Ana</div>}
        </div>
      </div>
    </Html>
  );
}
