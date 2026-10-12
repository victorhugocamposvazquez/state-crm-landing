"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { ChapterCopy } from "@/components/ui/atoms";

const sections = [
  { id: "captacion", group: "Captación", label: "Captación" },
  { id: "catastro", group: "Captación", label: "Catastro" },
  { id: "demandas", group: "Captación", label: "Demandas" },
  { id: "tareas", group: "Día a día", label: "Tareas" },
] as const;

/**
 * 07 · Los módulos. La navegación se queda; el scroll cambia la pantalla
 * (captación, catastro, demandas, tareas) por un esquema, no por tarjetas sueltas.
 */
export function Producto() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q, enter) => {
    const screens = q<HTMLElement>(".mod-screen");
    const sides = q<HTMLElement>(".side-item");
    enter.fromTo(q(".copy"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .fromTo(q(".app-shell"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.12);

    const hold = 0.88 / screens.length;
    screens.forEach((_, k) => {
      const t = 0.04 + k * hold;
      if (k === 0) return;
      tl.to(screens[k - 1], { opacity: 0, duration: 0.05 }, t)
        .fromTo(screens[k], { opacity: 0 }, { opacity: 1, duration: 0.05 }, t)
        .to(sides[k - 1], { color: "#A3A3A3", backgroundColor: "transparent", duration: 0.04 }, t)
        .to(sides[k], { color: "#fff", backgroundColor: "#1c1c1c", duration: 0.04 }, t);
    });
  });

  return (
    <Chapter id="producto">
      <div ref={ref} className="stagewrap">
        <div className="stageframe">
          <div className="halo" style={{ left: "30%", top: "8%", width: 1000, height: 700 }} />

          <div className="copy copy-block md:w-[760px]">
            <ChapterCopy
              n="07"
              module="Los módulos"
              what="Captación, catastro, seguimiento, equipo y facturación. Doce piezas, en una sola herramienta."
            />
          </div>

          <div className="app-shell absolute inset-x-0 bottom-4 top-[calc(var(--copy-top)+196px)] z-10 grid grid-cols-1 gap-3 md:grid-cols-[188px_minmax(0,1fr)] md:gap-4" style={{ opacity: 0 }}>
            <nav className="sidebar flex flex-col rounded-[12px] border border-[#1F1F1F] bg-[#0F0F0F] p-2" aria-label="Secciones">
              {sections.map((s, i) => {
                const head = i === 0 || sections[i - 1].group !== s.group;
                const on = i === 0;
                return (
                  <div key={s.id}>
                    {head && <div className="px-[10px] pb-1 pt-[10px] text-[10px] uppercase tracking-[0.12em] text-grey4">{s.group}</div>}
                    <div
                      data-mod={s.id}
                      className="side-item flex items-center gap-2 rounded-[8px] px-[10px] py-[7px] text-[13px]"
                      style={{ color: on ? "#fff" : "#A3A3A3", backgroundColor: on ? "#1c1c1c" : "transparent" }}
                    >
                      <Mark id={s.id} />
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </nav>

            <div className="app-stage panel relative min-h-[320px] overflow-hidden md:min-h-0">
              <Captacion />
              <Catastro />
              <Demandas />
              <Tareas />
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}

function Mark({ id }: { id: (typeof sections)[number]["id"] }) {
  const common = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": true as const };
  if (id === "captacion") return <svg {...common}><circle cx="11" cy="11" r="6" /><path d="m20 20-3.5-3.5" /></svg>;
  if (id === "catastro") return <svg {...common}><path d="M4 6h16v12H4z" /><path d="M4 10h16M9 6v12" /></svg>;
  if (id === "demandas") return <svg {...common}><circle cx="9" cy="9" r="3" /><circle cx="16" cy="10" r="2.2" /><path d="M4 18c.6-2.4 2.6-3.6 5-3.6s4.4 1.2 5 3.6M14 18c.3-1.4 1.4-2.2 2.8-2.2 1.2 0 2.2.6 2.7 1.8" /></svg>;
  return <svg {...common}><path d="M8 6h11M8 12h11M8 18h11" /><path d="m4 6 .8.8L6.5 5M4 12l.8.8L6.5 11M4 18l.8.8L6.5 17" /></svg>;
}

function Captacion() {
  const rows = [
    ["Calle norte, 12", "585.000 €"],
    ["Avenida del parque, 4", "305.000 €"],
    ["Plaza mayor, 9", "260.000 €"],
  ];
  return (
    <section className="mod-screen absolute inset-0 flex flex-col gap-3 p-4 md:p-5" data-screen="captacion" style={{ opacity: 1 }}>
      <Head title="Captación" hint="Lo que ha entrado hoy" />
      <div className="grid grid-cols-4 gap-2">
        {[
          ["12", "Nuevos"],
          ["7", "Subidas"],
          ["9", "Bajadas"],
          ["3", "En curso"],
        ].map(([n, l]) => (
          <div key={l} className="rounded-[10px] border border-[#222] bg-[#141414] px-3 py-2">
            <div className="text-[18px] font-medium tracking-[-0.03em] text-white8">{n}</div>
            <div className="text-[11px] text-grey5">{l}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {rows.map(([place, price]) => (
          <div key={place} className="grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 border-t border-[#1F1F1F] py-2.5">
            <span className="h-9 w-9 rounded-[6px]" style={{ background: "linear-gradient(135deg,#2A2A2A,#161616)" }} />
            <span className="min-w-0">
              <span className="block truncate text-[13px] text-white7">{place}</span>
              <span className="bar mt-1.5 block" style={{ width: "46%", height: 5 }} />
            </span>
            <span className="text-[13px] text-white8">{price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Catastro() {
  const rows = [
    ["Ciudad · calle norte", "30 fincas", "En curso", "n", "46%"],
    ["Costa · avenida", "18 fincas", "Completa", "g", "100%"],
    ["Centro · código", "62 fincas", "Pausada", "a", "22%"],
    ["Norte · calle sur", "7 fincas", "Completa", "g", "100%"],
  ] as const;
  return (
    <section className="mod-screen absolute inset-0 flex flex-col gap-3 p-4 md:p-5" data-screen="catastro" style={{ opacity: 0 }}>
      <Head title="Catastro" hint="Historial de rastreos" />
      <div className="flex gap-4 border-b border-[#1F1F1F] text-[13px] text-grey5">
        <span className="pb-2">Buscar</span>
        <span className="pb-2">Resultados</span>
        <span className="border-b border-white8 pb-2 text-white8">Historial</span>
      </div>
      <div className="flex flex-col">
        {rows.map(([place, meta, st, kind, w]) => (
          <div key={place} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-[#1F1F1F] py-2.5">
            <span className="min-w-0">
              <span className="block truncate text-[13px] text-white7">{place}</span>
              <span className="mono text-[11px] text-grey5">{meta}</span>
            </span>
            <span className="flex items-center gap-3">
              <span className={`st st-${kind}`}>{st}</span>
              <span className="hidden h-[3px] w-16 overflow-hidden rounded-full bg-[#222] sm:block">
                <span className="block h-full rounded-full" style={{ width: w, background: kind === "a" ? "#D4A017" : kind === "g" ? "#22C55E" : "#3A3A3A" }} />
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Demandas() {
  const cards = [
    ["Ana", "Compra · piso", "hasta 200.000 €", "0"],
    ["Luis", "Compra · piso", "hasta 620.000 €", "2"],
    ["Marta", "Alquiler · piso", "hasta 1.200 €", "1"],
    ["Nora", "Compra · casa", "hasta 450.000 €", "2"],
  ];
  return (
    <section className="mod-screen absolute inset-0 flex flex-col gap-3 p-4 md:p-5" data-screen="demandas" style={{ opacity: 0 }}>
      <Head title="Demandas" hint="Cruzadas con el stock" />
      <div className="grid grid-cols-2 gap-2">
        {cards.map(([who, what, price, n]) => (
          <div key={who} className="flex flex-col gap-2 rounded-[10px] border border-[#262626] bg-[#141414] p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] text-white8">{who}</span>
              <span className="st st-g">activa</span>
            </div>
            <span className="text-[12px] text-grey5">{what}</span>
            <span className="text-[12px] text-grey6">{price}</span>
            <span className="text-[12px] text-white7">{n} encajan</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Tareas() {
  const cols = [
    ["Hoy", [["Visita", "AN"], ["Llamada", "LU"]]],
    ["Esta semana", [["Encargo", "MA"], ["Firma", "NO"]]],
    ["Hechas", [["Visita", "AN"]]],
  ] as const;
  return (
    <section className="mod-screen absolute inset-0 flex flex-col gap-3 p-4 md:p-5" data-screen="tareas" style={{ opacity: 0 }}>
      <Head title="Tareas" hint="El equipo, a la vista" />
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-2">
        {cols.map(([name, cards]) => (
          <div key={name} className="flex flex-col gap-2 rounded-[10px] border border-[#222] bg-[#121212] p-2">
            <span className="px-1 text-[12px] text-grey5">{name}</span>
            {cards.map(([title, who]) => (
              <div key={title + who} className="rounded-[8px] border border-[#2A2A2A] bg-[#181818] p-2">
                <div className="text-[12px] text-white7">{title}</div>
                <span className="mt-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#262626] text-[9px] text-grey6">{who}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Head({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h3 className="m-0 text-[16px] font-medium tracking-[-0.02em] text-white8">{title}</h3>
      <span className="text-[12px] text-grey5">{hint}</span>
    </div>
  );
}
