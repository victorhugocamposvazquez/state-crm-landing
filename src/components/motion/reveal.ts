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
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", el);
      gsap.fromTo(items.length ? items : el, { y: 14 }, {
        y: 0, duration: 0.5, ease: "power3.out", stagger: 0.035,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);
    return () => media.revert();
  }, [scope]);
}
