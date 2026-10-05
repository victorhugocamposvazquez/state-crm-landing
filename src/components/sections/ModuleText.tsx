"use client";

import { useRef } from "react";
import { moduleTexts, type ModuleTextId } from "@/lib/modules";
import { Kicker, brandify } from "@/components/ui/atoms";
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
    <section ref={ref} id={`${id}-texto`} className="module-text relative z-[2] border-t border-[#171717] bg-black0 py-[80px] gutter md:py-[120px]" aria-labelledby={`${id}-texto-h`}>
      <div className="mx-auto grid max-w-[1040px] grid-cols-1 gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16">
        <div className="flex flex-col gap-6">
          <div data-reveal>
            <Kicker module={m.module} what={m.what} />
          </div>
          <h3 id={`${id}-texto-h`} data-reveal className="t-h2 m-0 text-white8">
            {brandify(m.title)}
          </h3>
          <p data-reveal className="t-body m-0 max-w-[500px] text-grey6">
            {brandify(m.body)}
          </p>
          <a data-reveal href="#manana" className="t-small mt-2 inline-flex items-center gap-2 self-start font-medium text-white7 no-underline hover:text-white8">
            Ver {m.module.split(" · ")[0]} en una demo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div>
          <div data-reveal className="t-label mb-3 text-grey5">
            Qué incluye
          </div>
          <ul className="m-0 list-none p-0">
            {m.features.map((f) => (
              <li key={f.title} data-reveal className="grid grid-cols-1 gap-1 border-t border-[#1F1F1F] py-5 md:grid-cols-[240px_1fr] md:gap-6">
                <div className="t-h3 flex items-start gap-3 text-white7">
                  <span className="chk mt-[3px]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {f.title}
                </div>
                <p className="m-0 text-[15px] leading-[1.6] text-grey6">{brandify(f.text)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
