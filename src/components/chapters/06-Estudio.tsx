"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { ChapterCopy } from "@/components/ui/atoms";

const formats = [
  { id: "post", label: "Post", ratio: "4:5" },
  { id: "cuadrado", label: "Cuadrado", ratio: "1:1" },
  { id: "reel", label: "Reel", ratio: "9:16" },
] as const;

const kinds = ["Nuevo inmueble", "Exclusiva", "Vendido"] as const;

const steps = ["Inmueble", "Diseño", "Editar", "Publicar"] as const;

/**
 * 06 · Estudio. Creatividades para redes a partir de la ficha.
 * Una sola pantalla: formato, tipo de anuncio y la pieza ya compuesta.
 */
export function Estudio() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (_tl, q, enter) => {
    enter.fromTo(q(".copy"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .fromTo(q(".studio"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9 }, 0.12);
  });

  return (
    <Chapter id="estudio">
      <div ref={ref} className="stagewrap">
        <div className="stageframe">
          <div className="copy copy-block">
            <ChapterCopy
              n="06"
              module="Estudio"
              what="La ficha del piso, lista para publicarse en redes."
            />
          </div>

          <div className="visual-col flex items-start md:items-center">
            <div className="studio panel w-full p-4 md:p-5" style={{ opacity: 0 }}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-[15px] font-medium tracking-[-0.02em] text-white8">Estudio</span>
                <span className="mono text-[12px] text-grey5">Calle del Pez, 18</span>
              </div>

              <ol className="m-0 mb-4 flex list-none gap-3 p-0 text-[11px]">
                {steps.map((step, i) => {
                  const on = i === 2;
                  const done = i < 2;
                  return (
                    <li key={step} className="flex items-center gap-1.5" style={{ color: on ? "#fff" : "#737373" }}>
                      <span
                        className="flex h-4 w-4 items-center justify-center rounded-full text-[9px]"
                        style={{
                          background: on ? "#fff" : "transparent",
                          color: on ? "#111" : done ? "#22C55E" : "#737373",
                          border: on ? "none" : `1px solid ${done ? "#22C55E" : "#3A3A3A"}`,
                        }}
                      >
                        {done ? "✓" : i + 1}
                      </span>
                      {step}
                    </li>
                  );
                })}
              </ol>

              <div className="mb-3 flex gap-2">
                {formats.map((f) => {
                  const on = f.id === "post";
                  return (
                    <span
                      key={f.id}
                      className="rounded-full border px-3 py-1 text-[12px]"
                      style={{
                        borderColor: on ? "#fff" : "#2A2A2A",
                        color: on ? "#fff" : "#A3A3A3",
                        background: on ? "#1C1C1C" : "transparent",
                      }}
                    >
                      {f.label}
                      <span className="mono ml-1.5 text-[10px] text-grey5">{f.ratio}</span>
                    </span>
                  );
                })}
              </div>

              <div className="mb-4 flex gap-2 text-[12px]">
                {kinds.map((k) => {
                  const on = k === "Nuevo inmueble";
                  return (
                    <span key={k} style={{ color: on ? "#fff" : "#737373" }}>
                      {k}
                    </span>
                  );
                })}
              </div>

              <div className="mx-auto w-full max-w-[280px] bg-[#F3F3F3] p-3 text-[#111]">
                <div className="mb-2 text-center text-[10px] font-medium tracking-[0.14em]">
                  STATE<span className="text-[#8A8A8A]">CRM</span>
                </div>
                <div className="mb-1.5 aspect-[16/10] bg-[#D5D5D5]" />
                <div className="mb-3 grid grid-cols-2 gap-1.5">
                  <div className="aspect-[16/10] bg-[#C8C8C8]" />
                  <div className="aspect-[16/10] bg-[#BEBEBE]" />
                </div>
                <div className="border-y border-[#111] py-2 text-[13px] font-medium uppercase leading-[1.15] tracking-[-0.02em]">
                  Piso en Calle del Pez
                </div>
                <div className="mt-2 flex items-end justify-between gap-2 text-[11px]">
                  <span>
                    <span className="block text-[13px] font-medium">92 m²</span>
                    Madrid · 3 dormitorios
                  </span>
                  <span className="text-[15px] font-medium tracking-[-0.03em]">260.000 €</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 text-[12px] text-grey6">
                <span>Portada · 3 fotos</span>
                <span className="rounded-full bg-white px-3 py-1 text-[12px] font-medium text-[#111]">Publicar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
