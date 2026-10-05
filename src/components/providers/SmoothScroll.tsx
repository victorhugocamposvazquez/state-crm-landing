"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScroll } from "@/lib/store";

gsap.registerPlugin(ScrollTrigger);

/** Native scrolling; GSAP observes it without intercepting wheel, touch or anchor events. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 1099px)");
    const updateEnvironment = () => {
      useScroll.getState().setEnv({ reducedMotion: motion.matches, isMobile: mobile.matches });
      ScrollTrigger.refresh();
    };
    updateEnvironment();
    motion.addEventListener("change", updateEnvironment);
    mobile.addEventListener("change", updateEnvironment);

    const globalTrigger = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => useScroll.getState().setGlobal(self.progress),
    });
    // Expanding the plan comparison changes all following anchor positions.
    const resize = new ResizeObserver(() => ScrollTrigger.refresh());
    resize.observe(document.body);
    return () => {
      resize.disconnect();
      motion.removeEventListener("change", updateEnvironment);
      mobile.removeEventListener("change", updateEnvironment);
      globalTrigger.kill();
    };
  }, []);
  return <>{children}</>;
}
