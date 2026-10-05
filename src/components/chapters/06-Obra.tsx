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
 * 06 · 17:00 · Presupuestos, facturas e informes. En la columna visual, a la izquierda la pantalla
 * de presupuestos y la hoja debajo; a la derecha el informe y la factura. El presupuesto cambia de
 * estado, `PRS → FAC` muta delante del visitante, la factura aparece y el gráfico se dibuja.
 */
export function Obra() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q, enter) => {
    // entrada: copy y pantalla de fondo suben ya puestos; el presupuesto se despliega en el tramo
    enter.fromTo(q(".copy"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .fromTo(q(".screen"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9 }, 0.1);

    tl.fromTo(q(".sheet"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.12 }, 0.12)
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
      .fromTo(q(".invoice"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.12 }, 0.62)
      .fromTo(q(".cobrada"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.05 }, 0.74)
      // informes: el gráfico se dibuja
      .fromTo(q(".report"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1 }, 0.72)
      .fromTo(q(".line-main"), { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 0.14, ease: "none" }, 0.76)
      .fromTo(q(".line-sec"), { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 0.14, ease: "none" }, 0.78)
      .fromTo(q(".line-dot"), { opacity: 0 }, { opacity: 1, duration: 0.02 }, 0.9);
    countTo(tl, q(".n-env")[0], { from: 0, to: 12, at: 0.08, dur: 0.14 });
    countTo(tl, q(".n-acc")[0], { from: 0, to: 68, at: 0.1, dur: 0.14, format: (n) => `${Math.round(n)} %` });
    countTo(tl, q(".total")[0], { from: 0, to: 74536, at: 0.2, dur: 0.16, format: (n) => Math.round(n).toLocaleString("es-ES") + ",00 €" });
  });

  return (
    <Chapter id="obra">
      <div ref={ref} className="stagewrap">
        <div className="halo" style={{ left: "28%", top: "4%", width: 1000, height: 800 }} />

        <div className="copy copy-block">
          <ChapterCopy module="Presupuestos · Facturas · Informes" what="la obra y la facturación, en la ficha del piso" title={<>De la obra<br />a la factura.</>} grey="En la ficha del piso." body="Presupuestos por partidas que se convierten en factura en un clic, con su PDF. E informes por oficina y por operación." />
          <div className="mt-6 hidden md:block">
            <CheckList items={["Presupuestos por partidas, con estados y tasa de aceptación", "Conversión a factura en un clic, PDF incluido", "Facturas enlazadas al inmueble y al cliente", "Informes por oficina y por operación"]} />
          </div>
        </div>

        <div className="visual-col md:grid md:grid-cols-[minmax(0,1fr)_300px] md:items-start md:gap-4">
          <div className="flex flex-col gap-4">
            {/* pantalla de presupuestos */}
            <div className="screen panel hidden flex-col gap-3 p-[18px] sm:flex" style={{ opacity: 0 }}>
              <div className="flex items-center justify-between text-[13px] text-white8">
                <span>Presupuestos</span>
                <span className="mono hidden text-[11px] text-grey5 lg:block">por partidas · a factura en un clic</span>
              </div>
              <div className="grid grid-cols-2 gap-[10px]">
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
            <div className="sheet flex flex-col gap-2 rounded-[12px] border border-grey4 p-[18px]" style={{ background: "#141414", opacity: 0, boxShadow: "0 30px 60px rgba(0,0,0,.6)" }}>
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
          </div>

          <div className="hidden flex-col gap-4 md:flex">
            {/* informes */}
            <div className="report panel flex flex-col gap-2 p-[18px]" style={{ opacity: 0 }}>
              <div className="flex items-center justify-between text-[13px] text-white8">
                <span>Informes</span>
                <span className="mono text-[11px] text-grey5">captación → venta</span>
              </div>
              <svg width="100%" height="90" viewBox="0 0 262 90" fill="none" preserveAspectRatio="none" aria-hidden="true">
                <path className="line-main" d="M0 70 C 40 66, 60 50, 90 52 S 150 22, 190 30 S 240 10, 262 6" stroke="#fff" strokeWidth="1.5" strokeDasharray="600" strokeDashoffset="600" vectorEffect="non-scaling-stroke" />
                <path className="line-sec" d="M0 84 C 50 82, 80 70, 120 72 S 200 50, 262 46" stroke="#3A3A3A" strokeWidth="1.5" strokeDasharray="600" strokeDashoffset="600" vectorEffect="non-scaling-stroke" />
                <circle className="line-dot" cx="262" cy="6" r="3" fill="#22C55E" style={{ opacity: 0 }} />
              </svg>
              <div className="mono flex justify-between text-[10px] text-grey5">
                <span>captados</span>
                <span>contactados</span>
                <span>visitas</span>
                <span>reservas</span>
              </div>
            </div>

            {/* factura */}
            <div className="invoice card flex flex-col gap-2 p-[18px]" style={{ background: "#171717", opacity: 0 }}>
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
          </div>
        </div>
      </div>
    </Chapter>
  );
}
