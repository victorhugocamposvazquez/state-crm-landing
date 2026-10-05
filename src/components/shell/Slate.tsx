"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "@/lib/store";
import { chapters, chapterIndex, formatHour } from "@/lib/script";

/**
 * La pizarra: `02 · 07:40 · CAPTACIÓN`, fija arriba a la izquierda.
 * Los minutos corren de verdad entre la hora de inicio y la de fin del capítulo.
 */
export function Slate() {
  const numRef = useRef<HTMLSpanElement>(null);
  const hourRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const apply = () => {
      const s = useScroll.getState();
      const ch = chapters[chapterIndex[s.active]];
      const p = s.progress[s.active] ?? 0;
      const minutes = ch.hourStart + (ch.hourEnd - ch.hourStart) * p;
      if (numRef.current) numRef.current.textContent = ch.slate;
      if (hourRef.current) hourRef.current.textContent = formatHour(minutes);
      if (labelRef.current) labelRef.current.textContent = ch.label;
    };
    apply();
    return useScroll.subscribe(apply);
  }, []);

  return (
    <div
      className="mono pointer-events-none fixed left-[var(--gutter)] top-[76px] z-40 flex items-center gap-[10px] text-[11px] tracking-[0.04em] text-grey5 md:top-[84px] md:text-[12px]"
      aria-live="off"
    >
      <span ref={numRef}>00</span>
      <span className="text-grey4">·</span>
      <span ref={hourRef} className="text-white7">
        06:59
      </span>
      <span className="text-grey4">·</span>
      <span ref={labelRef}>PRÓLOGO</span>
    </div>
  );
}
