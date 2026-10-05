"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Aparición suave de un bloque en flujo normal (los textos largos, los planes): una sola vez,
 * cuando entra en pantalla. Los hijos marcados con `data-reveal` suben escalonados.
 * Con prefers-reduced-motion no hay animación.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.fromTo(
        items.length ? items : el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [scope]);
}
