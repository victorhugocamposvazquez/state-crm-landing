"use client";

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Radar, RADAR_R, type RadarDot } from "./Radar";
import { readScroll, useScroll } from "@/lib/store";

const TAU = Math.PI * 2;
export const RADAR_Y = 26;

function seeded(seed: number) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
}

function CameraRig({ radarX, snapRef }: { radarX: number; snapRef: MutableRefObject<boolean> }) {
  const { camera } = useThree();
  useFrame(() => {
    const mobile = readScroll().isMobile;
    const x = mobile ? radarX : radarX - 3.2;
    camera.position.set(x, RADAR_Y + 12, 11);
    camera.lookAt(x, RADAR_Y, -0.6);
    snapRef.current = false;
  });
  return null;
}

/** The decorative radar rests outside the hero and when motion is reduced. */
export function Stage() {
  const [on, setOn] = useState(false);
  const [mobile, setMobile] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const snap = useRef(false);
  const wasOn = useRef(false);

  useEffect(() => {
    const apply = () => {
      const s = useScroll.getState();
      const o = s.onScreen;
      // The photographic scene is rendered in its own accessible DOM section.
      const next = !!o.radar && !s.reducedMotion;
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
        dpr={[1, mobile ? 1 : 1.5]}
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
