"use client";

import { useRef } from "react";
import { moduleTexts, type ModuleTextId } from "@/lib/modules";
import { Kicker } from "@/components/ui/atoms";
import { useReveal } from "@/components/motion/reveal";

/**
 * El texto de un módulo, en flujo normal, justo después de su pantalla animada.
 * Dos columnas: a la izquierda qué hace y para qué sirve; a la derecha qué incluye, en cuatro líneas.
 */
export function ModuleText({ id }: { id: ModuleTextId }) {
  const m = moduleTexts[id];
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id={`${id}-texto`} className="module-text relative z-[2] border-t border-[#171717] bg-black0 py-[64px] gutter md:py-[96px]" aria-labelledby={`${id}-texto-h`}>
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-20">
        <div className="flex flex-col gap-6">
          <div data-reveal>
            <Kicker module={m.module} what={m.what} />
          </div>
          <h3 id={`${id}-texto-h`} data-reveal className="display m-0 text-[26px] text-white8 md:text-[34px]">
            {m.title}
          </h3>
          <p data-reveal className="m-0 max-w-[520px] text-[15px] leading-[1.65] text-grey6 md:text-[17px]">
            {m.body}
          </p>
          <a data-reveal href="#manana" className="mono mt-2 inline-flex items-center gap-2 self-start text-[12px] tracking-[0.04em] text-white7 no-underline hover:text-white8">
            Ver {m.module.split(" · ")[0]} en una demo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div>
          <div data-reveal className="mono mb-2 text-[11px] uppercase tracking-[0.14em] text-grey5">
            Qué incluye
          </div>
          <ul className="m-0 list-none p-0">
            {m.features.map((f) => (
              <li key={f.title} data-reveal className="grid grid-cols-1 gap-1 border-t border-[#1F1F1F] py-4 md:grid-cols-[230px_1fr] md:gap-6">
                <div className="flex items-start gap-3 text-[15px] font-medium text-white7">
                  <span className="chk mt-[2px]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {f.title}
                </div>
                <p className="m-0 text-[14px] leading-[1.6] text-grey6 md:text-[15px]">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
