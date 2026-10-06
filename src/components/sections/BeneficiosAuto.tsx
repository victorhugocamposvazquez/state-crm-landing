"use client";

import { useEffect, useRef } from "react";

/**
 * Hero bajo «Impulsa tu negocio inmobiliario».
 * Tres superficies, sin hilo: se encienden solas (1,3 s · 1,3 s · 2,2 s) y vuelven a empezar.
 * No comparte progreso con el recorrido de Cómo funciona.
 */
const STEPS = [
  { label: "Más captación", icon: "radar" },
  { label: "más oportunidades", icon: "layers" },
  { label: "Más ventas", icon: "up" },
] as const;

export function BeneficiosAuto() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const steps = [...el.querySelectorAll<HTMLElement>(".b-step")];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer = 0;
    let index = 0;
    let visible = false;

    const paint = () => {
      steps.forEach((s, i) => s.classList.toggle("is-on", i === index));
    };
    const stop = () => window.clearTimeout(timer);
    const schedule = () => {
      stop();
      if (motion.matches) {
        index = 2;
        paint();
        return;
      }
      if (!visible || document.hidden) return;
      const wait = index === 2 ? 2200 : 1300;
      timer = window.setTimeout(() => {
        index = (index + 1) % 3;
        paint();
        schedule();
      }, wait);
    };

    paint();
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        schedule();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    const onHide = () => schedule();
    document.addEventListener("visibilitychange", onHide);
    motion.addEventListener("change", onHide);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onHide);
      motion.removeEventListener("change", onHide);
    };
  }, []);

  return (
    <div ref={root} className="benefits mt-7" aria-label="Más captación, más oportunidades, Más ventas">
      <div className="benefits-row">
        {STEPS.map((s) => (
          <div key={s.label} className={`b-step${s.icon === "up" ? " b-sale" : ""}${s.icon === "radar" ? " is-on" : ""}`}>
            <span className="b-ico" aria-hidden="true">
              <StepIcon name={s.icon} />
            </span>
            {s.icon === "up" && (
              <span className="b-tick" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            )}
            <span className="b-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepIcon({ name }: { name: (typeof STEPS)[number]["icon"] }) {
  const p = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "radar") {
    return (
      <svg {...p}>
        <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
        <path d="M4 6h.01" />
        <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
        <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
        <path d="M12 18h.01" />
        <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
        <circle cx="12" cy="12" r="2" />
        <path d="m13.41 10.59 5.66-5.66" />
      </svg>
    );
  }
  if (name === "layers") {
    return (
      <svg {...p}>
        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
        <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
        <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
      </svg>
    );
  }
  return (
    <svg {...p}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
