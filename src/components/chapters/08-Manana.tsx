"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { Kicker } from "@/components/ui/atoms";

/**
 * 08 · 07:00 · Mañana. El anillo del logo, un punto nuevo, la pregunta, el formulario y los precios.
 * La web es un bucle: `volver a las 07:00 ↑` rebobina al principio.
 */
export function Manana() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q) => {
    tl.fromTo(q(".ring"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.15 }, 0)
      .fromTo(q(".newdot"), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.08, ease: "back.out(3)" }, 0.18)
      .fromTo(q(".toast"), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.08 }, 0.22)
      .fromTo(q(".h"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.14 }, 0.1)
      .fromTo(q(".form, .prices"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.14, stagger: 0.05 }, 0.3);
  });

  return (
    <Chapter id="manana">
      <div ref={ref} className="relative flex h-full flex-col gutter">
        <div className="halo" style={{ left: "50%", top: "30%", width: 900, height: 700, transform: "translate(-50%,-50%)" }} />

        <div className="relative mx-auto mt-[90px] flex flex-col items-center md:mt-[100px]">
          <div className="ring relative" style={{ opacity: 0 }}>
            <svg width="120" height="120" viewBox="0 0 220 220" fill="none" aria-hidden="true">
              <circle cx="110" cy="110" r="84" stroke="#6E6E6E" strokeWidth="28" />
              <path d="M110 26a84 84 0 0 1 84 84" stroke="#fff" strokeWidth="28" />
            </svg>
            <span className="newdot absolute h-2 w-2 rounded-full bg-green" style={{ left: 98, top: 30, boxShadow: "0 0 14px 4px rgba(34,197,94,.6)", opacity: 0 }} />
          </div>
          <div className="toast card mono absolute left-[calc(50%+70px)] top-[8px] hidden items-center gap-[10px] px-[14px] py-[10px] text-[12px] text-grey6 md:flex" style={{ opacity: 0 }}>
            <span className="h-[6px] w-[6px] rounded-full bg-white8" style={{ boxShadow: "0 0 10px #fff" }} />
            Nuevo anuncio de particular · 07:40
          </div>
        </div>

        <div className="h mt-8 flex flex-col items-center gap-4 text-center" style={{ opacity: 0 }}>
          <Kicker module="Demo" what="30 minutos con tu zona y un anuncio real" />
          <h2 className="display m-0 max-w-[900px] text-[30px] text-white8 md:text-[46px]">
            Mañana, a las 7:40, alguien volverá a publicar.
            <br />
            <span className="text-grey5">¿Quién lo captará?</span>
          </h2>
          <p className="mono m-0 text-[12px] text-grey5 md:text-[13px]">statecrm · una demo de 30 minutos con tu zona y un anuncio real cruzado con catastro</p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 md:mt-14 md:grid-cols-[460px_1fr] md:gap-10">
          <form className="form grid grid-cols-1 gap-[10px] sm:grid-cols-2" action="#" method="post" style={{ opacity: 0 }} onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="nombre" className="text-[12px] text-grey6 sm:col-span-2">
              Nombre y agencia
            </label>
            <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" className="min-h-[46px] rounded-[8px] border border-grey3 bg-black1 px-[14px] text-[14px] text-white7 placeholder:text-grey5" />
            <input id="agencia" name="agencia" type="text" placeholder="Agencia y ciudad" aria-label="Agencia y ciudad" className="min-h-[46px] rounded-[8px] border border-grey3 bg-black1 px-[14px] text-[14px] text-white7 placeholder:text-grey5" />
            <label htmlFor="email" className="text-[12px] text-grey6 sm:col-span-2">
              Email
            </label>
            <input id="email" name="email" type="email" placeholder="tu@agencia.es" className="min-h-[46px] rounded-[8px] border border-grey3 bg-black1 px-[14px] text-[14px] text-white7 placeholder:text-grey5 sm:col-span-2" />
            <button type="submit" className="btn btn-w sm:col-span-2">
              Reservar demo
            </button>
            <span className="mono text-[11px] text-grey5 sm:col-span-2">sin compromiso · respondemos en el día</span>
          </form>

          <div className="prices flex gap-3 overflow-x-auto pb-2 md:overflow-visible" style={{ opacity: 0 }}>
            {[
              ["Implantación", "[PRECIO]", "Módulos, migración de tu cartera y formación.", false],
              ["Por oficina / mes", "[PRECIO]", "Usuarios ilimitados, captación diaria, soporte directo.", true],
              ["Módulos premium", "[PRECIO]", "Catastro con nota simple, encubiertas, obra y facturación.", false],
            ].map(([l, n, d, hi]) => (
              <div key={l as string} className="flex min-w-[220px] flex-1 flex-col gap-2 rounded-[12px] border bg-black1 p-5" style={{ borderColor: hi ? "#3A3A3A" : "#262626" }}>
                <span className={`text-[11px] uppercase tracking-[0.08em] ${hi ? "text-green" : "text-grey5"}`}>{l as string}</span>
                <span className="text-[26px] font-medium tracking-[-0.02em] text-white8">{n as string}</span>
                <span className="text-[13px] leading-[1.5] text-grey6">{d as string}</span>
              </div>
            ))}
          </div>
        </div>

        <footer className="mono mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-[#171717] py-5 text-[11px] text-grey4">
          <span className="text-grey5">
            state<span className="text-grey4">crm</span>
          </span>
          <span>CRM inmobiliario a medida · España</span>
          <span className="flex gap-4">
            <a href="#" className="text-grey4 no-underline hover:text-grey6">
              privacidad
            </a>
            <a href="#" className="text-grey4 no-underline hover:text-grey6">
              aviso legal
            </a>
            <a href="#prologo" className="text-grey5 no-underline hover:text-white7">
              volver a las 07:00 ↑
            </a>
          </span>
        </footer>
      </div>
    </Chapter>
  );
}
