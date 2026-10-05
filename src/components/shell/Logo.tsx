"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "@/lib/store";
import { Brand } from "@/components/ui/atoms";

/**
 * El anillo de progreso de statecrm.
 * Retícula 44 px, grosor 6, anillo #6E6E6E + cuadrante blanco.
 * Con `progress`, el aro se rellena en blanco a medida que avanza la web.
 * El wordmark va en Space Grotesk 700, «state» blanco y «crm» gris, como en el lockup.
 */
export function Logo({ size = 28, progress = false, wordmark = true }: { size?: number; progress?: boolean; wordmark?: boolean }) {
  const ref = useRef<SVGCircleElement>(null);
  // Brand: r=12 en viewBox 44 → circunferencia 2πr
  const r = 12;
  const c = 2 * Math.PI * r;
  // separación símbolo–texto = 1/3 del diámetro
  const gap = Math.round(size / 3);

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
    <span className="inline-flex items-center" style={{ gap }}>
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
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
        <span className="wordmark text-[18px] md:text-[20px]">
          <Brand />
        </span>
      )}
    </span>
  );
}
