"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { ChapterCopy } from "@/components/ui/atoms";
import { countTo, typeText } from "@/components/motion/count";
import { StreetMap } from "@/components/crm/StreetMap";

/**
 * 03 · 09:15 · Catastro.
 * Una misión a la izquierda. Mapa + vinculación contenidos a la derecha.
 */

const scans = [
  { id: "CP 15009", zone: "15009", fincas: 378, cand: 85, who: "Ana", pct: 0.72, state: "pausada", at: 0.14, label: { left: "58%", top: "28%" } },
  { id: "CP 15005", zone: "15005", fincas: 32, cand: 5, who: "Marta", pct: 1, state: "completa", at: 0.34, label: { left: "78%", top: "18%" } },
  { id: "RD NELLE", zone: "nelle", fincas: 38, cand: 20, who: "Luis", pct: 0.44, state: "en curso", at: 0.52, label: { left: "14%", top: "58%" } },
] as const;

export function Catastro() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q) => {
    tl.fromTo(q(".copy"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0)
      .fromTo(q(".map3d"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.14 }, 0.02)
      .fromTo(q(".scans"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.1 }, 0.08);

    scans.forEach((sc, k) => {
      const blocksSel = q(`.blk.z-${sc.zone}`);
      const n = Math.max(1, Math.round(blocksSel.length * sc.pct));
      tl.to(blocksSel.slice(0, n), { fill: "rgba(34,197,94,.22)", stroke: "#22C55E", duration: 0.03, stagger: 0.012 }, sc.at)
        .to(blocksSel.slice(n), { fill: "#161616", stroke: "#2A2A2A", duration: 0.04 }, sc.at)
        .fromTo(q(`.lab-${k}`), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.05 }, sc.at + 0.05)
        .fromTo(q(`.row-${k} .pg-fill`), { scaleX: 0 }, { scaleX: sc.pct, duration: 0.12, transformOrigin: "left", ease: "none" }, sc.at)
        .fromTo(q(`.row-${k} .st`), { opacity: 0.3 }, { opacity: 1, duration: 0.03 }, sc.at + 0.12);
      countTo(tl, q(`.row-${k} .n-fincas`)[0], { from: 0, to: sc.fincas, at: sc.at, dur: 0.12 });
      countTo(tl, q(`.row-${k} .n-cand`)[0], { from: 0, to: sc.cand, at: sc.at + 0.02, dur: 0.12 });
      countTo(tl, q(`.lab-${k} .n`)[0], { from: 0, to: sc.cand, at: sc.at + 0.04, dur: 0.1 });
    });

    tl.to(q(".blk-hero"), { fill: "rgba(34,197,94,.55)", stroke: "#fff", strokeWidth: 2, duration: 0.05 }, 0.7)
      .fromTo(q(".hero-ring"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.06, ease: "back.out(2)" }, 0.7)
      .fromTo(q(".vinc"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.08 }, 0.74)
      .fromTo(q(".vinc-chip"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.04 }, 0.84)
      .fromTo(q(".stamp"), { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 0.05, ease: "back.out(2)" }, 0.9);
    typeText(tl, q(".refcat")[0], "0000000XX0000X0000XX", { at: 0.78, dur: 0.08 });
    tl.to(q(".copy, .visual"), { opacity: 0.45, duration: 0.08 }, 0.94);
  });

  return (
    <Chapter id="catastro">
      <div ref={ref} className="stage-frame gutter">
        <div className="stage-copy copy">
          <ChapterCopy
            module="Catastro"
            what="rastreos por zona"
            title={
              <>
                09:15.
                <br />
                ¿Qué piso es,
              </>
            }
            grey="de verdad?"
            body="Rastrea por CP o calle, separa candidatas y vincula el anuncio a su referencia. Nota simple incluida."
          />
        </div>

        <div className="stage-visual visual relative flex flex-col gap-3">
          <div className="scans panel hidden w-full flex-col gap-1 p-3 md:flex" style={{ opacity: 0 }}>
            <div className="mb-1 flex items-center justify-between text-[13px] text-white8">
              <span>Historial de rastreos</span>
              <span className="mono text-[11px] text-grey5">calle · CP</span>
            </div>
            {scans.map((sc, k) => (
              <div key={sc.id} className={`row-${k} flex items-center gap-3 border-t border-[#1F1F1F] py-[8px] text-[12px]`}>
                <span className="mono w-[72px] text-white7">{sc.id}</span>
                <span className="flex-1 text-[11px] text-grey5">
                  <span className="n-fincas text-white7">0</span> fincas · <span className="n-cand text-green">0</span> cand. · {sc.who}
                </span>
                <span className={`st ${sc.state === "pausada" ? "st-a" : sc.state === "completa" ? "st-g" : "st-n"}`} style={{ opacity: 0.3 }}>
                  {sc.state}
                </span>
                <span className="relative h-1 w-[56px] overflow-hidden rounded-full bg-grey3">
                  <span className="pg-fill absolute inset-y-0 left-0 w-full bg-green" style={{ transform: "scaleX(0)" }} />
                </span>
              </div>
            ))}
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden rounded-[12px] border border-grey3" style={{ background: "#0C0C0C" }}>
            <div className="map3d relative h-full w-full" style={{ opacity: 0 }}>
              <div className="h-full w-full" style={{ minHeight: 280 }}>
                <StreetMap />
              </div>
              <div
                className="hero-ring absolute rounded-full border border-green"
                style={{
                  left: `${((660 + 55) / 1200) * 100}%`,
                  top: `${((260 + 30) / 900) * 100}%`,
                  width: 80,
                  height: 80,
                  marginLeft: -40,
                  marginTop: -40,
                  opacity: 0,
                  boxShadow: "0 0 40px rgba(34,197,94,.35)",
                }}
              />
              {scans.map((sc, k) => (
                <div key={sc.id} className={`lab-${k} mono absolute text-[11px] text-grey6`} style={{ left: sc.label.left, top: sc.label.top, opacity: 0 }}>
                  <span className="card px-[8px] py-[4px]">
                    <span className="text-white8">{sc.id}</span> · <span className="n text-green">0</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="vinc card absolute bottom-3 left-3 right-3 z-10 flex flex-col gap-1.5 p-3 md:left-auto md:right-3 md:w-[320px]" style={{ background: "#171717", opacity: 0 }}>
              <div className="flex items-center justify-between text-[13px] text-white8">
                <span className="truncate">Camino Rianxiño, 115</span>
                <span className="vinc-chip mono text-[11px] text-green" style={{ opacity: 0 }}>
                  ● vinculada
                </span>
              </div>
              {[
                ["Ref. catastral", <span key="r" className="refcat mono text-white8" />],
                ["Superficie", "200 m²"],
                ["Nota simple", <span key="s" className="stamp st st-g" style={{ opacity: 0 }}>solicitada</span>],
              ].map(([k, v]) => (
                <div key={k as string} className="flex justify-between border-t border-[#1F1F1F] py-1.5 text-[12px]">
                  <span className="text-grey5">{k as string}</span>
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
