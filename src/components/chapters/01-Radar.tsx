"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { Kicker } from "@/components/ui/atoms";

/**
 * 01 · 07:00 · El radar. Titular + CTA a la izquierda; el disco 3D habla solo.
 * Sin stats ni etiquetas laterales: una misión, un mensaje.
 */
export function Radar() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q) => {
    tl.fromTo(q(".copy"), { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0)
      .fromTo(q(".l2"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25 }, 0.02)
      .to(q(".l1"), { y: -10, duration: 0.3 }, 0.05)
      .fromTo(q(".sub"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.2)
      .fromTo(q(".cta"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.2 }, 0.28)
      // Se mantiene hasta que el siguiente capítulo lo cubre — sin cortina negra
      .to(q(".copy"), { opacity: 0.35, duration: 0.12 }, 0.92);
  });

  return (
    <Chapter id="radar">
      <div ref={ref} className="relative h-full gutter">
        <div className="copy absolute left-[var(--gutter)] top-[34%] max-w-[560px] -translate-y-1/2 md:top-[42%] md:max-w-[640px]" style={{ opacity: 0 }}>
          <div className="mb-6">
            <Kicker module="statecrm" what="CRM inmobiliario a medida" />
          </div>
          <h1 className="display m-0 text-[38px] text-white8 md:text-[56px] lg:text-[64px]">
            <span className="l1 block">Antes de que lo sepa nadie,</span>
            <span className="l2 block text-grey5">lo sabe tu CRM.</span>
          </h1>
          <p className="sub mt-6 max-w-[420px] text-[15px] leading-[1.55] text-grey6 md:text-[16px]">
            Captación de particulares, catastro, equipo y obra — en un solo sistema construido para tu agencia.
          </p>
          <div className="cta mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#ciudad" className="btn btn-w">
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
      </div>
    </Chapter>
  );
}
