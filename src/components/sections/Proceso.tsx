"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Kicker } from "@/components/ui/atoms";
import { useReveal } from "@/components/motion/reveal";

gsap.registerPlugin(ScrollTrigger);

/** Los seis pasos de un piso dentro de statecrm, del anuncio a la reserva. */
const steps = [
  { label: "Anuncio", status: "Anuncio de particular detectado en idealista · 07:41", icon: "radar" },
  { label: "Teléfono", status: "Teléfono capturado y anuncio asignado a Ana", icon: "phone" },
  { label: "Catastro", status: "Finca vinculada: referencia catastral y nota simple pedida", icon: "grid" },
  { label: "Demanda", status: "Coincide con la demanda de la familia López", icon: "match" },
  { label: "Visita", status: "Visita el jueves a las 13:00, en el calendario de Luis", icon: "calendar" },
  { label: "Reserva", status: "Reserva firmada · operación cerrada", icon: "check" },
] as const;

const END_STATUS = "Del anuncio a la reserva: seis pasos, un solo CRM.";

function Icon({ name }: { name: (typeof steps)[number]["icon"] }) {
  const p = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (name) {
    case "radar":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 12l6.5-6.5" />
        </svg>
      );
    case "phone":
      return (
        <svg {...p}>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "grid":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 10h18M3 16h18M10 3v18M16 3v18" />
        </svg>
      );
    case "match":
      return (
        <svg {...p}>
          <path d="M4 7h11l-3-3M20 17H9l3 3" />
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

/**
 * El proceso completo, centrado, en una ventana del CRM: el punto recorre los seis pasos,
 * cada paso se enciende al llegar, el anterior queda hecho y la línea de estado cuenta qué ha pasado.
 * Va en bucle mientras la sección está en pantalla. Debajo, el texto grande que lo resume.
 */
export function Proceso() {
  const ref = useRef<HTMLElement>(null);
  const win = useRef<HTMLDivElement>(null);
  useReveal(ref);

  useLayoutEffect(() => {
    const el = win.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const boxes = q<HTMLElement>(".step-box");
      const labels = q<HTMLElement>(".step-label");
      const dones = q<HTMLElement>(".step-done");
      const dot = q<HTMLElement>(".dot")[0];
      const status = q<HTMLElement>(".status")[0];
      const statusText = q<HTMLElement>(".status-text")[0];
      const n = steps.length;
      const at = (k: number) => `${((k + 0.5) / n) * 100}%`;

      const setStatus = (text: string) => {
        if (statusText) statusText.textContent = text;
      };

      if (reduced) {
        gsap.set(boxes, { borderColor: "#3A3A3A", color: "#E5E5E5" });
        gsap.set(dones, { opacity: 1, scale: 1 });
        gsap.set(labels, { color: "#E5E5E5" });
        gsap.set(dot, { left: at(n - 1), opacity: 1 });
        setStatus(END_STATUS);
        return;
      }

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true, defaults: { ease: "power2.inOut" } });

      // estado inicial de cada vuelta
      tl.set(boxes, { borderColor: "#222222", color: "#6E6E6E", background: "#0F0F0F" })
        .set(labels, { color: "#6E6E6E" })
        .set(dones, { opacity: 0, scale: 0.6 })
        .set(dot, { left: at(0), opacity: 0 })
        .set(status, { opacity: 0 })
        .call(() => setStatus(steps[0].status));

      steps.forEach((s, k) => {
        const pos = k * 2.1;
        if (k > 0) {
          // el punto viaja al siguiente paso; el anterior queda hecho
          tl.to(dot, { left: at(k), duration: 0.6, ease: "power2.inOut" }, pos)
            .to(boxes[k - 1], { borderColor: "#1F1F1F", color: "#A3A3A3", background: "#0F0F0F", duration: 0.3 }, pos)
            .to(dones[k - 1], { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, pos + 0.1)
            .to(status, { opacity: 0, duration: 0.2 }, pos)
            .call(() => setStatus(s.status), [], pos + 0.45);
        } else {
          tl.to(dot, { opacity: 1, duration: 0.3 }, pos);
        }
        // el paso se enciende
        tl.to(boxes[k], { borderColor: "#FFFFFF", color: "#FFFFFF", background: "#161616", duration: 0.3 }, pos + 0.5)
          .to(labels[k], { color: "#FFFFFF", duration: 0.3 }, pos + 0.5)
          .to(status, { opacity: 1, duration: 0.3 }, pos + 0.5);
      });

      // cierre: el último también queda hecho y el estado resume
      const end = n * 2.1;
      tl.to(boxes[n - 1], { borderColor: "#22C55E", color: "#22C55E", duration: 0.3 }, end)
        .to(dones[n - 1], { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, end + 0.1)
        .to(status, { opacity: 0, duration: 0.2 }, end)
        .call(() => setStatus(END_STATUS), [], end + 0.3)
        .to(status, { opacity: 1, duration: 0.3 }, end + 0.3)
        .to({}, { duration: 1.6 }, end + 0.6);

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "bottom 15%",
        onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="proceso" className="relative z-[2] border-t border-[#171717] bg-black0 py-[64px] gutter md:py-[112px]" aria-labelledby="proceso-h">
      <div className="mx-auto flex max-w-[900px] flex-col items-center">
        <div data-reveal className="mb-8">
          <Kicker module="Cómo funciona" what="un piso, de la captación a la venta" />
        </div>

        {/* la ventana del CRM */}
        <div ref={win} data-reveal className="panel w-full overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#1F1F1F] px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="flex gap-[6px]">
                <span className="h-[9px] w-[9px] rounded-full bg-grey4" />
                <span className="h-[9px] w-[9px] rounded-full bg-grey4" />
                <span className="h-[9px] w-[9px] rounded-full bg-grey4" />
              </span>
              <span className="mono text-[12px] text-grey6">Proceso automático · piso en Plaza de Castilla</span>
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
              <span className="dot absolute top-[28px] hidden h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white8 md:block" style={{ left: "8.33%", boxShadow: "0 0 12px 2px rgba(255,255,255,.5)", opacity: 0 }} aria-hidden="true" />

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

            <div className="status mt-8 flex items-center gap-3 border-t border-[#1F1F1F] pt-5 text-[14px] text-white7 md:text-[15px]" aria-live="polite">
              <span className="chk">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span className="status-text">{steps[0].status}</span>
            </div>
          </div>
        </div>

        {/* el texto grande debajo */}
        <div className="mt-12 max-w-[820px] text-center md:mt-16">
          <h2 id="proceso-h" data-reveal className="display m-0 text-[28px] text-white8 md:text-[44px]">
            Del anuncio del particular a la reserva,{" "}
            <span className="hl">sin salir del CRM</span>.
          </h2>
          <p data-reveal className="mx-auto mt-6 max-w-[640px] text-[16px] leading-[1.6] text-grey6 md:text-[18px]">
            statecrm detecta el anuncio, captura el teléfono, vincula la finca, cruza la demanda y pone la visita en el calendario. Tu equipo llama, enseña y cierra.
          </p>
        </div>
      </div>
    </section>
  );
}
