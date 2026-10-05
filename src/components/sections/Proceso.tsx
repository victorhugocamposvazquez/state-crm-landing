"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brand, Kicker, brandify } from "@/components/ui/atoms";

gsap.registerPlugin(ScrollTrigger);

/**
 * El camino de captación, del anuncio a la venta. Es UNO de los caminos: el Catastro va por libre
 * (rastrea fincas por zona cuando hace falta) y se integra después en tareas, seguimiento y equipo.
 */
const steps = [
  { label: "Anuncio", status: "Un particular publica su casa en idealista · 07:41", icon: "home" },
  { label: "Detectado", status: "statecrm lo detecta en el rastreo de la mañana: particular, sin agencia detrás", icon: "radar" },
  { label: "En el CRM", status: "Entra en la bandeja con fotos, precio y teléfono · asignado a Ana", icon: "inbox" },
  { label: "Llamada", status: "Ana llama a las 09:05 y lo pasa a seguimiento", icon: "phone" },
  { label: "Visita", status: "Visita el jueves a las 13:00, en el calendario de Luis", icon: "calendar" },
  { label: "Venta", status: "Encargo firmado · venta cerrada", icon: "check" },
] as const;

const END_STATUS = "Del anuncio a la venta: seis pasos, un solo CRM.";

function Icon({ name }: { name: (typeof steps)[number]["icon"] }) {
  const p = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (name) {
    case "home":
      return (
        <svg {...p}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v10h5v-6h4v6h5V10" />
        </svg>
      );
    case "radar":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 12l6.5-6.5" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...p}>
          <path d="M4 5h16l1 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z" />
          <path d="M3 13h5l2 3h4l2-3h5" />
        </svg>
      );
    case "phone":
      return (
        <svg {...p}>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      );
    case "check":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l3 3 5-6" />
        </svg>
      );
  }
}

/** momento (0–1 del tramo) en que el punto llega al paso k */
const stepAt = (k: number) => 0.08 + k * 0.15;

/**
 * Sección pegada: la pantalla aguanta mientras el scroll recorre los seis pasos. El punto
 * viaja de uno a otro, cada paso se enciende al llegar, el anterior queda hecho y la línea de
 * estado dice qué ha pasado. Frotado por el scroll: subir deshace exactamente lo que bajar hizo.
 */
export function Proceso() {
  const ref = useRef<HTMLElement>(null);
  const win = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = ref.current;
    const el = win.current;
    if (!section || !el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const boxes = q<HTMLElement>(".step-box");
      const labels = q<HTMLElement>(".step-label");
      const dones = q<HTMLElement>(".step-done");
      const statuses = q<HTMLElement>(".status-k");
      const dot = q<HTMLElement>(".dot")[0];
      const statusEnd = q<HTMLElement>(".status-end")[0];
      const n = steps.length;
      const at = (k: number) => `${((k + 0.5) / n) * 100}%`;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.4 },
      });

      steps.forEach((_, k) => {
        const t = stepAt(k);
        if (k === 0) {
          tl.fromTo(dot, { opacity: 0 }, { opacity: 1, duration: 0.03 }, t - 0.03);
        } else {
          // el punto viaja al siguiente paso; el anterior queda hecho y su estado se va
          tl.to(dot, { left: at(k), duration: 0.07 }, t - 0.07)
            .to(boxes[k - 1], { borderColor: "#1F1F1F", color: "#A3A3A3", background: "#0F0F0F", duration: 0.03 }, t - 0.06)
            .to(labels[k - 1], { color: "#A3A3A3", duration: 0.03 }, t - 0.06)
            .fromTo(dones[k - 1], { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.03, ease: "back.out(2)" }, t - 0.06)
            .to(statuses[k - 1], { opacity: 0, y: -6, duration: 0.03 }, t - 0.05);
        }
        // el paso se enciende y cuenta lo suyo
        tl.to(boxes[k], { borderColor: "#FFFFFF", color: "#FFFFFF", background: "#161616", duration: 0.03 }, t)
          .to(labels[k], { color: "#FFFFFF", duration: 0.03 }, t)
          .fromTo(statuses[k], { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.04 }, t);
      });

      // cierre: el último también queda hecho, en verde, y el estado resume
      const end = stepAt(n - 1) + 0.1;
      tl.to(boxes[n - 1], { borderColor: "#22C55E", color: "#22C55E", duration: 0.03 }, end)
        .to(labels[n - 1], { color: "#22C55E", duration: 0.03 }, end)
        .fromTo(dones[n - 1], { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.03, ease: "back.out(2)" }, end)
        .to(statuses[n - 1], { opacity: 0, y: -6, duration: 0.03 }, end)
        .fromTo(statusEnd, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.04 }, end + 0.01)
        // ya resuelto, aguanta un tramo antes de que la pantalla se despegue
        .to({}, { duration: 1 - (end + 0.05) }, end + 0.05);

      if (reduced) {
        tl.progress(1).pause();
        tl.scrollTrigger?.kill();
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="proceso" className="proceso relative z-[2] border-t border-[#171717] bg-black0" aria-labelledby="proceso-h">
      <div className="pin flex items-center gutter">
        <div className="mx-auto flex w-full max-w-[880px] flex-col items-center py-[64px] md:py-[80px]">
          <div className="mb-10 flex max-w-[820px] flex-col items-center text-center md:mb-14">
            <div className="mb-6">
              <Kicker module="Cómo funciona" what="la captación, del anuncio a la venta" />
            </div>
            <h2 id="proceso-h" className="t-h1 m-0 text-white8">
              <span className="text-grey5">
                <Brand wordmark /> detecta, captura y asigna.
              </span>
              <br />
              Tu equipo llama, enseña y cierra.
            </h2>
          </div>

          {/* la ventana del CRM */}
          <div ref={win} className="panel w-full overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#1F1F1F] px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="flex gap-[6px]">
                  <span className="h-[9px] w-[9px] rounded-full bg-grey4" />
                  <span className="h-[9px] w-[9px] rounded-full bg-grey4" />
                  <span className="h-[9px] w-[9px] rounded-full bg-grey4" />
                </span>
                <span className="mono text-[12px] text-grey6">Captación · Casa en Camino Rianxiño, 115</span>
              </div>
              <span className="st st-g">
                <span className="h-[6px] w-[6px] rounded-full bg-green" />
                en marcha
              </span>
            </div>

            <div className="px-5 pb-6 pt-8 md:px-8 md:pb-8 md:pt-10">
              <div className="relative">
                {/* la línea y el punto que la recorre (en móvil los pasos van en dos filas, sin línea) */}
                <div className="absolute top-[28px] hidden h-px bg-[#262626] md:block" style={{ left: `${(0.5 / steps.length) * 100}%`, right: `${(0.5 / steps.length) * 100}%` }} aria-hidden="true" />
                <span className="dot absolute top-[28px] hidden h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white8 md:block" style={{ left: `${(0.5 / steps.length) * 100}%`, boxShadow: "0 0 12px 2px rgba(255,255,255,.5)", opacity: 0 }} aria-hidden="true" />

                <ol className="relative m-0 grid list-none grid-cols-3 gap-y-6 p-0 md:grid-cols-6">
                  {steps.map((s) => (
                    <li key={s.label} className="flex flex-col items-center gap-3">
                      <span className="step-box relative flex h-14 w-14 items-center justify-center rounded-[12px] border border-[#222222] bg-black1 text-grey5">
                        <Icon name={s.icon} />
                        <span className="step-done absolute -right-[6px] -top-[6px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-green" style={{ opacity: 0 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#06240F" strokeWidth="3.5" aria-hidden="true">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </span>
                      </span>
                      <span className="step-label text-[13px] font-medium text-grey5 md:text-[14px]">{s.label}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* la línea de estado: todos los textos apilados, se enciende el que toca */}
              <div className="status mt-8 flex items-center gap-3 border-t border-[#1F1F1F] pt-5 text-[14px] text-white7 md:text-[15px]" aria-live="polite">
                <span className="chk">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="relative block h-[44px] flex-1 md:h-[24px]">
                  {steps.map((s) => (
                    <span key={s.label} className="status-k absolute inset-x-0 top-0 block" style={{ opacity: 0 }}>
                      {brandify(s.status)}
                    </span>
                  ))}
                  <span className="status-end absolute inset-x-0 top-0 block" style={{ opacity: 0 }}>
                    {END_STATUS}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* los caminos: la captación es uno; el Catastro va por libre */}
          <div className="mt-8 grid w-full grid-cols-1 gap-5 md:mt-10 md:grid-cols-2 md:gap-12">
            <p className="t-body m-0 text-grey6">
              <span className="text-white7">Captación.</span> Cada paso lo da el CRM solo y avisa al comercial cuando le toca actuar: teléfono capturado, llamada, visita, venta.
            </p>
            <p className="t-body m-0 text-grey6">
              <span className="text-white7">Catastro, por libre.</span> Localiza fincas por calle o código postal cuando hace falta, y lo que encuentra alimenta tareas, seguimiento y equipo comercial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
