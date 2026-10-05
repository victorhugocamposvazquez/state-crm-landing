"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { ChapterCopy } from "@/components/ui/atoms";
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
 * 05 · 13:00 · Tareas, calendario y equipo.
 * Copy limpio. Visuales apilados dentro del marco, sin 3D que se salga.
 */
export function Equipo() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q) => {
    tl.fromTo(q(".copy"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0)
      .fromTo(q(".tasks"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.12 }, 0.04)
      .fromTo(q(".task"), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.06, stagger: 0.03 }, 0.1)
      .fromTo(q(".cal"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.12 }, 0.22)
      .fromTo(q(".slot.on, .slot.g"), { background: "#171717", borderColor: "#1F1F1F" }, { background: "#262626", borderColor: "#3A3A3A", duration: 0.05, stagger: 0.01 }, 0.3)
      .to(q(".slot.g"), { background: "rgba(34,197,94,.22)", borderColor: "#22C55E", duration: 0.05 }, 0.42)
      .fromTo(q(".phone"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.14 }, 0.5)
      .to(q(".phone-task .pbox"), { background: "#22C55E", borderColor: "#22C55E", duration: 0.04 }, 0.7)
      .to(q(".phone-task .ptxt"), { color: "#737373", textDecoration: "line-through", duration: 0.04 }, 0.7)
      .to(q(".task-hero .tbox"), { background: "#22C55E", borderColor: "#22C55E", duration: 0.04 }, 0.72)
      .to(q(".task-hero .ttxt"), { color: "#737373", duration: 0.04 }, 0.72)
      .to(q(".copy, .visual"), { opacity: 0.45, duration: 0.08 }, 0.93);
    countTo(tl, q(".badge")[0], { from: 5, to: 8, at: 0.1, dur: 0.16 });
  });

  return (
    <Chapter id="equipo">
      <div ref={ref} className="stage-frame gutter">
        <div className="stage-copy copy">
          <ChapterCopy
            module="Equipo"
            what="tareas y calendario"
            title={
              <>
                13:00.
                <br />
                Llamar, visitar, firmar.
              </>
            }
            grey="Sin una sola reunión."
            body="Cada comercial ve lo suyo. El responsable ve al equipo. El móvil, sin instalar nada."
          />
        </div>

        <div className="stage-visual visual grid grid-cols-1 gap-3 overflow-hidden md:grid-cols-[1fr_160px]">
          <div className="flex min-w-0 flex-col gap-3">
            <div className="tasks panel flex flex-col gap-2 p-3" style={{ opacity: 0 }}>
              <div className="flex items-center justify-between text-[13px] text-white8">
                <span className="flex items-center gap-2">
                  Tareas <span className="badge mono rounded-full bg-green px-2 py-[1px] text-[11px] text-[#06240F]">5</span>
                </span>
                <span className="mono text-[11px] text-grey5">hoy · equipo</span>
              </div>
              {tasks.map((t) => (
                <div key={t.text} className={`task ${t.hero ? "task-hero" : ""} flex items-center gap-2 border-t border-[#1F1F1F] py-2 text-[13px]`} style={t.hero ? { background: "#171717", border: "1px solid #3A3A3A", borderRadius: 8, padding: "8px 10px", margin: "0 -2px" } : undefined}>
                  <span className="tbox flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-[4px] border" style={{ background: t.done ? "#22C55E" : "transparent", borderColor: t.done ? "#22C55E" : "#3A3A3A" }}>
                    {t.done && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#06240F" strokeWidth="4" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  <span className="flex h-[24px] w-[24px] flex-shrink-0 items-center justify-center rounded-full text-[10px]" style={{ background: t.hero ? "#fff" : "#262626", color: t.hero ? "#0A0A0A" : "#E5E5E5" }}>
                    {t.who}
                  </span>
                  <span className={`ttxt min-w-0 flex-1 truncate ${t.done ? "text-grey5 line-through" : t.hero ? "text-white8" : "text-white7"}`}>{t.text}</span>
                  <span className={`mono flex-shrink-0 text-[11px] ${t.hero ? "text-green" : "text-grey5"}`}>{t.at}</span>
                </div>
              ))}
            </div>

            <div className="cal panel hidden flex-col gap-2 p-3 sm:flex" style={{ opacity: 0 }}>
              <div className="flex items-center justify-between text-[13px] text-white8">
                <span>Calendario</span>
                <span className="mono text-[11px] text-grey5">Centro · Norte</span>
              </div>
              <div className="mono grid grid-cols-[44px_repeat(5,1fr)] gap-1 text-center text-[10px] text-grey5">
                <span />
                {["lun", "mar", "mié", "jue", "vie"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              {week.map(([h, slots]) => (
                <div key={h} className="grid grid-cols-[44px_repeat(5,1fr)] items-center gap-1">
                  <span className="mono text-[10px] text-grey5">{h}</span>
                  {slots.map((s, i) => (
                    <span key={i} className={`slot ${s} h-[20px] rounded-[4px] border`} style={{ background: "#171717", borderColor: "#1F1F1F" }} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="phone mx-auto hidden h-[320px] w-[148px] flex-col gap-2 rounded-[22px] border border-grey4 p-2.5 md:flex" style={{ background: "#0F0F0F", boxShadow: "0 24px 48px rgba(0,0,0,.5)", opacity: 0 }}>
            <div className="mx-auto h-[5px] w-[48px] rounded-[3px] bg-grey3" />
            <div className="phone-screen flex flex-1 flex-col gap-2 rounded-[12px] p-2 text-[11px]" style={{ background: "#0F0F0F", color: "#E5E5E5" }}>
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-medium">Tareas</span>
                <span className="mono rounded-full bg-green px-[6px] text-[10px] text-[#06240F]">3</span>
              </div>
              <div className="phone-task flex items-center gap-2 rounded-[8px] border border-grey4 bg-black2 p-2">
                <span className="pbox h-[12px] w-[12px] flex-shrink-0 rounded-[3px] border border-grey4" />
                <div className="flex min-w-0 flex-col gap-[2px]">
                  <span className="ptxt truncate">Visita · Posse</span>
                  <span className="mono text-[10px] text-green">13:00</span>
                </div>
              </div>
              {[60, 50].map((w, i) => (
                <div key={i} className="flex flex-col gap-[6px] rounded-[8px] border border-grey3 p-2" style={{ background: "#141414" }}>
                  <span className="bar" style={{ width: `${w}%` }} />
                  <span className="bar" style={{ width: `${w - 20}%`, height: 5 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
