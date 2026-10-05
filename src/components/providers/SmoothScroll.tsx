"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScroll } from "@/lib/store";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis + GSAP ScrollTrigger, con un único ticker.
 * En móvil Lenis deja mandar al scroll nativo (syncTouch) y las secciones usan sticky, no pin.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    useScroll.getState().setEnv({ reducedMotion: reduced, isMobile: mobile });

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: !reduced,
      syncTouch: false,
      anchors: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => {
      useScroll.getState().setEnv({ isMobile: window.matchMedia("(max-width: 767px)").matches });
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    const globalST = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => useScroll.getState().setGlobal(self.progress),
    });

    return () => {
      window.removeEventListener("resize", onResize);
      globalST.kill();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
