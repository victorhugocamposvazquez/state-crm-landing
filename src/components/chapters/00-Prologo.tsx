"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";

/**
 * Prólogo: negro, un reloj que avanza de 06:59:40 a 07:00:00 mientras carga,
 * y una frase. Luego el radar ya está debajo.
 */
export function Prologo() {
  const clock = useRef<HTMLSpanElement>(null);
  const line = useRef<HTMLParagraphElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useScrollTimeline(stage, (tl, q) => {
    tl.to(q(".fade"), { opacity: 0, y: -24, duration: 0.5 }, 0.4);
  });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { s: 40 };
    const tl = gsap.timeline();
    if (reduced) {
      if (clock.current) clock.current.textContent = "07:00:00";
      gsap.set([line.current], { opacity: 1 });
      return;
    }
    tl.to(state, {
      s: 60,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        const sec = Math.floor(state.s);
        if (clock.current) clock.current.textContent = sec >= 60 ? "07:00:00" : `06:59:${String(sec).padStart(2, "0")}`;
      },
    })
      .fromTo(ring.current, { strokeDashoffset: 2 * Math.PI * 12 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0)
      .fromTo(line.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 }, 1.2);
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Chapter id="prologo">
      <div ref={stage} className="relative flex h-full flex-col items-center justify-center gutter">
        <svg width="56" height="56" viewBox="0 0 44 44" fill="none" aria-hidden="true" className="fade mb-8">
          <circle cx="22" cy="22" r="12" stroke="#6E6E6E" strokeWidth="6" />
          <circle
            ref={ring}
            cx="22"
            cy="22"
            r="12"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeDasharray={2 * Math.PI * 12}
            strokeDashoffset={2 * Math.PI * 12}
            transform="rotate(-90 22 22)"
          />
        </svg>
        <span ref={clock} className="fade mono text-[40px] font-medium tracking-[-0.02em] text-white8 md:text-[64px]">
          06:59:40
        </span>
        <p ref={line} className="fade mt-8 max-w-[520px] text-center text-[16px] leading-[1.6] text-grey6 md:text-[18px]" style={{ opacity: 0 }}>
          Cada día, en una ciudad cualquiera, alguien decide vender su casa.
        </p>
        <span className="fade mono absolute bottom-10 text-[11px] tracking-[0.14em] text-grey4">DESLIZA ↓</span>
      </div>
    </Chapter>
  );
}
