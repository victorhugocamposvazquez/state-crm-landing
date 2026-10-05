"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { Brand, Check, Kicker } from "@/components/ui/atoms";

const modules = [
  { name: "Captación", n: "02", line: "Anuncios de particulares, cada mañana, con teléfono y fotos.", metric: "38 captados hoy", kind: "g" },
  { name: "Catastro", n: "03", line: "Rastreos por calle o CP; fincas, candidatas, nota simple.", metric: "378 fincas · 85 candidatas", kind: "g" },
  { name: "Inmuebles", n: "04", line: "El stock de la agencia con referencia, estado y comercial.", metric: "RHB-2026-0002 · 435.000 €", kind: "n" },
  { name: "Demandas", n: "04", line: "Lo que busca cada cliente, cruzado solo con el stock.", metric: "coincidencia alta", kind: "g" },
  { name: "Seguimiento", n: "04", line: "Etapas configurables; llamadas, visitas y documentos.", metric: "captado → reserva", kind: "n" },
  { name: "Clientes", n: "04", line: "Compradores y propietarios en un mismo hilo.", metric: "Familia López · Ana", kind: "n" },
  { name: "Tareas", n: "05", line: "Personales y del equipo, con prioridad y badge.", metric: "8 pendientes", kind: "n" },
  { name: "Calendario", n: "05", line: "Visitas, firmas y llamadas; varias oficinas.", metric: "visita 13:00", kind: "g" },
  { name: "Herramientas", n: "07", line: "Las utilidades de la agencia, a medida.", metric: "las que decidas", kind: "n" },
  { name: "Presupuestos", n: "06", line: "Por partidas, con estados y tasa de aceptación.", metric: "PRS → FAC", kind: "g" },
  { name: "Facturas", n: "06", line: "Enlazadas al inmueble y al cliente; estado de cobro.", metric: "FAC-2026-0001 · cobrada", kind: "g" },
  { name: "Informes", n: "06", line: "Captación, seguimiento y obra por oficina.", metric: "captación → venta", kind: "n" },
];

const sidebar = [
  { sec: null, items: ["Calendario", "Tareas"] },
  { sec: "Captación", items: ["Captación", "Catastro", "Seguimiento", "Inmuebles", "Demandas", "Clientes"] },
  { sec: "Herramientas", items: ["Herramientas"] },
  { sec: "Obra y facturación", items: ["Presupuestos", "Facturas", "Informes"] },
];

const checks = [
  "Captación diaria de particulares",
  "Detección de agencias encubiertas",
  "Catastro integrado con nota simple",
  "Inmuebles y demandas que se cruzan solos",
  "Seguimiento por etapas",
  "Tareas y calendario de equipo",
  "Presupuestos, facturas e informes",
  "Móvil sin instalar nada",
  "Hecho a la medida de tu agencia",
];

const STEP = 420; // separación en z entre paneles
/** momento del tramo (0–1) en que la cámara llega al panel k */
const panelAt = (k: number) => 0.06 + (k / (modules.length - 1)) * 0.78;
/** los paneles a los que la cámara llega antes del 30 % del tramo nacen ya encendidos */
const panelLit = (k: number) => panelAt(k) - 0.3 <= 0;

/**
 * 07 · 20:30 · Todo el producto. Los doce módulos como paneles en un espacio negro;
 * la cámara los recorre con el scroll y cada uno enciende su entrada en la barra lateral.
 * En móvil es un túnel vertical: los paneles vienen desde el fondo hacia la cámara.
 */
export function Producto() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q, enter) => {
    const panels = q(".mod");
    const sides = q(".side-item");
    // entrada: copy y barra lateral suben ya puestos con la pantalla
    enter.fromTo(q(".copy"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .fromTo(q(".sidebar"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8 }, 0.2);

    // la cámara avanza por el espacio
    tl.fromTo(q(".space"), { z: 0 }, { z: STEP * (modules.length - 1) + 200, duration: 0.78, ease: "none" }, 0.06);
    panels.forEach((p, k) => {
      const t = panelAt(k);
      // los primeros paneles nacen encendidos (ver `lit` en el JSX); el resto se enciende al acercarse la cámara
      if (!panelLit(k)) tl.fromTo(p, { opacity: 0 }, { opacity: 1, duration: 0.1 }, t - 0.3);
      tl.to(p, { opacity: 0, duration: 0.03 }, t + 0.012);
      const side = sides.find((s) => s.getAttribute("data-mod") === modules[k].name);
      if (side) {
        tl.to(side, { color: "#fff", background: "#171717", duration: 0.03 }, t - 0.03)
          .to(side, { color: "#A3A3A3", background: "transparent", duration: 0.03 }, t + 0.05)
          .fromTo(side.querySelector(".seen"), { opacity: 0 }, { opacity: 1, duration: 0.02 }, t + 0.05);
      }
    });
    tl.fromTo(q(".checks"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.08 }, 0.86)
      .fromTo(q(".checks li"), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.03, stagger: 0.008 }, 0.87);
  });

  return (
    <Chapter id="producto">
      <div ref={ref} className="stagewrap">
        <div className="halo" style={{ left: "30%", top: "10%", width: 1000, height: 700 }} />

        <div className="copy copy-block md:w-[700px]">
          <div className="mb-5">
            <Kicker module="Todos los módulos" what="los doce módulos, a la medida de cada agencia" />
          </div>
          <h2 className="t-h1 m-0 text-white8">
            Cada agencia trabaja distinto.
            <br />
            <span className="text-grey5">
              Por eso <Brand wordmark /> no es un CRM: es el tuyo.
            </span>
          </h2>
        </div>

        {/* barra lateral conceptual */}
        <div className="sidebar absolute left-[var(--gutter)] top-[300px] z-10 hidden w-[200px] rounded-[10px] border border-[#1F1F1F] p-2 md:block" style={{ background: "#0F0F0F", opacity: 0 }}>
          {sidebar.map((g) => (
            <div key={g.sec ?? "top"}>
              {g.sec && <div className="px-[10px] pb-1 pt-[10px] text-[10px] uppercase tracking-[0.12em] text-grey4">{g.sec}</div>}
              {g.items.map((it) => (
                <div key={it} data-mod={it} className="side-item flex items-center gap-[10px] rounded-[6px] px-[10px] py-[5px] text-[13px] text-grey5">
                  <span className="h-[14px] w-[14px] rounded-[3px] border border-grey4" />
                  {it}
                  <span className="seen ml-auto" style={{ opacity: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* el espacio de módulos: a la derecha de la barra lateral y dentro del lienzo */}
        <div className="absolute inset-x-[var(--gutter)] bottom-0 top-[320px] md:left-[300px] md:top-[220px]" style={{ perspective: 1400, perspectiveOrigin: "50% 45%" }}>
          <div className="space relative h-full" style={{ transformStyle: "preserve-3d" }}>
            {modules.map((m, k) => {
              const lane = k % 3; // izquierda, centro, derecha (siempre dentro del espacio)
              const x = lane === 0 ? 2 : lane === 1 ? 33 : 64;
              const y = (k % 4) * 9 + 6;
              return (
                <div
                  key={m.name}
                  className="mod card absolute flex w-[280px] flex-col gap-[10px] p-[14px] md:w-[320px]"
                  style={{
                    // nunca más allá del borde derecho del espacio (en móvil, todos casi a la izquierda: túnel vertical)
                    left: `min(${x}%, calc(100% - 320px))`,
                    top: `${y}%`,
                    transform: `translate3d(0,0,${-k * STEP}px) rotateY(${lane === 0 ? 10 : lane === 2 ? -10 : 0}deg)`,
                    opacity: panelLit(k) ? 1 : 0,
                    background: "#111",
                    borderColor: "#262626",
                  }}
                >
                  <div className="mono flex justify-between text-[11px] text-grey5">
                    <span className="text-white8">{m.name}</span>
                    <span>{m.n}</span>
                  </div>
                  <div className="text-[13px] leading-[1.5] text-grey6">{m.line}</div>
                  <span className={`st ${m.kind === "g" ? "st-g" : "st-n"} mono self-start`}>{m.metric}</span>
                  <div className="flex gap-[6px]">
                    {[60, 40, 75].map((w, i) => (
                      <span key={i} className="bar" style={{ width: `${w / 3}%`, height: 5 }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* la lista final con checks */}
        <div className="checks absolute inset-x-[var(--gutter)] bottom-8 z-10 border-t border-[#171717] pt-5 md:left-[300px] md:bottom-10" style={{ opacity: 0 }}>
          <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-[10px] p-0 text-[13px] text-white7 sm:grid-cols-2 md:grid-cols-3 md:text-[14px]">
            {checks.map((c) => (
              <li key={c} className="flex items-center gap-[10px]">
                <Check />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Chapter>
  );
}
