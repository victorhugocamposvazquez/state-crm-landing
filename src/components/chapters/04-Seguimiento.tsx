"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { ChapterCopy } from "@/components/ui/atoms";

const demands = [
  { who: "Familia Castro", what: "2 hab · hasta 250.000 · zona sur", ok: false },
  { who: "Iván R.", what: "local · hasta 180.000 · centro", ok: false },
  { who: "Familia López", what: "3 hab · terraza · zona norte", ok: true },
];

const columns = ["Captado", "Contacto", "Visita", "Oferta", "Reserva"];

/**
 * 04 · 11:30 · Inmuebles, demandas y seguimiento.
 * Una misión. El match y el kanban viven dentro del marco visual.
 */
export function Seguimiento() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q) => {
    tl.fromTo(q(".copy"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0)
      .fromTo(q(".inm"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.14 }, 0.02)
      .to(q(".inm-hero"), { background: "#171717", borderColor: "#3A3A3A", boxShadow: "0 20px 40px rgba(0,0,0,.6)", duration: 0.08 }, 0.16)
      .fromTo(q(".dem-0"), { x: 40, opacity: 0 }, { x: 0, opacity: 0.45, duration: 0.12 }, 0.22)
      .fromTo(q(".dem-1"), { x: 40, opacity: 0 }, { x: 0, opacity: 0.45, duration: 0.12 }, 0.3)
      .fromTo(q(".dem-2"), { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.14, ease: "power3.out" }, 0.4)
      .fromTo(q(".match"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.04 }, 0.56)
      .fromTo(q(".kanban"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.1 }, 0.6)
      .to(q(".kcard"), { x: "+=120", duration: 0.05 }, 0.7)
      .to(q(".kcol-1"), { color: "#fff", borderColor: "#fff", duration: 0.05 }, 0.7)
      .to(q(".kcard"), { x: "+=120", duration: 0.05 }, 0.78)
      .to(q(".kcol-2"), { color: "#fff", borderColor: "#fff", duration: 0.05 }, 0.78)
      .to(q(".kcol-1"), { color: "#737373", borderColor: "#262626", duration: 0.05 }, 0.78)
      .to(q(".kcard .ktag"), { opacity: 1, duration: 0.03 }, 0.8)
      .to(q(".copy, .visual"), { opacity: 0.45, duration: 0.08 }, 0.93);
  });

  return (
    <Chapter id="seguimiento">
      <div ref={ref} className="stage-frame gutter">
        <div className="stage-copy copy">
          <ChapterCopy
            module="Seguimiento"
            what="stock cruzado con demandas"
            title="11:30. Alguien busca exactamente esto."
            grey="Tu CRM lo sabía antes."
            body="El inmueble se eleva, la demanda coincide y el seguimiento avanza sola."
          />
        </div>

        <div className="stage-visual visual flex flex-col gap-3 overflow-hidden">
          <div className="inm panel hidden flex-col gap-2 p-3 md:flex" style={{ opacity: 0 }}>
            <div className="flex items-center justify-between text-[13px] text-white8">
              <span>Inmuebles</span>
              <span className="mono text-[11px] text-grey5">2 disponibles</span>
            </div>
            {[
              { price: "450.000 €", st: "disponible", hero: false },
              { price: "435.000 €", st: "disponible", hero: true },
              { price: "260.000 €", st: "reservado", hero: false },
            ].map((r, i) => (
              <div
                key={i}
                className={`${r.hero ? "inm-hero" : ""} grid grid-cols-[36px_1fr_90px_100px] items-center gap-3 border-t border-[#1F1F1F] py-[8px] text-[13px]`}
                style={r.hero ? { border: "1px solid transparent", borderRadius: 8, padding: 10, margin: "0 -4px" } : { opacity: 0.5 }}
              >
                <div className="h-9 w-9 rounded-[6px]" style={{ background: "linear-gradient(135deg,#2A2A2A,#1A1A1A)" }} />
                <div className="flex min-w-0 flex-col gap-[4px]">
                  {r.hero ? (
                    <>
                      <span className="truncate font-medium text-white8">Piso en calle de Posse</span>
                      <span className="mono text-[11px] text-grey6">RHB-2026-0002 · 92 m²</span>
                    </>
                  ) : (
                    <>
                      <div className="bar" style={{ width: "55%" }} />
                      <div className="bar" style={{ width: "35%", height: 5 }} />
                    </>
                  )}
                </div>
                <span className="text-right font-medium text-white8">{r.price}</span>
                <span className={`st ${r.hero ? "st-g" : "st-n"}`}>● {r.st}</span>
              </div>
            ))}
          </div>

          <div className="relative flex flex-wrap gap-2">
            {demands.map((d, i) => (
              <div
                key={d.who}
                className={`dem dem-${i} card flex w-full max-w-[240px] flex-col gap-1.5 px-3 py-2.5 text-[12px] text-grey6 sm:w-[220px]`}
                style={{
                  opacity: 0,
                  borderColor: d.ok ? "#22C55E" : undefined,
                  boxShadow: d.ok ? "0 0 0 1px rgba(34,197,94,.3)" : undefined,
                }}
              >
                <b className="text-[13px] font-medium text-white8">Demanda · {d.who}</b>
                <span>{d.what}</span>
                {d.ok ? (
                  <span className="match st st-g" style={{ opacity: 0 }}>
                    ● coincidencia → Posse
                  </span>
                ) : (
                  <span className="st st-n">sin coincidencia</span>
                )}
              </div>
            ))}
          </div>

          <div className="kanban panel w-full overflow-x-auto p-3" style={{ opacity: 0 }}>
            <div className="mb-2 flex items-center justify-between text-[13px] text-white8">
              <span>Seguimiento</span>
              <span className="mono text-[11px] text-grey5">etapas</span>
            </div>
            <div className="relative flex min-w-[620px] gap-2">
              {columns.map((c, k) => (
                <div key={c} className="flex w-[116px] flex-col gap-2">
                  <div className={`kcol-${k} border-b pb-[6px] text-[10px] uppercase tracking-[0.1em]`} style={{ color: k === 0 ? "#fff" : "#737373", borderColor: k === 0 ? "#fff" : "#262626" }}>
                    {c}
                  </div>
                  {k !== 2 && (
                    <div className="flex flex-col gap-[6px] rounded-[8px] border border-grey3 bg-black2 p-2" style={{ opacity: 0.4 }}>
                      <div className="bar" style={{ width: "65%" }} />
                      <div className="bar" style={{ width: "35%", height: 5 }} />
                    </div>
                  )}
                </div>
              ))}
              <div className="kcard absolute left-0 top-[26px] flex w-[116px] flex-col gap-[4px] rounded-[8px] border border-grey4 bg-[#1C1C1C] p-2" style={{ boxShadow: "0 16px 30px rgba(0,0,0,.6)" }}>
                <span className="text-[11px] text-white8">Piso Posse</span>
                <span className="mono text-[10px] text-grey6">Familia López</span>
                <span className="ktag mono text-[10px] text-green" style={{ opacity: 0 }}>
                  visita 13:00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
