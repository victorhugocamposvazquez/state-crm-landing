"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "@/lib/store";
import { Brand } from "@/components/ui/atoms";

/**
 * El anillo de statecrm, fijo: retícula 44, grosor 6, anillo #6E6E6E y un cuadrante blanco.
 * No se rellena con el scroll: el diseño del lockup no cambia a lo largo de la web.
 * El wordmark va en Space Grotesk 700, «state» blanco y «crm» gris.
 */
export function Logo({
  size = 40,
  progress = false,
  wordmark = true,
  className = "",
  markClassName = "h-10 w-10 md:h-12 md:w-12",
  wordClassName = "text-[20px] md:text-[26px]",
}: {
  size?: number;
  progress?: boolean;
  wordmark?: boolean;
  className?: string;
  markClassName?: string;
  wordClassName?: string;
}) {
  const ref = useRef<SVGCircleElement>(null);
  // Brand: r=12 en viewBox 44 → circunferencia 2πr
  const r = 12;
  const c = 2 * Math.PI * r;

  useEffect(() => {
    if (!progress) return;
    const el = ref.current;
    if (!el) return;
    const apply = (g: number) => {
      el.style.strokeDashoffset = String(c * (1 - Math.max(0.25, g)));
    };
    apply(useScroll.getState().global);
    return useScroll.subscribe((s) => apply(s.global));
  }, [progress, c]);

  return (
    <span className={`inline-flex items-center gap-3 md:gap-4 ${className}`}>
      <svg data-logo-mark width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true" className={markClassName}>
        <circle cx="22" cy="22" r={r} stroke="#6E6E6E" strokeWidth="6" />
        <circle
          ref={ref}
          cx="22"
          cy="22"
          r={r}
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeDasharray={c}
          strokeDashoffset={c * 0.75}
          transform="rotate(-90 22 22)"
          style={{ transition: "stroke-dashoffset .15s linear" }}
        />
      </svg>
      {wordmark && (
        <span className={`wordmark ${wordClassName}`}>
          <Brand />
        </span>
      )}
    </span>
  );
}
