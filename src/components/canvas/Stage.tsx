"use client";

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { Radar, RADAR_R, type RadarDot } from "./Radar";
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

/**
 * Dos encuadres, gobernados solo por el scroll: el radar en el cielo (01) y el skyline (02).
 * Entre uno y otro hay secciones opacas (la frase y el proceso), así que no se vuela de uno a otro:
 * la cámara se coloca de golpe en el encuadre que toca cuando su capítulo asoma, y dentro de cada
 * encuadre se mueve suave. Si volara, el skyline entraría de un salto detrás de la pantalla del 02.
 */
function CameraRig({ radarX, snapRef }: { radarX: number; snapRef: MutableRefObject<boolean> }) {
  const { camera } = useThree();
  const scene = useRef<"radar" | "city" | null>(null);
  const v = useMemo(
    () => ({
      target: new THREE.Vector3(),
      pos: new THREE.Vector3(),
      rFrom: new THREE.Vector3(),
      rTo: new THREE.Vector3(),
      cFrom: new THREE.Vector3(),
      cTo: new THREE.Vector3(),
    }),
    [],
  );

  useFrame(() => {
    const s = readScroll();
    const mobile = s.isMobile;
    const city = !!(s.onScreen.ciudad || s.onScreen.bandeja);

    if (city) {
      // 02 · Ciudad 2.5D: la foto está en el origen mirando a +z; la cámara se desplaza unos centímetros
      // (lateral y un leve dolly) y el mapa de profundidad convierte ese gesto en parallax.
      // progress.ciudad vale 0 antes de pegarse y 1 después, así que sirve también mientras entra y en la bandeja.
      const pc = s.progress.ciudad;
      if (mobile) {
        v.cFrom.set(-0.35, 0.15, CITY_DISTANCE + 0.3);
        v.cTo.set(0.35, -0.05, CITY_DISTANCE - 0.4);
      } else {
        v.cFrom.set(-0.7, 0.25, CITY_DISTANCE + 0.4);
        v.cTo.set(0.7, -0.1, CITY_DISTANCE - 0.5);
      }
      v.pos.copy(v.cFrom).lerp(v.cTo, pc);
      v.target.set(0, 0, 0);
    } else {
      // 01 · Radar: el disco ya se lee al entrar, a la derecha del titular.
      // El scroll solo lo acerca un poco; no hace falta bajar para verlo.
      const pr = s.progress.radar;
      const camX = mobile ? radarX : radarX - 3.2;
      v.rFrom.set(camX, RADAR_Y + (mobile ? 10 : 9), mobile ? 9 : 9.5);
      v.rTo.set(camX, RADAR_Y + (mobile ? 8 : 7), mobile ? 7.2 : 8);
      v.pos.copy(v.rFrom).lerp(v.rTo, pr);
      v.target.set(camX, RADAR_Y, mobile ? -1.2 : -0.6);
    }

    const which = city ? "city" : "radar";
    if (snapRef.current || scene.current !== which) {
      // cambio de encuadre o canvas recién encendido: sin vuelo
      camera.position.copy(v.pos);
      snapRef.current = false;
      scene.current = which;
    } else {
      camera.position.lerp(v.pos, 0.16);
    }
    camera.lookAt(v.target);
  });
  return null;
}

/**
 * Un único canvas fijo detrás de la página. Solo trabaja en los tramos que lo necesitan
 * (01 y 02). La intro no lo enciende: el radar entra con su sección.
 */
export function Stage() {
  const [on, setOn] = useState(true);
  const [mobile, setMobile] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const snap = useRef(false);
  const wasOn = useRef(true);

  useEffect(() => {
    const apply = () => {
      const s = useScroll.getState();
      const o = s.onScreen;
      // mientras alguna pantalla transparente toque el viewport (la de la bandeja solo al principio: después se funde a negro)
      const next = !!(o.radar || o.ciudad || (o.bandeja && s.progress.bandeja < 0.3));
      if (next && !wasOn.current) snap.current = true;
      wasOn.current = next;
      setOn(next);
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
        <CameraRig radarX={radarX} snapRef={snap} />
        <group position={[radarX, RADAR_Y, 0]}>
          <Radar dots={dots} />
        </group>
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.4} intensity={mobile ? 0.6 : 0.9} mipmapBlur radius={0.7} />
          <Vignette eskil={false} offset={0.2} darkness={0.75} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
