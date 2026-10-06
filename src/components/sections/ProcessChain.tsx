"use client";

/**
 * Cadena animada: captación → oportunidades → ventas.
 * Una sola pasada al entrar en pantalla. Horizontal en escritorio, vertical en móvil.
 * Un clic en un paso corta la secuencia y deja ese paso activo.
 */

import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./ProcessChain.module.css";

export type ProcessStep = {
  id: string;
  label: string;
  icon: "target" | "layers" | "check";
  accent?: "green";
};

const STEPS: ProcessStep[] = [
  { id: "captacion", label: "Más captación", icon: "target" },
  { id: "oportunidades", label: "más oportunidades", icon: "layers" },
  { id: "ventas", label: "Más ventas", icon: "check", accent: "green" },
];

export function ProcessChain({ className }: { className?: string }) {
  const stepMs = 1600;
  const travelMs = 600;
  const [active, setActive] = useState(0);
  const [traveling, setTraveling] = useState(false);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (started) return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || done) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      timer.current = window.setTimeout(() => {
        setActive(STEPS.length - 1);
        setDone(true);
      }, 0);
      return () => window.clearTimeout(timer.current);
    }

    let i = 0;
    const next = () => {
      if (i >= STEPS.length - 1) {
        setDone(true);
        return;
      }
      timer.current = window.setTimeout(() => {
        setTraveling(true);
        timer.current = window.setTimeout(() => {
          i += 1;
          setTraveling(false);
          setActive(i);
          next();
        }, travelMs);
      }, stepMs);
    };
    next();

    return () => window.clearTimeout(timer.current);
  }, [started, done]);

  const select = (i: number) => {
    window.clearTimeout(timer.current);
    setDone(true);
    setTraveling(false);
    setActive(i);
  };

  const rootStyle = {
    "--step-ms": `${stepMs}ms`,
    "--travel-ms": `${travelMs}ms`,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Más captación, más oportunidades, Más ventas"
      className={[styles.chain, className].filter(Boolean).join(" ")}
      style={rootStyle}
    >
      {STEPS.map((step, i) => {
        const isActive = i === active;
        const isLast = i === STEPS.length - 1;
        const filled = i < active || (traveling && i === active);

        return (
          <Fragment key={step.id}>
            <button
              type="button"
              className={styles.station}
              data-active={isActive}
              data-accent={step.accent}
              aria-pressed={isActive}
              onClick={() => select(i)}
            >
              <span className={styles.node}>
                <svg
                  className={[styles.gear, i % 2 ? styles.gearCcw : ""].join(" ")}
                  viewBox="0 0 36 36"
                  aria-hidden="true"
                >
                  <circle
                    className={styles.teeth}
                    cx="18"
                    cy="18"
                    r="16.5"
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray="1.4 2.9"
                  />
                </svg>

                <svg viewBox="0 0 36 36" aria-hidden="true">
                  <circle cx="18" cy="18" r="14.5" className={styles.disc} />
                  <circle className={styles.ring} cx="18" cy="18" r="13" fill="none" strokeWidth="1.25" />
                  <g
                    className={styles.icon}
                    fill="none"
                    strokeWidth={step.icon === "check" ? 2 : 1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(10 10) scale(0.6667)"
                  >
                    <Icon name={step.icon} />
                  </g>
                </svg>

                {isActive && (
                  <svg viewBox="0 0 36 36" aria-hidden="true" style={{ transform: "rotate(-90deg)" }}>
                    <circle
                      className={[styles.charge, isLast || done ? styles.chargeClose : ""].join(" ")}
                      cx="18"
                      cy="18"
                      r="13"
                      fill="none"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeDasharray="81.7"
                      strokeDashoffset="81.7"
                    />
                  </svg>
                )}
              </span>
              <span className={styles.label}>{step.label}</span>
            </button>

            {!isLast && (
              <div className={styles.seg} aria-hidden="true">
                <div className={styles.fill} style={{ "--p": filled ? 1 : 0 } as CSSProperties} />
                {traveling && i === active && <span className={styles.dot} />}
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

function Icon({ name }: { name: ProcessStep["icon"] }) {
  switch (name) {
    case "target":
      return (
        <>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </>
      );
    case "layers":
      return (
        <>
          <path d="M12 2 2 7l10 5 10-5-10-5z" />
          <path d="m2 17 10 5 10-5" />
          <path d="m2 12 10 5 10-5" />
        </>
      );
    case "check":
      return <path d="M20 6 9 17l-5-5" />;
  }
}
