import { Fragment, type ReactNode } from "react";

/**
 * El nombre de la marca en texto, con los colores del lockup: «state» en blanco, «crm» en el gris del logo.
 * En texto corrido hereda la tipografía; con `wordmark`, en un titular, va en la tipografía de la marca
 * (Space Grotesk 700), como el logo.
 */
export function Brand({ className = "", wordmark = false }: { className?: string; wordmark?: boolean }) {
  return (
    <span className={`whitespace-nowrap ${wordmark ? "wordmark-inline" : ""} ${className}`}>
      <span className="text-white8">state</span>
      <span className="text-grey6">crm</span>
    </span>
  );
}

const BRAND_RE = /(statecrm)/gi;

/** Convierte un texto plano en nodos, sustituyendo cada «statecrm» por <Brand />. */
export function brandify(text: string, wordmark = false): ReactNode {
  const parts = text.split(BRAND_RE);
  if (parts.length === 1) return text;
  return parts.map((p, i) => (p.toLowerCase() === "statecrm" ? <Brand key={i} wordmark={wordmark} /> : <Fragment key={i}>{p}</Fragment>));
}

export function Check({ size = 10 }: { size?: number }) {
  return (
    <span className="chk">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

export function Chip({ kind = "n", children }: { kind?: "g" | "a" | "n"; children: ReactNode }) {
  return <span className={`st st-${kind}`}>{children}</span>;
}

export function Dot({ color = "#22C55E", glow = true }: { color?: string; glow?: boolean }) {
  return (
    <span
      className="inline-block h-[6px] w-[6px] flex-shrink-0 rounded-full"
      style={{ background: color, boxShadow: glow ? `0 0 10px ${color}` : "none" }}
    />
  );
}

/**
 * Copy de capítulo: el nombre del módulo es el titular, grande, y debajo una frase
 * que dice qué es. El párrafo largo vive en ModuleText.
 */
export function ChapterCopy({
  n,
  module,
  what,
  className = "",
}: {
  n?: string;
  module: string;
  what: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 md:gap-4 ${className}`}>
      {n && <span className="mono text-[13px] text-grey5">{n}</span>}
      <h2 className="t-chapter m-0 text-white8">{brandify(module)}</h2>
      <p className="t-chapter-lead m-0 text-grey6">{brandify(what)}</p>
    </div>
  );
}

/** Formatea un número como lo haría el CRM (es-ES). */
export const num = (n: number) => Math.round(n).toLocaleString("es-ES");
