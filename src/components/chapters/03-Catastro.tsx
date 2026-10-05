"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { ChapterCopy, CheckList } from "@/components/ui/atoms";
import { countTo } from "@/components/motion/count";
import { StreetMap } from "@/components/crm/StreetMap";

/**
 * 03 · 09:15 · Catastro. Una sola idea, contada tres veces: el Catastro busca fincas, con y sin
 * división horizontal, por calle, por código postal o por localidad. Tres rastreos encienden sus
 * manzanas en el mapa (una calle, un código postal, una localidad) y al final se abre la lista de
 * fincas de uno de ellos, cada una con su etiqueta: con DH (edificio por pisos) o sin DH (una pieza).
 */

const scans = [
  { id: "Rolda de Nelle", kind: "calle", zone: "nelle", fincas: 38, dh: 21, sin: 17, who: "Luis", pct: 1, state: "completa", at: 0.12, label: { left: "14%", top: "62%" } },
  { id: "15009", kind: "código postal", zone: "15009", fincas: 378, dh: 212, sin: 166, who: "Ana", pct: 0.72, state: "pausada", at: 0.32, label: { left: "34%", top: "72%" } },
  { id: "Oleiros", kind: "localidad", zone: "15005", fincas: 1204, dh: 486, sin: 718, who: "Marta", pct: 0.38, state: "en curso", at: 0.52, label: { left: "78%", top: "46%" } },
] as const;

/** La lista de fincas del código postal: cada una con su división horizontal, o sin ella. */
const fincas: { addr: string; ref: string; dh: boolean; what: string; hero?: boolean }[] = [
  { addr: "Plaza de Castilla, 3", ref: "8731204NJ4983S", dh: true, what: "24 inmuebles" },
  { addr: "Plaza de Castilla, 5", ref: "8731205NJ4983S", dh: false, what: "casa", hero: true },
  { addr: "Plaza de Castilla, 7", ref: "8731206NJ4983S", dh: true, what: "12 inmuebles" },
  { addr: "Rúa Barcelona, 2", ref: "8731301NJ4983S", dh: false, what: "solar" },
];

export function Catastro() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q, enter) => {
    // entrada: copy, mapa y panel de rastreos suben ya puestos con la pantalla
    enter.fromTo(q(".copy"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .fromTo(q(".map3d"), { opacity: 0, rotateX: 40, y: 80 }, { opacity: 1, rotateX: 28, y: 0, duration: 0.9 }, 0.1)
      .fromTo(q(".scans"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 0.3);

    scans.forEach((sc, k) => {
      const blocksSel = q(`.blk.z-${sc.zone}`);
      // las manzanas de la zona se encienden una a una, hasta donde ha llegado el rastreo
      const n = Math.max(1, Math.round(blocksSel.length * sc.pct));
      tl.to(blocksSel.slice(0, n), { fill: "rgba(34,197,94,.22)", stroke: "#22C55E", duration: 0.03, stagger: 0.012 }, sc.at)
        .to(blocksSel.slice(n), { fill: "#161616", stroke: "#2A2A2A", duration: 0.04 }, sc.at)
        .fromTo(q(`.lab-${k}`), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.05 }, sc.at + 0.05)
        .fromTo(q(`.lab-${k} .ln`), { scaleY: 0 }, { scaleY: 1, duration: 0.04, transformOrigin: "bottom" }, sc.at + 0.03)
        .fromTo(q(`.row-${k}`), { opacity: 0.35 }, { opacity: 1, duration: 0.03 }, sc.at)
        .fromTo(q(`.row-${k} .pg-fill`), { scaleX: 0 }, { scaleX: sc.pct, duration: 0.12, transformOrigin: "left", ease: "none" }, sc.at)
        .fromTo(q(`.row-${k} .st`), { opacity: 0.3 }, { opacity: 1, duration: 0.03 }, sc.at + 0.12);
      countTo(tl, q(`.row-${k} .n-fincas`)[0], { from: 0, to: sc.fincas, at: sc.at, dur: 0.12 });
      countTo(tl, q(`.row-${k} .n-dh`)[0], { from: 0, to: sc.dh, at: sc.at + 0.01, dur: 0.12 });
      countTo(tl, q(`.row-${k} .n-sin`)[0], { from: 0, to: sc.sin, at: sc.at + 0.02, dur: 0.12 });
      countTo(tl, q(`.lab-${k} .n`)[0], { from: 0, to: sc.fincas, at: sc.at + 0.04, dur: 0.1 });
    });

    // La lista: se abren las fincas del código postal, con y sin división horizontal
    tl.fromTo(q(".res"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.08 }, 0.7)
      .fromTo(q(".res-row"), { opacity: 0, x: 12 }, { opacity: 1, x: 0, duration: 0.04, stagger: 0.025 }, 0.74)
      .to(q(".blk-hero"), { fill: "rgba(34,197,94,.55)", stroke: "#fff", strokeWidth: 2, duration: 0.05 }, 0.86)
      .fromTo(q(".hero-ring"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.06, ease: "back.out(2)" }, 0.86)
      .to(q(".res-hero"), { borderColor: "#3A3A3A", background: "#1C1C1C", duration: 0.05 }, 0.86);
  });

  return (
    <Chapter id="catastro">
      <div ref={ref} className="stagewrap">
        <div className="halo" style={{ right: "-8%", top: 0, width: 1000, height: 800 }} />

        <div className="copy copy-block">
          <ChapterCopy
            module="Catastro"
            what="fincas por calle, código postal o localidad"
            title={
              <>
                De la búsqueda
                <br />
                a la finca real.
              </>
            }
            grey="Con y sin división horizontal."
            body="Eliges una calle, un código postal o una localidad y statecrm recorre el Catastro finca a finca: las que tienen división horizontal, edificios con pisos, y las que no, casas, naves y solares. Los rastreos se pausan, se reanudan y quedan en el historial."
          />
          <div className="mt-5 hidden md:block">
            <CheckList
              items={[
                "Por calle, por código postal o por localidad",
                "Con división horizontal: edificios con pisos y locales",
                "Sin división horizontal: casas, naves y solares",
                "Rastreos que se pausan, se reanudan y se guardan",
              ]}
            />
          </div>
        </div>

        {/* Historial de rastreos, compacto, bajo el texto (en pantallas bajas no cabe y se omite) */}
        <div className="scans panel absolute bottom-6 left-[var(--gutter)] z-10 hidden w-[420px] flex-col p-4 md:flex [@media(max-height:840px)]:md:hidden" style={{ opacity: 0 }}>
          <div className="mb-2 flex items-center justify-between text-[13px] text-white8">
            <span>Rastreos</span>
            <span className="mono text-[11px] text-grey5">calle · código postal · localidad</span>
          </div>
          {scans.map((sc, k) => (
            <div key={sc.id} className={`row-${k} flex flex-col gap-[6px] border-t border-[#1F1F1F] py-[9px] text-[12px]`} style={{ opacity: 0.35 }}>
              <div className="flex items-center gap-2">
                <span className="mono w-[92px] flex-shrink-0 text-[10px] uppercase tracking-[0.06em] text-grey5">{sc.kind}</span>
                <span className="flex-1 truncate text-white8">{sc.id}</span>
                <span className={`st ${sc.state === "pausada" ? "st-a" : sc.state === "completa" ? "st-g" : "st-n"}`} style={{ opacity: 0.3 }}>
                  {sc.state}
                </span>
                <span className="relative h-1 w-[56px] overflow-hidden rounded-full bg-grey3">
                  <span className="pg-fill absolute inset-y-0 left-0 w-full bg-green" style={{ transform: "scaleX(0)" }} />
                </span>
              </div>
              <div className="mono flex items-center gap-2 pl-[100px] text-[11px] text-grey5">
                <span>
                  <span className="n-fincas text-white7">0</span> fincas
                </span>
                <span className="text-grey4">·</span>
                <span>
                  <span className="n-dh text-green">0</span> con DH
                </span>
                <span className="text-grey4">·</span>
                <span>
                  <span className="n-sin text-white7">0</span> sin DH
                </span>
                <span className="ml-auto">{sc.who}</span>
              </div>
            </div>
          ))}
        </div>

        {/* El mapa, ligeramente tumbado, en su columna */}
        <div className="visual-col" style={{ perspective: 1500, perspectiveOrigin: "50% 20%" }}>
          <div
            className="map3d absolute inset-x-0 top-[20px] md:top-0"
            style={{ transform: "rotateX(28deg)", transformOrigin: "50% 35%", opacity: 0, maskImage: "radial-gradient(ellipse at 50% 45%, #000 55%, transparent 85%)" }}
          >
            <div style={{ aspectRatio: "1200 / 900", background: "#0C0C0C", border: "1px solid #1C1C1C" }}>
              <StreetMap />
            </div>
            {/* anillo sobre la finca de la lista (manzana 660,260 · 110x60 en el viewBox 1200x900) */}
            <div className="hero-ring absolute rounded-full border border-green" style={{ left: `${((660 + 55) / 1200) * 100}%`, top: `${((260 + 30) / 900) * 100}%`, width: 120, height: 120, marginLeft: -60, marginTop: -60, opacity: 0, boxShadow: "0 0 40px rgba(34,197,94,.35)" }} />
          </div>

          {/* etiquetas planas por zona: qué se buscó y cuántas fincas lleva */}
          <div className="labels absolute inset-0">
            {scans.map((sc, k) => (
              <div key={sc.id} className={`lab-${k} mono absolute flex flex-col items-start text-[11px] text-grey6`} style={{ left: sc.label.left, top: sc.label.top, opacity: 0 }}>
                <span className="ln mb-2 ml-[2px] block h-7 w-px bg-grey5" />
                <span className="card px-[10px] py-[6px]">
                  <span className="text-grey5">{sc.kind}</span> <span className="text-white8">{sc.id}</span> · <span className="n text-green">0</span> fincas
                </span>
              </div>
            ))}
          </div>

          {/* la lista de fincas del rastreo: cada una, con o sin división horizontal */}
          <div className="res card absolute inset-x-0 top-[290px] z-10 flex flex-col p-[16px] md:bottom-[40px] md:left-auto md:right-0 md:top-auto md:w-[400px]" style={{ background: "#171717", opacity: 0 }}>
            <div className="flex items-center justify-between text-[13px] text-white8">
              <span>Fincas · código postal 15009</span>
              <span className="mono text-[11px] text-grey5">378</span>
            </div>
            <div className="mono mt-2 flex gap-2 text-[11px]">
              <span className="rounded-full border border-[#2A2A2A] px-2 py-[2px] text-white7">todas · 378</span>
              <span className="rounded-full border border-green/40 px-2 py-[2px] text-green">con DH · 212</span>
              <span className="rounded-full border border-[#2A2A2A] px-2 py-[2px] text-grey6">sin DH · 166</span>
            </div>
            <div className="mt-2 flex flex-col">
              {fincas.map((f) => (
                <div
                  key={f.ref}
                  className={`res-row ${f.hero ? "res-hero" : ""} flex items-center gap-3 border-t border-[#1F1F1F] py-[8px] text-[12px]`}
                  style={f.hero ? { border: "1px solid transparent", borderRadius: 8, padding: "8px 10px", margin: "0 -6px" } : undefined}
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                    <span className="truncate text-white8">{f.addr}</span>
                    <span className="mono text-[10px] text-grey5">{f.ref}</span>
                  </div>
                  <span className="mono text-[11px] text-grey6">{f.what}</span>
                  <span className={`st ${f.dh ? "st-g" : "st-n"}`}>{f.dh ? "con DH" : "sin DH"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
