"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { ChapterCopy, CheckList } from "@/components/ui/atoms";
import { countTo, typeText } from "@/components/motion/count";
import { StreetMap } from "@/components/crm/StreetMap";

/**
 * 03 · 09:15 · Catastro. El mapa de calles en 3D y, encima, el Catastro trabajando como trabaja de verdad:
 * por zonas. Cada rastreo (código postal o calle) enciende sus manzanas, cuenta fincas y candidatas,
 * y al final una parcela concreta se vincula al anuncio del 3º izquierda con su referencia y la nota simple.
 */

const scans = [
  { id: "CP 15009", zone: "15009", fincas: 378, cand: 85, who: "Ana", pct: 0.72, state: "pausada", at: 0.14, label: { left: "60%", top: "34%" } },
  { id: "CP 15005", zone: "15005", fincas: 32, cand: 5, who: "Marta", pct: 1, state: "completa", at: 0.34, label: { left: "82%", top: "22%" } },
  { id: "RD NELLE", zone: "nelle", fincas: 38, cand: 20, who: "Luis", pct: 0.44, state: "en curso", at: 0.52, label: { left: "16%", top: "62%" } },
] as const;

export function Catastro() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q, enter) => {
    // entrada: copy, mapa y panel de rastreos suben ya puestos con la pantalla
    enter.fromTo(q(".copy"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .fromTo(q(".map3d"), { opacity: 0, rotateX: 40, y: 80 }, { opacity: 1, rotateX: 28, y: 0, duration: 0.9 }, 0.1)
      .fromTo(q(".scans"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 0.3);

    scans.forEach((sc, k) => {
      const blocksSel = q(`.blk.z-${sc.zone}`);
      // las manzanas de la zona se encienden una a una, hasta el porcentaje del rastreo
      const n = Math.max(1, Math.round(blocksSel.length * sc.pct));
      tl.to(blocksSel.slice(0, n), { fill: "rgba(34,197,94,.22)", stroke: "#22C55E", duration: 0.03, stagger: 0.012 }, sc.at)
        .to(blocksSel.slice(n), { fill: "#161616", stroke: "#2A2A2A", duration: 0.04 }, sc.at)
        .fromTo(q(`.lab-${k}`), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.05 }, sc.at + 0.05)
        .fromTo(q(`.lab-${k} .ln`), { scaleY: 0 }, { scaleY: 1, duration: 0.04, transformOrigin: "bottom" }, sc.at + 0.03)
        .fromTo(q(`.row-${k} .pg-fill`), { scaleX: 0 }, { scaleX: sc.pct, duration: 0.12, transformOrigin: "left", ease: "none" }, sc.at)
        .fromTo(q(`.row-${k} .st`), { opacity: 0.3 }, { opacity: 1, duration: 0.03 }, sc.at + 0.12);
      countTo(tl, q(`.row-${k} .n-fincas`)[0], { from: 0, to: sc.fincas, at: sc.at, dur: 0.12 });
      countTo(tl, q(`.row-${k} .n-cand`)[0], { from: 0, to: sc.cand, at: sc.at + 0.02, dur: 0.12 });
      countTo(tl, q(`.lab-${k} .n`)[0], { from: 0, to: sc.cand, at: sc.at + 0.04, dur: 0.1 });
    });

    // La parcela: una manzana concreta de CP 15009 se vincula al anuncio
    tl.to(q(".blk-hero"), { fill: "rgba(34,197,94,.55)", stroke: "#fff", strokeWidth: 2, duration: 0.05 }, 0.7)
      .fromTo(q(".hero-ring"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.06, ease: "back.out(2)" }, 0.7)
      .fromTo(q(".vinc"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.08 }, 0.74)
      .fromTo(q(".vinc-chip"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.04 }, 0.84)
      .fromTo(q(".stamp"), { opacity: 0, scale: 1.4, rotate: -6 }, { opacity: 1, scale: 1, rotate: -3, duration: 0.05, ease: "back.out(2)" }, 0.9);
    typeText(tl, q(".refcat")[0], "0000000XX0000X0000XX", { at: 0.78, dur: 0.08 });
  });

  return (
    <Chapter id="catastro">
      <div ref={ref} className="stagewrap">
        <div className="halo" style={{ right: "-8%", top: 0, width: 1000, height: 800 }} />

        <div className="copy copy-block">
          <ChapterCopy
            module="Catastro"
            what="localiza la finca real detrás de cada anuncio"
            title={
              <>
                Del anuncio
                <br />
                a la finca real.
              </>
            }
            grey="Y a su nota simple."
            body="Buscas por calle o código postal, statecrm separa las fincas candidatas y vincula el anuncio a su referencia catastral. La nota simple, a un clic."
          />
          <div className="mt-5 hidden md:block">
            <CheckList items={["Rastreos por calle o código postal, reanudables", "Fincas candidatas por zona y por comercial", "Vinculación catastral del inmueble", "Nota simple sin salir de la ficha"]} />
          </div>
        </div>

        {/* Historial de rastreos, compacto, bajo el texto (en pantallas bajas no cabe y se omite) */}
        <div className="scans panel absolute bottom-6 left-[var(--gutter)] z-10 hidden w-[440px] flex-col gap-1 p-4 md:flex [@media(max-height:780px)]:md:hidden" style={{ opacity: 0 }}>
          <div className="mb-1 flex items-center justify-between text-[13px] text-white8">
            <span>Historial de rastreos</span>
            <span className="mono text-[11px] text-grey5">por calle · por código postal</span>
          </div>
          {scans.map((sc, k) => (
            <div key={sc.id} className={`row-${k} flex items-center gap-3 border-t border-[#1F1F1F] py-[9px] text-[12px]`}>
              <span className="mono w-[76px] text-white7">{sc.id}</span>
              <span className="flex-1 text-[11px] text-grey5">
                <span className="n-fincas text-white7">0</span> fincas · <span className="n-cand text-green">0</span> cand. · {sc.who}
              </span>
              <span className={`st ${sc.state === "pausada" ? "st-a" : sc.state === "completa" ? "st-g" : "st-n"}`} style={{ opacity: 0.3 }}>
                {sc.state}
              </span>
              <span className="relative h-1 w-[70px] overflow-hidden rounded-full bg-grey3">
                <span className="pg-fill absolute inset-y-0 left-0 w-full bg-green" style={{ transform: "scaleX(0)" }} />
              </span>
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
            {/* anillo sobre la parcela vinculada (manzana 660,260 · 110x60 en el viewBox 1200x900) */}
            <div className="hero-ring absolute rounded-full border border-green" style={{ left: `${((660 + 55) / 1200) * 100}%`, top: `${((260 + 30) / 900) * 100}%`, width: 120, height: 120, marginLeft: -60, marginTop: -60, opacity: 0, boxShadow: "0 0 40px rgba(34,197,94,.35)" }} />
          </div>

          {/* etiquetas planas por zona */}
          <div className="labels absolute inset-0">
            {scans.map((sc, k) => (
              <div key={sc.id} className={`lab-${k} mono absolute flex flex-col items-start text-[11px] text-grey6`} style={{ left: sc.label.left, top: sc.label.top, opacity: 0 }}>
                <span className="ln mb-2 ml-[2px] block h-7 w-px bg-grey5" />
                <span className="card px-[10px] py-[6px]">
                  <span className="text-white8">{sc.id}</span> · <span className="n text-green">0</span> candidatas · {sc.who}
                </span>
              </div>
            ))}
          </div>

          {/* la vinculación */}
          <div className="vinc card absolute inset-x-0 top-[290px] z-10 flex flex-col gap-2 p-[16px] md:bottom-[40px] md:left-auto md:right-0 md:top-auto md:w-[400px]" style={{ background: "#171717", opacity: 0 }}>
            <div className="flex items-center justify-between text-[13px] text-white8">
              <span>Casa en Camino Rianxiño, 115</span>
              <span className="vinc-chip mono text-[11px] text-green" style={{ opacity: 0 }}>
                ● vinculada
              </span>
            </div>
            {[
              ["Referencia catastral", <span key="r" className="refcat mono text-white8" />],
              ["Superficie construida", "200 m²"],
              ["Año · uso", "1998 · residencial"],
              ["División horizontal", "sin división"],
            ].map(([k, v]) => (
              <div key={k as string} className="flex justify-between border-t border-[#1F1F1F] py-2 text-[12px]">
                <span className="text-grey5">{k as string}</span>
                <span className="text-white7">{v}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-[#1F1F1F] py-2 text-[12px]">
              <span className="text-grey5">Nota simple</span>
              <span className="stamp st st-g" style={{ opacity: 0 }}>
                solicitada · 09:17
              </span>
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
