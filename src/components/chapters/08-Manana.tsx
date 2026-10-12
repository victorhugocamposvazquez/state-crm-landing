"use client";

import { useRef, useState } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { Brand } from "@/components/ui/atoms";
import { Logo } from "@/components/shell/Logo";

/**
 * 08 · Demo. El cierre: el logotipo, la petición y el formulario, en el alto real de la sección.
 * La web es un bucle: `volver a las 07:00 ↑` rebobina al principio.
 */
export function Manana() {
  const ref = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  useScrollTimeline(ref, (_tl, q, enter) => {
    enter.fromTo(q(".h"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .fromTo(q(".form"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.15);
  });

  return (
    <Chapter id="manana">
      <div ref={ref} className="stagewrap">
        <div className="stageframe flex flex-col items-center pb-12 pt-[var(--copy-top)]">
        <div className="halo" style={{ left: "50%", top: "18%", width: 900, height: 700, transform: "translate(-50%,-50%)" }} />

        <div className="h flex w-full max-w-[640px] flex-col items-center gap-4 text-center" style={{ opacity: 0 }}>
          <Logo className="text-[36px] md:text-[44px]" />
          <span className="mono mt-6 text-[13px] text-grey5">08</span>
          <h2 className="t-chapter m-0 text-white8">Pide una demo</h2>
          <p className="t-chapter-lead m-0 text-grey6">
            Treinta minutos con tu zona: los anuncios de particulares de esta mañana y las fincas de una de tus calles. Te enseñamos <Brand /> y, si encaja, seguimos.
          </p>
        </div>

        <div className="mt-10 w-full max-w-[560px]">
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

        <footer className="mono mt-16 flex w-full flex-wrap items-center justify-between gap-3 border-t border-[#171717] py-6 text-[11px] text-grey4">
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
