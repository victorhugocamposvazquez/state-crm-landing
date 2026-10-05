"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { ChapterCopy, CheckList } from "@/components/ui/atoms";

const demands = [
  { who: "Familia Castro", what: "2 hab · hasta 250.000 · zona sur", ok: false },
  { who: "Iván R.", what: "local · hasta 180.000 · centro", ok: false },
  { who: "Familia López", what: "3 hab · hasta 450.000 · con terraza · zona norte", ok: true },
];

const columns = ["Captado", "Contacto", "Visita", "Oferta", "Reserva"];

/**
 * 04 · 11:30 · Inmuebles, demandas y seguimiento. Tres paneles apilados en la columna visual,
 * de arriba abajo como la historia: el piso se destaca en el stock, las demandas cruzan y la que
 * coincide se queda, y en el seguimiento la tarjeta avanza columna a columna.
 */
export function Seguimiento() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q, enter) => {
    // entrada: copy y ficha del inmueble suben ya puestos con la pantalla
    enter.fromTo(q(".copy"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .fromTo(q(".inm"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9 }, 0.1);

    // la tarjeta del seguimiento avanza exactamente una columna: su propio ancho más el hueco
    const colStep = { xPercent: "+=100", x: "+=10" };

    tl.to(q(".inm-hero"), { background: "#171717", borderColor: "#3A3A3A", boxShadow: "0 16px 32px rgba(0,0,0,.5)", duration: 0.08 }, 0.16)
      // las demandas cruzan de derecha a izquierda, rápidas; la que coincide frena y se queda
      .fromTo(q(".dem-0"), { x: 820, opacity: 0 }, { x: -340, opacity: 0.6, duration: 0.18, ease: "none" }, 0.22)
      .fromTo(q(".dem-1"), { x: 820, opacity: 0 }, { x: -340, opacity: 0.6, duration: 0.18, ease: "none" }, 0.3)
      .fromTo(q(".dem-2"), { x: 820, opacity: 0 }, { x: 0, opacity: 1, duration: 0.14, ease: "power3.out" }, 0.4)
      .fromTo(q(".dem-2"), { scale: 1.04 }, { scale: 1, duration: 0.04, ease: "back.out(3)" }, 0.54)
      .fromTo(q(".match"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.04 }, 0.56)
      // el seguimiento entra y la tarjeta avanza una columna cada 8 % del tramo
      .fromTo(q(".kanban"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.1 }, 0.6)
      .to(q(".kcard"), { ...colStep, duration: 0.05 }, 0.7)
      .to(q(".kcol-1"), { color: "#fff", borderColor: "#fff", duration: 0.05 }, 0.7)
      .to(q(".kcol-0"), { color: "#737373", borderColor: "#262626", duration: 0.05 }, 0.7)
      .to(q(".kcard"), { ...colStep, duration: 0.05 }, 0.78)
      .to(q(".kcol-2"), { color: "#fff", borderColor: "#fff", duration: 0.05 }, 0.78)
      .to(q(".kcol-1"), { color: "#737373", borderColor: "#262626", duration: 0.05 }, 0.78)
      .to(q(".kcard .ktag"), { opacity: 1, duration: 0.03 }, 0.8);
  });

  return (
    <Chapter id="seguimiento">
      <div ref={ref} className="stagewrap">
        <div className="halo" style={{ left: "20%", top: "10%", width: 1100, height: 700 }} />

        <div className="copy copy-block">
          <ChapterCopy
            module="Inmuebles · Demandas · Seguimiento"
            what="tu cartera, cruzada con lo que buscan tus clientes"
            title={
              <>
                Cada piso nuevo,
                <br />
                cruzado con tus demandas.
              </>
            }
            grey="Y cada operación, por etapas."
          />
          <div className="mt-6 hidden md:block">
            <CheckList
              items={[
                "Stock de la agencia con referencia propia, estado y comercial",
                "Demandas que se cruzan solas con el stock",
                "Seguimiento por etapas, con llamadas, visitas y documentos",
                "Compradores y propietarios en un mismo hilo",
              ]}
            />
          </div>
        </div>

        {/* la columna visual: inmuebles → demandas → seguimiento, de arriba abajo */}
        <div className="visual-col hidden flex-col gap-4 md:flex md:justify-center-safe">
          {/* Inmuebles */}
          <div className="inm panel flex flex-col gap-2 p-4" style={{ opacity: 0 }}>
            <div className="flex items-center justify-between text-[13px] text-white8">
              <span>Inmuebles</span>
              <span className="mono text-[11px] text-grey5">stock de la agencia · 2 disponibles</span>
            </div>
            <div className="mono grid grid-cols-[36px_1fr_90px_100px] gap-3 text-[11px] text-grey5">
              <span />
              <span>inmueble</span>
              <span className="text-right">precio</span>
              <span>estado</span>
            </div>
            {[
              { bars: true, price: "450.000 €", st: "disponible", hero: false },
              { bars: false, price: "435.000 €", st: "disponible", hero: true },
              { bars: true, price: "260.000 €", st: "reservado", hero: false },
            ].map((r, i) => (
              <div
                key={i}
                className={`${r.hero ? "inm-hero" : ""} grid grid-cols-[36px_1fr_90px_100px] items-center gap-3 border-t border-[#1F1F1F] py-[8px] text-[13px]`}
                style={r.hero ? { border: "1px solid transparent", borderRadius: 8, padding: 10, margin: "0 -6px" } : { opacity: 0.5 }}
              >
                <div className="h-9 w-9 rounded-[6px]" style={{ background: "linear-gradient(135deg,#2A2A2A,#1A1A1A)" }} />
                <div className="flex flex-col gap-[6px]">
                  {r.hero ? (
                    <>
                      <span className="font-medium text-white8">Piso en calle de Posse</span>
                      <span className="mono text-[11px] text-grey6">
                        RHB-2026-0002 · 92 m² · <span className="text-green">vinculado a catastro</span>
                      </span>
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

          {/* Demandas: cruzan por delante y la que coincide se queda */}
          <div className="relative h-[116px] overflow-hidden">
            {demands.map((d, i) => (
              <div
                key={d.who}
                className={`dem dem-${i} card absolute left-0 flex w-[280px] flex-col gap-2 px-[14px] py-3 text-[12px] text-grey6`}
                style={{
                  top: i === 2 ? 0 : i * 28,
                  opacity: 0,
                  borderColor: d.ok ? "#22C55E" : undefined,
                  boxShadow: d.ok ? "0 0 0 1px rgba(34,197,94,.3), 0 20px 40px rgba(0,0,0,.6)" : undefined,
                }}
              >
                <b className="text-[13px] font-medium text-white8">Demanda · {d.who}</b>
                <span>{d.what}</span>
                {d.ok ? (
                  <span className="match st st-g" style={{ opacity: 0 }}>
                    ● coincidencia alta → Piso en calle de Posse
                  </span>
                ) : (
                  <span className="st st-n">sin coincidencia</span>
                )}
              </div>
            ))}
          </div>

          {/* Seguimiento */}
          <div className="kanban panel flex flex-col gap-3 p-4" style={{ opacity: 0 }}>
            <div className="flex items-center justify-between text-[13px] text-white8">
              <span>Seguimiento</span>
              <span className="mono text-[11px] text-grey5">etapas configurables</span>
            </div>
            <div className="relative flex gap-[10px]">
              {columns.map((c, k) => (
                <div key={c} className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className={`kcol-${k} truncate border-b pb-[6px] text-[10px] uppercase tracking-[0.1em]`} style={{ color: k === 0 ? "#fff" : "#737373", borderColor: k === 0 ? "#fff" : "#262626" }}>
                    {c}
                  </div>
                  {k !== 2 && (
                    <div className="flex flex-col gap-[6px] rounded-[8px] border border-grey3 bg-black2 p-[10px]" style={{ opacity: 0.4 }}>
                      <div className="bar" style={{ width: "65%" }} />
                      <div className="bar" style={{ width: "35%", height: 5 }} />
                    </div>
                  )}
                  {k === 0 && (
                    <div className="flex flex-col gap-[6px] rounded-[8px] border border-grey3 bg-black2 p-[10px]" style={{ opacity: 0.4 }}>
                      <div className="bar" style={{ width: "50%" }} />
                    </div>
                  )}
                </div>
              ))}
              {/* la tarjeta que avanza: mide exactamente una columna */}
              <div className="kcard absolute left-0 top-[26px] flex flex-col gap-[6px] rounded-[8px] border border-grey4 bg-[#1C1C1C] p-[10px]" style={{ width: "calc((100% - 40px) / 5)", boxShadow: "0 16px 30px rgba(0,0,0,.6)" }}>
                <span className="truncate text-[12px] text-white8">Piso en calle de Posse</span>
                <span className="mono truncate text-[10px] text-grey6">Familia López</span>
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
