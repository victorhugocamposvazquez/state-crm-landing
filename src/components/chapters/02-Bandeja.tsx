"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { CheckList, ChapterCopy } from "@/components/ui/atoms";
import { listings, euro } from "@/lib/script";

const rows = listings.slice(0, 6);

/**
 * 02 · 07:52 · La bandeja de Captación: la pantalla conceptual del CRM, inclinada,
 * con las filas entrando una a una, los filtros pulsándose solos y el 3º izquierda elevándose.
 */
export function Bandeja() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q, enter) => {
    // entrada: el panel y el copy aterrizan mientras la pantalla sube; las filas llegan ya en el tramo
    enter.fromTo(q(".panel3d"), { opacity: 0, y: 80, rotateX: 14 }, { opacity: 1, y: 0, rotateX: 5, duration: 1 }, 0)
      .fromTo(q(".copy"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0.2);

    tl.fromTo(q(".row"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.08, stagger: 0.04 }, 0.15)
      .fromTo(q(".kpi .n"), { opacity: 0.2 }, { opacity: 1, duration: 0.1, stagger: 0.03 }, 0.12)
      // los filtros se pulsan solos
      .to(q(".chip-part"), { borderColor: "#737373", color: "#fff", duration: 0.05 }, 0.42)
      .to(q(".chip-all"), { borderColor: "#262626", color: "#A3A3A3", duration: 0.05 }, 0.42)
      .to(q(".row-agencia"), { opacity: 0.25, duration: 0.08 }, 0.44)
      // el teléfono se captura
      .to(q(".phone-dash"), { opacity: 0, duration: 0.04 }, 0.55)
      .fromTo(q(".phone-ok"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.06 }, 0.56)
      // la fila protagonista se eleva como capa
      .to(q(".hero-row"), { z: 70, boxShadow: "0 30px 60px rgba(0,0,0,.7)", borderColor: "#3A3A3A", background: "#171717", duration: 0.12 }, 0.62)
      .fromTo(q(".hero-extra"), { opacity: 0, height: 0 }, { opacity: 1, height: "auto", duration: 0.1 }, 0.66)
      .fromTo(q(".counter-card"), { opacity: 0, y: 20, z: 110 }, { opacity: 1, y: 0, z: 110, duration: 0.12 }, 0.3);
  });

  return (
    <Chapter id="bandeja">
      <div ref={ref} className="relative h-full gutter">
        <div className="halo" style={{ right: "-14%", top: "6%", width: 1100, height: 800 }} />

        <div className="copy absolute left-[var(--gutter)] top-[112px] z-10 w-[calc(100%-2*var(--gutter))] md:top-[140px] md:w-[400px]">
          <ChapterCopy
            module="Captación"
            what="la bandeja con lo que ha entrado hoy"
            title={
              <>
                Lo nuevo de hoy,
                <br />
                ya filtrado.
              </>
            }
            grey="Particular, agencia o agencia disfrazada."
            body="Cada anuncio llega con teléfono, fotos y prioridad, y se asigna a un comercial. Lo que entra hoy y lo que ya estás trabajando, en la misma lista."
          />
          <div className="mt-6 hidden md:block">
            <CheckList
              items={[
                "Rastreo diario de los portales, por zona",
                "Distingue particular, agencia y agencia encubierta",
                "Teléfono y fotos antes de la primera llamada",
                "Prioridad y asignación a un comercial",
              ]}
            />
          </div>
          <div className="mono mt-6 hidden gap-4 text-[12px] text-grey5 md:flex">
            <span>idealista</span>
            <span>fotocasa</span>
            <span>habitaclia</span>
            <span>pisos.com</span>
            <span>milanuncios</span>
          </div>
        </div>

        <div
          className="absolute bottom-0 right-0 top-[300px] md:left-[480px] md:top-[100px] lg:left-[540px]"
          style={{ perspective: 1800, perspectiveOrigin: "20% 40%", width: "100%", maxWidth: 900 }}
        >
          <div className="panel3d panel relative mx-[var(--gutter)] md:mx-0" style={{ transformStyle: "preserve-3d", transform: "rotateY(-9deg) rotateX(5deg)", opacity: 0 }}>
            <div className="flex flex-col gap-4 px-4 pt-4 md:px-5 md:pt-5">
              <div className="flex items-center justify-between">
                <span className="text-[18px] font-medium tracking-[-0.02em] text-white8 md:text-[20px]">Captación</span>
                <span className="mono text-[11px] text-grey5">
                  15 sin teléfono · <span className="text-green">+ nueva alerta</span>
                </span>
              </div>
              <div className="flex gap-5 border-b border-grey3 text-[13px] text-grey5">
                <span className="flex items-center gap-2 border-b border-white8 pb-[10px] text-white8">
                  Novedades <span className="mono rounded-full bg-green px-2 py-[1px] text-[10px] text-[#06240F]">991</span>
                </span>
                <span className="pb-[10px]">Seguimiento</span>
                <span className="hidden items-center gap-2 pb-[10px] sm:flex">
                  Alertas <span className="rounded-full bg-[#1F1F1F] px-2 py-[1px] text-[10px] text-grey6">4</span>
                </span>
                <span className="hidden items-center gap-2 pb-[10px] sm:flex">
                  Notificaciones <span className="rounded-full bg-[#1F1F1F] px-2 py-[1px] text-[10px] text-grey6">5</span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  ["0", "Nuevos hoy", ""],
                  ["7", "Subidas de precio", "text-amber"],
                  ["9", "Bajadas de precio", ""],
                  ["0", "En seguimiento", ""],
                ].map(([n, l, c]) => (
                  <div key={l} className="kpi flex flex-col gap-1 rounded-[10px] border border-grey3 bg-black2 p-3 md:p-4">
                    <span className={`n text-[22px] font-medium tracking-[-0.02em] text-white8 md:text-[26px] ${c}`}>{n}</span>
                    <span className="text-[11px] text-grey5 md:text-[12px]">{l}</span>
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
                <span className="hidden rounded-full border border-grey3 px-[10px] py-[5px] text-grey6 sm:inline">
                  Sin teléfono <span className="text-grey5">15</span>
                </span>
                <span className="hidden rounded-full border border-grey3 px-[10px] py-[5px] text-grey6 md:inline">
                  Solo mensaje <span className="text-grey5">122</span>
                </span>
              </div>
            </div>
            <div className="mono mt-4 grid grid-cols-[44px_1fr_90px_110px] gap-3 px-4 pb-2 text-[11px] text-grey5 md:grid-cols-[44px_1fr_110px_60px_150px] md:px-5">
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
                  style={isHero ? { border: "1px solid transparent", borderRadius: 10, transformStyle: "preserve-3d" } : undefined}
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
                            <span className="text-green">particular</span> · prioridad alta · asignado a Ana · novedad → contacto
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="bar" style={{ width: `${45 + (i * 13) % 30}%` }} />
                        <div className="bar" style={{ width: `${25 + (i * 7) % 20}%`, height: 5 }} />
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

            <div
              className="counter-card card mono absolute -right-4 -top-5 flex flex-col gap-[6px] px-[14px] py-3 text-[12px] text-grey6 md:-right-14 md:-top-3"
              style={{ opacity: 0, transform: "translateZ(110px)" }}
            >
              <span className="text-grey5">captados_hoy</span>
              <span className="text-[28px] tracking-[-0.02em] text-white8">38</span>
              <span className="flex items-center gap-[6px]">
                <span className="h-[6px] w-[6px] rounded-full bg-green" />
                134 particulares · <span className="text-amber">3 encubiertas</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
