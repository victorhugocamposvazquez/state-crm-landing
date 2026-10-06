"use client";

import { useRef, useState } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { Brand, Kicker } from "@/components/ui/atoms";

/**
 * 08 · 07:00 · Mañana. El anillo del logo, un punto nuevo, la pregunta, el formulario y los precios.
 * La web es un bucle: `volver a las 07:00 ↑` rebobina al principio.
 */
export function Manana() {
  const ref = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  useScrollTimeline(ref, (tl, q, enter) => {
    // entrada: el anillo y el titular suben ya puestos con la pantalla
    enter.fromTo(q(".ring"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.9 }, 0)
      .fromTo(q(".h"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0.2);

    tl.fromTo(q(".newdot"), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.08, ease: "back.out(3)" }, 0.18)
      .fromTo(q(".toast"), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.08 }, 0.22)
      .fromTo(q(".form"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.14 }, 0.3);
  });

  return (
    <Chapter id="manana">
      <div ref={ref} className="stagewrap">
        <div className="stageframe flex flex-col">
        <div className="halo" style={{ left: "50%", top: "30%", width: 900, height: 700, transform: "translate(-50%,-50%)" }} />

        <div className="relative mx-auto mt-[var(--copy-top)] flex flex-col items-center">
          <div className="ring relative" style={{ opacity: 0 }}>
            <svg width="88" height="88" viewBox="0 0 220 220" fill="none" aria-hidden="true" className="md:h-[120px] md:w-[120px]">
              <circle cx="110" cy="110" r="84" stroke="#6E6E6E" strokeWidth="28" />
              <path d="M110 26a84 84 0 0 1 84 84" stroke="#fff" strokeWidth="28" />
            </svg>
            <span className="newdot absolute left-[64px] top-[18px] h-2 w-2 rounded-full bg-green md:left-[98px] md:top-[30px]" style={{ boxShadow: "0 0 14px 4px rgba(34,197,94,.6)", opacity: 0 }} />
          </div>
          <div className="toast card mono absolute left-[calc(50%+70px)] top-[8px] hidden items-center gap-[10px] px-[14px] py-[10px] text-[12px] text-grey6 md:flex" style={{ opacity: 0 }}>
            <span className="h-2 w-2 rounded-full bg-green" style={{ boxShadow: "0 0 10px #22C55E" }} />
            Nuevo anuncio de particular · 07:40
          </div>
        </div>

        <div className="h mt-5 flex flex-col items-center gap-4 text-center md:mt-8 md:gap-5" style={{ opacity: 0 }}>
          <Kicker n="08" module="Demo" what="30 minutos, con tu zona y anuncios reales" />
          <h2 className="t-h1 m-0 max-w-[820px] text-white8">
            Mañana alguien volverá a publicar.
            <br />
            <span className="text-grey5">¿Quién lo captará?</span>
          </h2>
          <p className="t-lead m-0 hidden max-w-[560px] text-grey6 sm:block">
            Te enseñamos <Brand /> con tu zona: los anuncios de particulares de esta mañana y todas las fincas de una de tus calles en el Catastro.
          </p>
        </div>

        <div className="mx-auto mt-6 w-full max-w-[560px] md:mt-14">
          <form className="form grid grid-cols-1 gap-[10px] sm:grid-cols-2" action="#" method="post" style={{ opacity: 0 }} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            {sent ? (
              <p className="t-body col-span-full m-0 text-white8" role="status">
                Recibido. Te escribimos hoy para concretar la demo.
              </p>
            ) : (
              <>
                <label htmlFor="nombre" className="t-small text-grey6 sm:col-span-2">
                  Nombre y agencia
                </label>
                <input id="nombre" name="nombre" type="text" required placeholder="Tu nombre" className="min-h-[46px] rounded-[8px] border border-grey3 bg-black1 px-[14px] text-[14px] text-white7 placeholder:text-grey5" />
                <input id="agencia" name="agencia" type="text" required placeholder="Agencia y ciudad" aria-label="Agencia y ciudad" className="min-h-[46px] rounded-[8px] border border-grey3 bg-black1 px-[14px] text-[14px] text-white7 placeholder:text-grey5" />
                <label htmlFor="email" className="t-small text-grey6 sm:col-span-2">
                  Email
                </label>
                <input id="email" name="email" type="email" required placeholder="tu@agencia.es" className="min-h-[46px] rounded-[8px] border border-grey3 bg-black1 px-[14px] text-[14px] text-white7 placeholder:text-grey5 sm:col-span-2" />
                <button type="submit" className="btn btn-w sm:col-span-2">
                  Reservar demo
                </button>
                <span className="mono text-[13px] text-grey6 sm:col-span-2">sin compromiso · respondemos en el día</span>
              </>
            )}
          </form>
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
      </div>
    </Chapter>
  );
}
