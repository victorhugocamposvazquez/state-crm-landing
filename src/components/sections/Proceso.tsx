"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brand } from "@/components/ui/atoms";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cómo funciona: el recorrido de una operación de ejemplo, atado al scroll.
 * Al parar el scroll se para; al subir, retrocede. Sin tiempos ni botones.
 * No comparte progreso con los beneficios del hero.
 */
const steps = [
  { n: "01", label: "Anuncio capturado", hint: "Una oportunidad en tu CRM." },
  { n: "02", label: "Contacto y encargo", hint: "Tu equipo inicia la relación." },
  { n: "03", label: "Visita concertada", hint: "Cada cita, organizada." },
  { n: "04", label: "Venta cerrada", hint: "Todo el recorrido conectado." },
] as const;

const notes = [
  "Nuevo anuncio de particular incorporado al CRM.",
  "Tu equipo contacta con el propietario y registra el encargo.",
  "La visita queda organizada en la agenda del equipo.",
  "Venta cerrada. Conserva los contactos y el historial de la operación.",
];

export function Proceso() {
  const ref = useRef<HTMLElement>(null);
  const flow = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = ref.current;
    const root = flow.current;
    if (!section || !root) return;
    const stages = [...root.querySelectorAll<HTMLElement>(".flow-stage")];
    const nodes = stages.map((s) => s.querySelector<HTMLElement>(".flow-node"));
    const detail = root.querySelector<HTMLElement>(".flow-detail");
    const badge = root.querySelector<HTMLElement>(".flow-badge");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current = -1;

    const apply = (p: number) => {
      const scaled = Math.max(0, Math.min(3.999, p * 3.999));
      stages.forEach((el, i) => {
        el.style.setProperty("--fill", String(Math.max(0, Math.min(1, scaled - i))));
      });
      const n = Math.min(3, Math.floor(scaled));
      if (n === current) return;
      current = n;
      stages.forEach((el, i) => {
        el.classList.toggle("is-active", i === n);
        el.classList.toggle("is-done", i < n);
        const node = nodes[i];
        if (node) node.textContent = i < n || (i === 3 && n === 3) ? "✓" : steps[i].n;
        if (i === n) el.setAttribute("aria-current", "step");
        else el.removeAttribute("aria-current");
      });
      if (detail) detail.textContent = notes[n];
      if (badge) badge.textContent = n === 3 ? "Venta cerrada" : "En seguimiento";
    };

    const showEnd = () => {
      current = -1;
      apply(1);
    };
    if (motion.matches) {
      showEnd();
      const onMotion = () => {
        if (motion.matches) showEnd();
      };
      motion.addEventListener("change", onMotion);
      return () => motion.removeEventListener("change", onMotion);
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => apply(self.progress),
    });
    apply(st.progress);
    let stopped = false;
    const onMotion = () => {
      if (!motion.matches || stopped) return;
      stopped = true;
      st.kill();
      showEnd();
    };
    motion.addEventListener("change", onMotion);

    return () => {
      motion.removeEventListener("change", onMotion);
      if (!stopped) st.kill();
    };
  }, []);

  return (
    <section ref={ref} id="proceso" className="proceso relative z-[2] border-t border-[#171717] bg-black0" aria-labelledby="proceso-h">
      <div className="pin flex items-center gutter pt-[80px]">
        <div className="mx-auto flex w-full max-w-[960px] flex-col items-center py-4 md:py-6">
          <div className="mb-5 flex max-w-[820px] flex-col items-center text-center md:mb-6">
            <h2 id="proceso-h" className="t-h1 m-0 text-white8">
              <span className="text-grey5">
                <Brand wordmark /> detecta, captura y asigna.
              </span>
              <br />
              Tu equipo llama, enseña y cierra.
            </h2>
          </div>

          <div ref={flow} className="flow w-full">
            <div className="flow-bar">
              <div className="flow-property">
                Piso en Calle del Pez, 18 · Madrid
                <small>Ejemplo de operación · Particular</small>
              </div>
              <span className="flow-badge">En seguimiento</span>
            </div>
            <div className="flow-journey" aria-label="Etapas de la operación">
              {steps.map((s, i) => (
                <div key={s.label} className={`flow-stage${i === 0 ? " is-active" : ""}`} aria-current={i === 0 ? "step" : undefined}>
                  <span className="flow-node">{s.n}</span>
                  <strong>{s.label}</strong>
                  <small>{s.hint}</small>
                </div>
              ))}
            </div>
            <div className="flow-foot">
              <span className="flow-mark" aria-hidden="true">↳</span>
              <p className="flow-detail">{notes[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
