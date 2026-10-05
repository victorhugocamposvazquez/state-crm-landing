"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { ChapterCopy } from "@/components/ui/atoms";
import { countTo } from "@/components/motion/count";

const partidas = [
  ["Demoliciones", 120, "8.120,00 €"],
  ["Albañilería", 160, "31.900,00 €"],
  ["Electricidad", 90, "19.416,00 €"],
  ["Carpintería", 70, "15.100,00 €"],
] as const;

/**
 * 06 · 17:00 · Presupuestos, facturas e informes.
 * Una misión. Hojas de presupuesto/factura contenidas, sin capas 3D fuera de ventana.
 */
export function Obra() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q) => {
    tl.fromTo(q(".copy"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0)
      .fromTo(q(".sheet"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.12 }, 0.08)
      .fromTo(q(".pbar"), { scaleX: 0 }, { scaleX: 1, duration: 0.1, stagger: 0.02, transformOrigin: "left" }, 0.18)
      .to(q(".st-borrador"), { opacity: 0, duration: 0.03 }, 0.34)
      .fromTo(q(".st-enviado"), { opacity: 0 }, { opacity: 1, duration: 0.03 }, 0.34)
      .to(q(".st-enviado"), { opacity: 0, duration: 0.03 }, 0.44)
      .fromTo(q(".st-aceptado"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.04 }, 0.44)
      .to(q(".convert"), { scale: 0.96, duration: 0.02 }, 0.54)
      .to(q(".convert"), { scale: 1, duration: 0.02 }, 0.56)
      .to(q(".prs"), { opacity: 0.4, duration: 0.04 }, 0.57)
      .fromTo(q(".fac"), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.05 }, 0.58)
      .fromTo(q(".invoice"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.12 }, 0.62)
      .fromTo(q(".cobrada"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.05 }, 0.74)
      .fromTo(q(".report"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0.72)
      .fromTo(q(".line-main"), { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 0.14, ease: "none" }, 0.76)
      .fromTo(q(".line-dot"), { opacity: 0 }, { opacity: 1, duration: 0.02 }, 0.9)
      .to(q(".copy, .visual"), { opacity: 0.45, duration: 0.08 }, 0.94);
    countTo(tl, q(".total")[0], { from: 0, to: 74536, at: 0.2, dur: 0.16, format: (n) => Math.round(n).toLocaleString("es-ES") + ",00 €" });
  });

  return (
    <Chapter id="obra">
      <div ref={ref} className="stage-frame gutter">
        <div className="stage-copy copy">
          <ChapterCopy
            module="Obra"
            what="presupuestos y facturas"
            title={
              <>
                17:00.
                <br />
                Tres meses después.
              </>
            }
            grey="Mismo expediente."
            body="Presupuesto, factura e informe en el mismo hilo que el anuncio de las 7:40."
          />
        </div>

        <div className="stage-visual visual grid grid-cols-1 gap-3 overflow-hidden md:grid-cols-2">
          <div className="sheet flex flex-col gap-2 rounded-[12px] border border-grey4 p-4" style={{ background: "#141414", opacity: 0, boxShadow: "0 20px 40px rgba(0,0,0,.4)" }}>
            <div className="flex items-center justify-between text-[13px] text-white8">
              <span className="mono flex items-center gap-2">
                <span className="prs">PRS-2026-0001</span>
                <span className="fac text-green" style={{ opacity: 0 }}>
                  → FAC
                </span>
              </span>
              <span className="relative h-[20px] w-[90px]">
                <span className="st-borrador st st-n absolute right-0 top-0">● borrador</span>
                <span className="st-enviado st st-n absolute right-0 top-0" style={{ opacity: 0 }}>
                  ● enviado
                </span>
                <span className="st-aceptado st st-g absolute right-0 top-0" style={{ opacity: 0 }}>
                  ● aceptado
                </span>
              </span>
            </div>
            <div className="text-[12px] text-grey6">Reforma garita de seguridad</div>
            {partidas.map(([n, w, e]) => (
              <div key={n} className="flex items-center justify-between gap-3 border-t border-[#1F1F1F] py-2 text-[12px]">
                <span className="w-[110px] text-grey6">{n}</span>
                <span className="pbar bar flex-1" style={{ maxWidth: w, transform: "scaleX(0)" }} />
                <span className="text-white7">{e}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-[#1F1F1F] py-2 text-[13px] font-medium">
              <span className="text-white8">Total</span>
              <span className="total text-[16px] text-white8">0,00 €</span>
            </div>
            <span className="convert mt-1 inline-block self-start rounded-[8px] bg-white8 px-3 py-2 text-[12px] text-black0">Convertir en factura</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="invoice card flex flex-col gap-2 p-4" style={{ background: "#171717", opacity: 0 }}>
              <div className="flex items-center justify-between text-[13px] text-white8">
                <span className="mono">FAC-2026-0001</span>
                <span className="cobrada st st-g" style={{ opacity: 0 }}>
                  ● cobrada
                </span>
              </div>
              {[
                ["Cliente", "[CLIENTE]"],
                ["Inmueble", "Garita · Montserrat 12"],
                ["Importe", "74.536,00 €"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-t border-[#1F1F1F] py-2 text-[12px]">
                  <span className="text-grey5">{k}</span>
                  <span className="text-white7">{v}</span>
                </div>
              ))}
            </div>

            <div className="report panel flex flex-col gap-2 p-4" style={{ opacity: 0 }}>
              <div className="flex items-center justify-between text-[13px] text-white8">
                <span>Informes</span>
                <span className="mono text-[11px] text-grey5">captación → venta</span>
              </div>
              <svg width="100%" height="72" viewBox="0 0 262 72" fill="none" aria-hidden="true" preserveAspectRatio="none">
                <path className="line-main" d="M0 56 C 40 52, 60 40, 90 42 S 150 18, 190 24 S 240 8, 262 4" stroke="#fff" strokeWidth="1.5" strokeDasharray="600" strokeDashoffset="600" />
                <circle className="line-dot" cx="262" cy="4" r="3" fill="#22C55E" style={{ opacity: 0 }} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
