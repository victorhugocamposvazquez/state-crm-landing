"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { ChapterCopy, CheckList } from "@/components/ui/atoms";
import { countTo } from "@/components/motion/count";

const partidas = [
  ["Demoliciones", 120, "8.120,00 €"],
  ["Albañilería", 160, "31.900,00 €"],
  ["Electricidad y fontanería", 90, "19.416,00 €"],
  ["Carpintería y pintura", 70, "15.100,00 €"],
] as const;

/**
 * 06 · 17:00 · Presupuestos, facturas e informes. El presupuesto cambia de estado,
 * `PRS → FAC` muta delante del visitante, la factura se apila y el gráfico se dibuja.
 */
export function Obra() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q) => {
    tl.fromTo(q(".copy"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.1 }, 0)
      .fromTo(q(".screen"), { opacity: 0, y: 60 }, { opacity: 0.75, y: 0, duration: 0.12 }, 0.03)
      .fromTo(q(".sheet"), { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.12 }, 0.12)
      .fromTo(q(".pbar"), { scaleX: 0 }, { scaleX: 1, duration: 0.1, stagger: 0.02, transformOrigin: "left" }, 0.18)
      // estados: borrador → enviado → aceptado
      .to(q(".st-borrador"), { opacity: 0, duration: 0.03 }, 0.34)
      .fromTo(q(".st-enviado"), { opacity: 0 }, { opacity: 1, duration: 0.03 }, 0.34)
      .to(q(".st-enviado"), { opacity: 0, duration: 0.03 }, 0.44)
      .fromTo(q(".st-aceptado"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.04 }, 0.44)
      .to(q(".kpi-neg"), { color: "#D4A017", duration: 0.04 }, 0.34)
      .to(q(".kpi-neg"), { color: "#fff", duration: 0.04 }, 0.44)
      // el botón se pulsa y el número muta
      .to(q(".convert"), { scale: 0.96, duration: 0.02 }, 0.54)
      .to(q(".convert"), { scale: 1, duration: 0.02 }, 0.56)
      .to(q(".prs"), { opacity: 0.4, duration: 0.04 }, 0.57)
      .fromTo(q(".fac"), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.05 }, 0.58)
      .fromTo(q(".invoice"), { opacity: 0, y: 80, z: 120 }, { opacity: 1, y: 0, z: 120, duration: 0.12 }, 0.62)
      .fromTo(q(".cobrada"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.05 }, 0.74)
      // informes: el gráfico se dibuja
      .fromTo(q(".report"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.1 }, 0.72)
      .fromTo(q(".line-main"), { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 0.14, ease: "none" }, 0.76)
      .fromTo(q(".line-sec"), { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 0.14, ease: "none" }, 0.78)
      .fromTo(q(".line-dot"), { opacity: 0 }, { opacity: 1, duration: 0.02 }, 0.9)
      .to(q(".copy, .screen, .sheet, .invoice, .report"), { opacity: 0, y: -30, duration: 0.08 }, 0.94);
    countTo(tl, q(".n-env")[0], { from: 0, to: 12, at: 0.08, dur: 0.14 });
    countTo(tl, q(".n-acc")[0], { from: 0, to: 68, at: 0.1, dur: 0.14, format: (n) => `${Math.round(n)} %` });
    countTo(tl, q(".total")[0], { from: 0, to: 74536, at: 0.2, dur: 0.16, format: (n) => Math.round(n).toLocaleString("es-ES") + ",00 €" });
  });

  return (
    <Chapter id="obra">
      <div ref={ref} className="relative h-full gutter">
        <div className="halo" style={{ left: "28%", top: "4%", width: 1000, height: 800 }} />

        <div className="copy absolute left-[var(--gutter)] top-[104px] z-10 w-[calc(100%-2*var(--gutter))] md:top-[110px] md:w-[420px]">
          <ChapterCopy module="Presupuestos · Facturas · Informes" what="obra y facturación en el mismo expediente" title={<>17:00.<br />Tres meses después.</>} body="Presupuesto, factura e informe, en el mismo expediente que el anuncio de las 7:40. De la obra a la factura sin salir del CRM." />
          <div className="mt-6 hidden md:block">
            <CheckList items={["Presupuestos por partidas, con estados y tasa de aceptación", "Conversión a factura en un clic, PDF incluido", "Facturas enlazadas al inmueble y al cliente", "Informes por oficina y por operación"]} />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 top-[340px] md:left-[540px] md:top-[90px]" style={{ perspective: 1700, perspectiveOrigin: "30% 40%" }}>
          <div className="relative h-full" style={{ transformStyle: "preserve-3d" }}>
            {/* pantalla de presupuestos, al fondo */}
            <div className="screen panel absolute left-[var(--gutter)] right-[var(--gutter)] top-0 hidden flex-col gap-3 p-[18px] sm:flex md:left-0 md:right-auto md:w-[760px]" style={{ transform: "translateZ(-140px) rotateY(-8deg) rotateX(3deg)", opacity: 0 }}>
              <div className="flex items-center justify-between text-[13px] text-white8">
                <span>Presupuestos</span>
                <span className="mono text-[11px] text-grey5">gestiona presupuestos y conviértelos en facturas</span>
              </div>
              <div className="grid grid-cols-4 gap-[10px]">
                {[
                  ["n-env", "12", "Enviados", ""],
                  ["kpi-neg", "3", "En negociación", ""],
                  ["", "2", "Aceptados sin facturar", ""],
                  ["n-acc", "68 %", "Tasa de aceptación", ""],
                ].map(([cls, n, l]) => (
                  <div key={l} className="flex flex-col gap-1 rounded-[10px] border border-grey3 bg-black2 p-[14px]">
                    <span className={`${cls} text-[24px] font-medium tracking-[-0.02em] text-white8`}>{n}</span>
                    <span className="text-[11px] text-grey5">{l}</span>
                  </div>
                ))}
              </div>
              <div className="mono flex gap-3 text-[11px] text-grey5">
                <span className="text-white8">Todos</span>
                <span>Borrador</span>
                <span>Enviado</span>
                <span>Aceptado</span>
                <span>Rechazado</span>
                <span>Convertido</span>
              </div>
            </div>

            {/* hoja de presupuesto */}
            <div className="sheet absolute left-[var(--gutter)] right-[var(--gutter)] top-0 flex flex-col gap-2 rounded-[12px] border border-grey4 p-[18px] md:left-[120px] md:right-auto md:top-[230px] md:w-[480px]" style={{ background: "#141414", transform: "rotateY(-8deg) rotateX(3deg)", opacity: 0, boxShadow: "0 30px 60px rgba(0,0,0,.6)" }}>
              <div className="flex items-center justify-between text-[13px] text-white8">
                <span className="mono flex items-center gap-2">
                  <span className="prs">PRS-2026-0001</span>
                  <span className="fac text-green" style={{ opacity: 0 }}>
                    → FAC-2026-0001
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
              <div className="text-[12px] text-grey6">Reforma garita de seguridad · 02 sept</div>
              {partidas.map(([n, w, e]) => (
                <div key={n} className="flex items-center justify-between gap-3 border-t border-[#1F1F1F] py-2 text-[12px]">
                  <span className="w-[150px] text-grey6">{n}</span>
                  <span className="pbar bar flex-1" style={{ maxWidth: w, transform: "scaleX(0)" }} />
                  <span className="text-white7">{e}</span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-[#1F1F1F] py-2 text-[13px] font-medium">
                <span className="text-white8">Total</span>
                <span className="total text-[16px] text-white8">0,00 €</span>
              </div>
              <div className="mono mt-1 flex items-center gap-[10px] text-[12px]">
                <span className="convert inline-block rounded-[8px] bg-white8 px-3 py-2 text-black0">Convertir en factura</span>
                <span className="text-grey5">→</span>
                <span className="text-grey5">PDF</span>
              </div>
            </div>

            {/* factura, delante */}
            <div className="invoice card absolute left-[var(--gutter)] right-[var(--gutter)] top-[260px] flex flex-col gap-2 p-[18px] md:left-[440px] md:right-auto md:top-[420px] md:w-[400px]" style={{ background: "#171717", transform: "translateZ(120px) rotateY(-8deg) rotateX(3deg)", opacity: 0 }}>
              <div className="flex items-center justify-between text-[13px] text-white8">
                <span className="mono">FAC-2026-0001</span>
                <span className="cobrada st st-g" style={{ opacity: 0 }}>
                  ● cobrada
                </span>
              </div>
              {[
                ["Cliente", "[CLIENTE]"],
                ["Inmueble", "Garita · Avenida Montserrat 12"],
                ["Importe", "74.536,00 €"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-t border-[#1F1F1F] py-2 text-[12px]">
                  <span className="text-grey5">{k}</span>
                  <span className="text-white7">{v}</span>
                </div>
              ))}
            </div>

            {/* informes */}
            <div className="report panel absolute right-[var(--gutter)] top-[40px] hidden w-[300px] flex-col gap-2 p-[18px] md:right-0 md:flex" style={{ transform: "translateZ(40px) rotateY(-10deg)", opacity: 0 }}>
              <div className="flex items-center justify-between text-[13px] text-white8">
                <span>Informes</span>
                <span className="mono text-[11px] text-grey5">captación → obra → venta</span>
              </div>
              <svg width="262" height="90" viewBox="0 0 262 90" fill="none" aria-hidden="true">
                <path className="line-main" d="M0 70 C 40 66, 60 50, 90 52 S 150 22, 190 30 S 240 10, 262 6" stroke="#fff" strokeWidth="1.5" strokeDasharray="600" strokeDashoffset="600" />
                <path className="line-sec" d="M0 84 C 50 82, 80 70, 120 72 S 200 50, 262 46" stroke="#3A3A3A" strokeWidth="1.5" strokeDasharray="600" strokeDashoffset="600" />
                <circle className="line-dot" cx="262" cy="6" r="3" fill="#22C55E" style={{ opacity: 0 }} />
              </svg>
              <div className="mono flex justify-between text-[10px] text-grey5">
                <span>captados</span>
                <span>contactados</span>
                <span>visitas</span>
                <span>reservas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
