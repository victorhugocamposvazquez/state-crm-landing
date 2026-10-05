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
 * Etiqueta de sección: dónde estás, dicho una sola vez. El número de capítulo (si lo hay), el
 * módulo en versalitas y el contexto en gris; el contexto se coloca en su propia línea en móvil.
 */
export function Kicker({ n, module, what }: { n?: string; module: string; what: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-[10px] gap-y-1">
      {n && <span className="mono text-[12px] text-grey5 md:text-[13px]">{n}</span>}
      <span className="t-label text-white7">{brandify(module)}</span>
      <span className="kicker-what t-small text-grey5">{brandify(what)}</span>
    </div>
  );
}

/**
 * Copy de capítulo: etiqueta de sección y titular con remate en gris.
 * El párrafo y los puntos viven en ModuleText, para no contar el módulo dos veces.
 * Titular y remate: dos líneas como máximo cada uno (≈ 19 caracteres por línea; ver .t-h1).
 */
export function ChapterCopy({
  n,
  module,
  what,
  title,
  grey,
  className = "",
}: {
  n?: string;
  module?: string;
  what?: string;
  title: ReactNode;
  grey?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 md:gap-5 ${className}`}>
      {module && what && <Kicker n={n} module={module} what={what} />}
      <h2 className="t-h1 m-0 text-white8">
        {title}
      </h2>
      {grey && <p className="chapter-summary t-lead m-0 max-w-[38ch] text-grey6">{grey}</p>}
      <p className="preview-label m-0">Vista ilustrativa del producto</p>
    </div>
  );
}

/** Formatea un número como lo haría el CRM (es-ES). */
export const num = (n: number) => Math.round(n).toLocaleString("es-ES");
