import gsap from "gsap";

/**
 * Cuenta un número en pantalla dentro de una timeline frotada por scroll.
 * Los números nunca aparecen hechos: cuentan desde `from` en el tramo en que entran.
 */
export function countTo(
  tl: gsap.core.Timeline,
  el: Element | null | undefined,
  opts: { from?: number; to: number; at: number; dur?: number; format?: (n: number) => string },
) {
  if (!el) return;
  const state = { v: opts.from ?? 0 };
  const fmt = opts.format ?? ((n: number) => Math.round(n).toLocaleString("es-ES"));
  (el as HTMLElement).textContent = fmt(state.v);
  tl.to(
    state,
    {
      v: opts.to,
      duration: opts.dur ?? 0.3,
      ease: "power2.out",
      onUpdate: () => {
        (el as HTMLElement).textContent = fmt(state.v);
      },
    },
    opts.at,
  );
}

/** Escribe un texto letra a letra (máquina de escribir) dentro de la timeline. */
export function typeText(
  tl: gsap.core.Timeline,
  el: Element | null | undefined,
  text: string,
  opts: { at: number; dur?: number },
) {
  if (!el) return;
  const state = { n: 0 };
  (el as HTMLElement).textContent = "";
  tl.to(
    state,
    {
      n: text.length,
      duration: opts.dur ?? 0.2,
      ease: "none",
      onUpdate: () => {
        (el as HTMLElement).textContent = text.slice(0, Math.round(state.n));
      },
    },
    opts.at,
  );
}
