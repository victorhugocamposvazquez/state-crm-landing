"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { Kicker } from "@/components/ui/atoms";

/**
 * 01 · 07:00 · El radar. El titular se parte en dos líneas y la cámara desciende hacia el disco;
 * una ventana se enciende y una etiqueta la señala.
 */
export function Radar() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q, enter) => {
    // entrada: el titular y las cifras ya vienen puestos mientras la pantalla sube
    enter.fromTo(q(".copy, .stats"), { opacity: 0 }, { opacity: 1, duration: 1 }, 0);

    tl.fromTo(q(".l2"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25 }, 0.02)
      .to(q(".l1"), { y: -10, duration: 0.3 }, 0.05)
      .fromTo(q(".sub"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.2)
      .fromTo(q(".cta"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.2 }, 0.28)
      .fromTo(q(".tag"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.15 }, 0.55)
      .fromTo(q(".tag .ln"), { scaleY: 0 }, { scaleY: 1, duration: 0.1, transformOrigin: "bottom" }, 0.5);
  });

  return (
    <Chapter id="radar">
      <div ref={ref} className="stagewrap">
        <div className="halo" style={{ right: "-10%", bottom: "-20%", width: 900, height: 700 }} />

        <div className="copy absolute left-[var(--gutter)] top-[40%] w-[calc(100%-2*var(--gutter))] max-w-[860px] -translate-y-1/2 md:top-[46%]" style={{ opacity: 0 }}>
          <div className="mb-7">
            <Kicker module="statecrm" what="CRM inmobiliario a medida para agencias" />
          </div>
          <h1 className="t-hero m-0 text-white8">
            <span className="l1 block">El CRM inmobiliario para ganar</span>
            <span className="l2 block text-grey5">la captación de particulares.</span>
          </h1>
          <p className="sub t-lead mt-7 max-w-[560px] text-grey6">
            Multiplica lo que capta tu agencia con un CRM que sabe, cada mañana, qué han publicado los particulares,
            qué fincas hay en cada calle y qué cliente las está buscando.
          </p>
          <div className="cta mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#proceso" className="btn btn-w">
              Ver cómo funciona
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#manana" className="btn btn-g">
              Pedir una demo
            </a>
          </div>
        </div>

        {/* etiqueta de la ventana que se enciende */}
        <div className="tag mono absolute bottom-[22%] right-[8%] flex flex-col items-start text-[11px] text-grey6 md:bottom-[26%] md:right-[18%]" style={{ opacity: 0 }}>
          <span className="ln mb-2 ml-[2px] block h-9 w-px bg-grey4" />
          <span>
            3º izquierda · 92 m² · <span className="text-green">publicado hace 0 min</span>
          </span>
        </div>

        <div className="stats mono absolute bottom-10 left-[var(--gutter)] flex gap-6 text-[11px] text-grey5 md:text-[12px]" style={{ opacity: 0 }}>
          <span>
            <span className="text-white7">991</span> en novedad
          </span>
          <span>
            <span className="text-white7">134</span> particulares
          </span>
          <span className="flex items-center gap-2">
            <span className="h-[6px] w-[6px] rounded-full bg-green" />
            rastreo en curso
          </span>
        </div>
      </div>
    </Chapter>
  );
}
