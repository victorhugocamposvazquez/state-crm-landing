"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Chapter } from "@/components/motion/Chapter";
import { scrollTo } from "@/components/providers/SmoothScroll";

const R = 12;
const C = 2 * Math.PI * R;

/**
 * Prólogo: el anillo nace grande y vacío, se carga hasta el logo
 * y vuela a la cabecera mientras la página pasa al radar.
 * El logo de la cabecera sigue con su propio círculo.
 */
export function Prologo() {
  const clock = useRef<HTMLSpanElement>(null);
  const line = useRef<HTMLParagraphElement>(null);
  const base = useRef<SVGCircleElement>(null);
  const arc = useRef<SVGCircleElement>(null);
  const mark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const settle = () => {
      if (clock.current) clock.current.textContent = "07:00:00";
      gsap.set(line.current, { opacity: 1, y: 0 });
      gsap.set(base.current, { strokeDashoffset: 0 });
      gsap.set(arc.current, { strokeDashoffset: C * 0.75 });
    };
    if (reduced) {
      settle();
      return;
    }

    const state = { s: 40 };
    let fly: gsap.core.Tween | null = null;
    let ghost: HTMLElement | null = null;

    const handoff = () => {
      const el = mark.current;
      const logo = document.querySelector<SVGElement>("[data-logo-mark]");
      const next = document.getElementById("radar");
      if (!el || !logo || !next) return;
      if (window.scrollY > 24) return;

      const from = el.getBoundingClientRect();
      if (from.bottom < 0 || from.top > window.innerHeight) return;
      const to = logo.getBoundingClientRect();

      ghost = el.cloneNode(true) as HTMLElement;
      ghost.setAttribute("aria-hidden", "true");
      ghost.style.position = "fixed";
      ghost.style.left = `${from.left}px`;
      ghost.style.top = `${from.top}px`;
      ghost.style.width = `${from.width}px`;
      ghost.style.height = `${from.height}px`;
      ghost.style.margin = "0";
      ghost.style.zIndex = "60";
      ghost.style.pointerEvents = "none";
      document.body.appendChild(ghost);
      gsap.set(el, { opacity: 0 });

      fly = gsap.to(ghost, {
        left: to.left,
        top: to.top,
        width: to.width,
        height: to.height,
        duration: 0.95,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.to(ghost, {
            opacity: 0,
            duration: 0.18,
            onComplete: () => {
              ghost?.remove();
              ghost = null;
            },
          });
        },
      });
      scrollTo(next, 1.15);
    };

    const tl = gsap.timeline();
    tl.to(
      state,
      {
        s: 60,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          const sec = Math.floor(state.s);
          if (clock.current) clock.current.textContent = sec >= 60 ? "07:00:00" : `06:59:${String(sec).padStart(2, "0")}`;
        },
      },
      0,
    )
      .fromTo(base.current, { strokeDashoffset: C }, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, 0)
      .fromTo(arc.current, { strokeDashoffset: C }, { strokeDashoffset: C * 0.75, duration: 0.9, ease: "power2.inOut" }, 0.45)
      .fromTo(line.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 1.15)
      .call(handoff, undefined, 2.7);

    return () => {
      tl.kill();
      fly?.kill();
      if (ghost) {
        gsap.killTweensOf(ghost);
        ghost.remove();
      }
    };
  }, []);

  return (
    <Chapter id="prologo">
      <div className="relative flex h-full flex-col items-center justify-center">
        <div ref={mark} className="mb-8 h-[112px] w-[112px] md:h-[148px] md:w-[148px]" aria-hidden="true">
          <svg className="h-full w-full" viewBox="0 0 44 44" fill="none">
            <circle
              ref={base}
              cx="22"
              cy="22"
              r={R}
              stroke="#6E6E6E"
              strokeWidth="6"
              strokeDasharray={C}
              strokeDashoffset={C}
            />
            <circle
              ref={arc}
              cx="22"
              cy="22"
              r={R}
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeDasharray={C}
              strokeDashoffset={C}
              transform="rotate(-90 22 22)"
            />
          </svg>
        </div>
        <span ref={clock} className="mono text-[40px] font-medium tracking-[-0.02em] text-white8 md:text-[64px]">
          06:59:40
        </span>
        <p ref={line} className="mt-8 max-w-[520px] px-6 text-center text-[16px] leading-[1.6] text-grey6 md:text-[18px]" style={{ opacity: 0 }}>
          Cada día, en una ciudad cualquiera, alguien decide vender su casa.
        </p>
      </div>
    </Chapter>
  );
}
