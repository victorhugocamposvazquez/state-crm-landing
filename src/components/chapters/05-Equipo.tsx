"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { ChapterCopy, CheckList } from "@/components/ui/atoms";
import { countTo } from "@/components/motion/count";

const tasks = [
  { who: "AM", text: "Llamar al propietario · Rianxo", at: "09:30", done: true },
  { who: "OF", text: "Nota simple · Camino Rianxiño 115", at: "10:00", done: false },
  { who: "LR", text: "Visita · Piso en calle de Posse", at: "13:00", done: false, hero: true },
  { who: "AM", text: "Preparar oferta · Familia López", at: "16:30", done: false },
  { who: "MG", text: "Revisar encubiertas de hoy", at: "18:00", done: false },
];

const week = [
  ["09:00", ["on", "", "on", "", ""]],
  ["11:00", ["", "on", "", "on", ""]],
  ["13:00", ["", "", "g", "", "on"]],
  ["16:00", ["on", "", "on", "", ""]],
] as const;

/**
 * 05 · 13:00 · Tareas, calendario y equipo. El badge sube, las tareas entran con avatar,
 * el calendario coloca cada una en su hora y el móvil entra girando con la PWA.
 */
export function Equipo() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q) => {
    tl.fromTo(q(".copy"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.1 }, 0)
      .fromTo(q(".tasks"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.12 }, 0.04)
      .fromTo(q(".task"), { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.06, stagger: 0.03 }, 0.1)
      .fromTo(q(".cal"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.12 }, 0.22)
      .fromTo(q(".slot.on, .slot.g"), { background: "#171717", borderColor: "#1F1F1F" }, { background: "#262626", borderColor: "#3A3A3A", duration: 0.05, stagger: 0.01 }, 0.3)
      .to(q(".slot.g"), { background: "rgba(34,197,94,.22)", borderColor: "#22C55E", duration: 0.05 }, 0.42)
      .fromTo(q(".office-line"), { scaleX: 0 }, { scaleX: 1, duration: 0.08, transformOrigin: "left" }, 0.44)
      .fromTo(q(".phone"), { opacity: 0, y: 160, rotateY: -40 }, { opacity: 1, y: 0, rotateY: -18, duration: 0.14 }, 0.5)
      .to(q(".phone-task .pbox"), { background: "#22C55E", borderColor: "#22C55E", duration: 0.04 }, 0.7)
      .to(q(".phone-task .ptxt"), { color: "#737373", textDecoration: "line-through", duration: 0.04 }, 0.7)
      .to(q(".task-hero .tbox"), { background: "#22C55E", borderColor: "#22C55E", duration: 0.04 }, 0.72)
      .to(q(".task-hero .ttxt"), { color: "#737373", duration: 0.04 }, 0.72)
      // modo claro un instante
      .to(q(".phone-screen"), { background: "#F3F3F3", color: "#111", duration: 0.04 }, 0.8)
      .to(q(".phone-screen"), { background: "#0F0F0F", color: "#E5E5E5", duration: 0.04 }, 0.86)
      .to(q(".copy, .tasks, .cal, .phone, .office-line"), { opacity: 0, y: -30, duration: 0.08 }, 0.93);
    countTo(tl, q(".badge")[0], { from: 5, to: 8, at: 0.1, dur: 0.16 });
  });

  return (
    <Chapter id="equipo">
      <div ref={ref} className="relative h-full gutter">
        <div className="halo" style={{ left: "25%", top: "5%", width: 1000, height: 760 }} />

        <div className="copy absolute left-[var(--gutter)] top-[104px] z-10 w-[calc(100%-2*var(--gutter))] md:top-[110px] md:w-[420px]">
          <ChapterCopy module="Tareas · Calendario" what="el trabajo del equipo, repartido y a la vista" title={<>13:00.<br />Llamar, visitar, firmar.</>} grey="Sin una sola reunión." body="Cada comercial ve lo suyo; cada responsable ve al equipo. Dos oficinas o diez, un solo calendario, y el móvil del comercial sin instalar nada." />
          <div className="mt-6 hidden md:block">
            <CheckList items={["Tareas personales y del equipo, con prioridad", "Calendario compartido: visitas, firmas, llamadas", "Varias oficinas sincronizadas", "PWA móvil, búsqueda global ⌘K, modo claro y oscuro"]} />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 top-[360px] md:left-[540px] md:top-[100px]" style={{ perspective: 1700, perspectiveOrigin: "20% 40%" }}>
          <div className="relative h-full" style={{ transformStyle: "preserve-3d" }}>
            {/* Tareas */}
            <div className="tasks panel absolute left-[var(--gutter)] right-[var(--gutter)] top-0 flex flex-col gap-3 p-4 md:left-0 md:right-auto md:w-[420px]" style={{ transform: "rotateY(-8deg) rotateX(3deg)", opacity: 0 }}>
              <div className="flex items-center justify-between text-[13px] text-white8">
                <span className="flex items-center gap-2">
                  Tareas <span className="badge mono rounded-full bg-green px-2 py-[1px] text-[11px] text-[#06240F]">5</span>
                </span>
                <span className="mono text-[11px] text-grey5">hoy · equipo</span>
              </div>
              {tasks.map((t) => (
                <div key={t.text} className={`task ${t.hero ? "task-hero" : ""} flex items-center gap-3 border-t border-[#1F1F1F] py-[10px] text-[13px]`} style={t.hero ? { background: "#171717", border: "1px solid #3A3A3A", borderRadius: 8, padding: "10px 12px", margin: "0 -6px" } : undefined}>
                  <span className="tbox flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-[4px] border" style={{ background: t.done ? "#22C55E" : "transparent", borderColor: t.done ? "#22C55E" : "#3A3A3A" }}>
                    {t.done && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#06240F" strokeWidth="4" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  <span className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full text-[10px]" style={{ background: t.hero ? "#fff" : "#262626", color: t.hero ? "#0A0A0A" : "#E5E5E5" }}>
                    {t.who}
                  </span>
                  <span className={`ttxt flex-1 ${t.done ? "text-grey5 line-through" : t.hero ? "text-white8" : "text-white7"}`}>{t.text}</span>
                  <span className={`mono text-[11px] ${t.hero ? "text-green" : "text-grey5"}`}>{t.at}</span>
                </div>
              ))}
            </div>

            {/* Calendario */}
            <div className="cal panel absolute left-[var(--gutter)] right-[var(--gutter)] top-[380px] hidden flex-col gap-3 p-4 sm:flex md:left-[300px] md:right-auto md:top-[330px] md:w-[560px]" style={{ transform: "translateZ(-80px) rotateY(-8deg) rotateX(3deg)", opacity: 0 }}>
              <div className="flex items-center justify-between text-[13px] text-white8">
                <span>Calendario</span>
                <span className="mono relative text-[11px] text-grey5">
                  Oficina Centro <span className="office-line mx-2 inline-block h-px w-10 bg-grey5 align-middle" style={{ transform: "scaleX(0)" }} /> Oficina Norte
                </span>
              </div>
              <div className="mono grid grid-cols-[52px_repeat(5,1fr)] gap-[6px] text-center text-[10px] text-grey5">
                <span />
                {["lun", "mar", "mié", "jue", "vie"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              {week.map(([h, slots]) => (
                <div key={h} className="grid grid-cols-[52px_repeat(5,1fr)] items-center gap-[6px]">
                  <span className="mono text-[10px] text-grey5">{h}</span>
                  {slots.map((s, i) => (
                    <span key={i} className={`slot ${s} h-[22px] rounded-[4px] border`} style={{ background: "#171717", borderColor: "#1F1F1F" }} />
                  ))}
                </div>
              ))}
            </div>

            {/* Móvil con la PWA */}
            <div className="phone absolute right-[var(--gutter)] top-[10px] hidden h-[380px] md:flex w-[190px] flex-col gap-[10px] rounded-[26px] border border-grey4 p-3 md:right-[20px] md:top-[20px] md:h-[400px] md:w-[200px]" style={{ background: "#0F0F0F", transform: "translateZ(60px) rotateY(-18deg) rotateX(4deg)", boxShadow: "0 40px 80px rgba(0,0,0,.7)", opacity: 0 }}>
              <div className="mx-auto h-[6px] w-[60px] rounded-[3px] bg-grey3" />
              <div className="phone-screen flex flex-1 flex-col gap-2 rounded-[14px] p-2 text-[11px]" style={{ background: "#0F0F0F", color: "#E5E5E5" }}>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-medium">Tareas</span>
                  <span className="mono rounded-full bg-green px-[6px] text-[10px] text-[#06240F]">3</span>
                </div>
                <div className="phone-task flex items-center gap-2 rounded-[8px] border border-grey4 bg-black2 p-[10px]">
                  <span className="pbox h-[14px] w-[14px] flex-shrink-0 rounded-[3px] border border-grey4" />
                  <div className="flex flex-col gap-[3px]">
                    <span className="ptxt">Visita · calle de Posse</span>
                    <span className="mono text-[10px] text-green">13:00 · Familia López</span>
                  </div>
                </div>
                {[70, 60].map((w, i) => (
                  <div key={i} className="flex flex-col gap-[6px] rounded-[8px] border border-grey3 p-[10px]" style={{ background: "#141414" }}>
                    <span className="bar" style={{ width: `${w}%` }} />
                    <span className="bar" style={{ width: `${w - 25}%`, height: 5 }} />
                  </div>
                ))}
                <div className="mt-auto flex justify-around border-t border-[#1F1F1F] pt-2">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="h-[14px] w-[14px] rounded-[3px]" style={{ background: i === 0 ? "#fff" : "#262626" }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
