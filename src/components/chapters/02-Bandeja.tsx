"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { ChapterCopy } from "@/components/ui/atoms";
import { listings, euro } from "@/lib/script";

const rows = listings.slice(0, 6);

/**
 * 02 · 07:52 · La bandeja de Captación.
 * Copy a la izquierda (una misión). Panel CRM contenido a la derecha.
 */
export function Bandeja() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q) => {
    tl.fromTo(q(".panel3d"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.2 }, 0)
      .fromTo(q(".copy"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.15 }, 0.05)
      .fromTo(q(".row"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.08, stagger: 0.04 }, 0.15)
      .fromTo(q(".kpi .n"), { opacity: 0.2 }, { opacity: 1, duration: 0.1, stagger: 0.03 }, 0.12)
      .to(q(".chip-part"), { borderColor: "#737373", color: "#fff", duration: 0.05 }, 0.42)
      .to(q(".chip-all"), { borderColor: "#262626", color: "#A3A3A3", duration: 0.05 }, 0.42)
      .to(q(".row-agencia"), { opacity: 0.25, duration: 0.08 }, 0.44)
      .to(q(".phone-dash"), { opacity: 0, duration: 0.04 }, 0.55)
      .fromTo(q(".phone-ok"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.06 }, 0.56)
      .to(q(".hero-row"), { boxShadow: "0 30px 60px rgba(0,0,0,.7)", borderColor: "#3A3A3A", background: "#171717", duration: 0.12 }, 0.62)
      .fromTo(q(".hero-extra"), { opacity: 0, height: 0 }, { opacity: 1, height: "auto", duration: 0.1 }, 0.66)
      .fromTo(q(".counter-card"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.12 }, 0.3)
      .to(q(".panel3d, .copy"), { opacity: 0.45, duration: 0.12 }, 0.92);
  });

  return (
    <Chapter id="bandeja">
      <div ref={ref} className="stage-frame gutter">
        <div className="stage-copy copy">
          <ChapterCopy
            module="Captación"
            what="bandeja de novedades"
            title={
              <>
                07:52.
                <br />
                Particular o agencia.
              </>
            }
            grey="Lo sabes antes de llamar."
            body="Teléfono, fotos y prioridad en una sola bandeja. Lo que entra hoy, listo para asignar."
          />
        </div>

        <div className="stage-visual">
          <div className="panel3d panel relative w-full max-w-[720px]" style={{ opacity: 0 }}>
            <div className="counter-card card mono absolute right-3 top-3 z-10 flex flex-col gap-[4px] px-3 py-2 text-[11px] text-grey6" style={{ opacity: 0 }}>
              <span className="text-grey5">captados_hoy</span>
              <span className="text-[22px] tracking-[-0.02em] text-white8">38</span>
            </div>

            <div className="flex flex-col gap-3 px-4 pt-4 md:px-5 md:pt-5">
              <div className="flex items-center justify-between pr-24">
                <span className="text-[18px] font-medium tracking-[-0.02em] text-white8">Captación</span>
                <span className="mono text-[11px] text-grey5">
                  <span className="text-green">+ nueva alerta</span>
                </span>
              </div>
              <div className="flex gap-5 border-b border-grey3 text-[13px] text-grey5">
                <span className="flex items-center gap-2 border-b border-white8 pb-[10px] text-white8">
                  Novedades <span className="mono rounded-full bg-green px-2 py-[1px] text-[10px] text-[#06240F]">991</span>
                </span>
                <span className="pb-[10px]">Seguimiento</span>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  ["0", "Nuevos hoy"],
                  ["7", "Subidas"],
                  ["9", "Bajadas"],
                  ["0", "Seguimiento"],
                ].map(([n, l]) => (
                  <div key={l} className="kpi flex flex-col gap-1 rounded-[10px] border border-grey3 bg-black2 p-3">
                    <span className="n text-[22px] font-medium tracking-[-0.02em] text-white8">{n}</span>
                    <span className="text-[11px] text-grey5">{l}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 text-[12px]">
                <span className="chip-all rounded-full border border-grey5 px-[10px] py-[5px] text-white8">
                  Todos <span className="text-grey5">991</span>
                </span>
                <span className="chip-part rounded-full border border-grey3 px-[10px] py-[5px] text-grey6">
                  Particulares <span className="text-grey5">134</span>
                </span>
                <span className="rounded-full border border-grey3 px-[10px] py-[5px] text-grey6">
                  Agencias <span className="text-grey5">857</span>
                </span>
              </div>
            </div>
            <div className="mono mt-3 grid grid-cols-[44px_1fr_90px_110px] gap-3 px-4 pb-2 text-[11px] text-grey5 md:grid-cols-[44px_1fr_110px_60px_150px] md:px-5">
              <span />
              <span>anuncio</span>
              <span className="text-right">precio</span>
              <span className="hidden text-right md:block">m²</span>
              <span>contacto</span>
            </div>
            {rows.map((l, i) => {
              const isHero = i === 0;
              const isAgencia = l.kind === "agencia";
              return (
                <div
                  key={l.id}
                  className={`row ${isHero ? "hero-row" : ""} ${isAgencia ? "row-agencia" : ""} grid grid-cols-[44px_1fr_90px_110px] items-center gap-3 border-t border-[#1F1F1F] px-4 py-3 md:grid-cols-[44px_1fr_110px_60px_150px] md:px-5`}
                  style={isHero ? { border: "1px solid transparent", borderRadius: 10 } : undefined}
                >
                  <div className="h-11 w-11 rounded-[6px]" style={{ background: "linear-gradient(135deg,#2A2A2A,#1A1A1A)" }} />
                  <div className="flex min-w-0 flex-col gap-[6px]">
                    {isHero || i === 2 ? (
                      <>
                        <span className="truncate text-[14px] text-white7">{isHero ? "Casa en Camino Rianxiño, 115" : l.title}</span>
                        <span className="mono truncate text-[11px] text-grey5">
                          id.{l.id} · {l.rooms} hab{isHero ? " · 40 fotos" : ""}
                        </span>
                        {isHero && (
                          <span className="hero-extra mono overflow-hidden text-[11px] text-grey6" style={{ opacity: 0, height: 0 }}>
                            <span className="text-green">particular</span> · prioridad alta · Ana
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="bar" style={{ width: `${45 + ((i * 13) % 30)}%` }} />
                        <div className="bar" style={{ width: `${25 + ((i * 7) % 20)}%`, height: 5 }} />
                      </>
                    )}
                  </div>
                  <span className="text-right text-[14px] font-medium text-white8">{euro(l.price)}</span>
                  <span className="hidden text-right text-grey6 md:block">{l.m2}</span>
                  <span className="relative">
                    {isHero ? (
                      <>
                        <span className="phone-dash st st-n absolute left-0 top-0">—</span>
                        <span className="phone-ok st st-g" style={{ opacity: 0 }}>
                          ● tel. capturado
                        </span>
                      </>
                    ) : l.kind === "encubierta" ? (
                      <span className="st st-a">● encubierta</span>
                    ) : l.phone === "capturado" ? (
                      <span className="st st-g">● capturado</span>
                    ) : (
                      <span className="st st-n">{l.phone}</span>
                    )}
                  </span>
                </div>
              );
            })}
            <div className="h-3" />
          </div>
        </div>
      </div>
    </Chapter>
  );
}
