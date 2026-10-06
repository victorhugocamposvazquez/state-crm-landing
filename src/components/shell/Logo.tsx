"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "@/lib/store";
import { Brand } from "@/components/ui/atoms";

/**
 * Lockup de statecrm, una sola pieza: anillo y wordmark escalan juntos.
 * El círculo mide 1,21 veces la altura de las mayúsculas de Space Grotesk 700
 * (anillo #6E6E6E y un cuadrante blanco). No se rellena con el scroll.
 */
export function Logo({
  progress = false,
  wordmark = true,
  className = "",
}: {
  progress?: boolean;
  wordmark?: boolean;
  className?: string;
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
    <span className={`logo ${className || "text-[20px] md:text-[26px]"}`}>
      <svg data-logo-mark viewBox="6 6 32 32" fill="none" aria-hidden="true" className="logo-mark">
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
        <span className="wordmark">
          <Brand />
        </span>
      )}
    </span>
  );
}
