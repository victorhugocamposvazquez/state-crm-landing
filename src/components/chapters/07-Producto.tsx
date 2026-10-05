"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { Check, Kicker } from "@/components/ui/atoms";

const modules = [
  { name: "Captación", line: "Particulares cada mañana, con teléfono y fotos.", metric: "38 captados hoy", kind: "g" },
  { name: "Catastro", line: "Rastreos por calle o CP; nota simple incluida.", metric: "378 fincas", kind: "g" },
  { name: "Inmuebles", line: "Stock con referencia, estado y comercial.", metric: "RHB-2026-0002", kind: "n" },
  { name: "Demandas", line: "Lo que busca cada cliente, cruzado solo.", metric: "coincidencia", kind: "g" },
  { name: "Seguimiento", line: "Etapas configurables hasta la reserva.", metric: "captado → reserva", kind: "n" },
  { name: "Tareas", line: "Personales y de equipo, con prioridad.", metric: "8 pendientes", kind: "n" },
  { name: "Calendario", line: "Visitas y firmas; varias oficinas.", metric: "visita 13:00", kind: "g" },
  { name: "Presupuestos", line: "Por partidas, con tasa de aceptación.", metric: "PRS → FAC", kind: "g" },
  { name: "Facturas", line: "Enlazadas al inmueble y al cliente.", metric: "cobrada", kind: "g" },
];

const checks = [
  "Captación diaria de particulares",
  "Catastro con nota simple",
  "Demandas que se cruzan solas",
  "Seguimiento por etapas",
  "Equipo y calendario",
  "Obra, facturas e informes",
];

/**
 * 07 · 20:30 · Todo el producto.
 * Grid contenido: los módulos aparecen con el scroll, sin túnel 3D fuera de ventana.
 */
export function Producto() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q) => {
    tl.fromTo(q(".copy"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.08 }, 0)
      .fromTo(q(".mod"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.06, stagger: 0.04 }, 0.1)
      .fromTo(q(".checks"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.08 }, 0.7)
      .to(q(".copy, .visual"), { opacity: 0.5, duration: 0.08 }, 0.94);
  });

  return (
    <Chapter id="producto">
      <div ref={ref} className="stage-frame gutter">
        <div className="stage-copy copy">
          <div className="mb-4">
            <Kicker module="Producto" what="un CRM a la medida de cada agencia" />
          </div>
          <h2 className="display m-0 text-[28px] text-white8 md:text-[36px]">
            Cada agencia trabaja distinto.
            <br />
            <span className="text-grey5">Por eso statecrm es el tuyo.</span>
          </h2>
          <div className="checks mt-8" style={{ opacity: 0 }}>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[13px] text-white7 md:text-[14px]">
              {checks.map((c) => (
                <li key={c} className="flex items-center gap-2.5">
                  <Check />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="stage-visual visual">
          <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <div key={m.name} className="mod card flex flex-col gap-2 p-3" style={{ opacity: 0, background: "#111", borderColor: "#262626" }}>
                <div className="flex justify-between text-[13px]">
                  <span className="font-medium text-white8">{m.name}</span>
                  <span className={`st ${m.kind === "g" ? "st-g" : "st-n"} mono`}>{m.metric}</span>
                </div>
                <p className="m-0 text-[12px] leading-[1.45] text-grey6">{m.line}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Chapter>
  );
}
