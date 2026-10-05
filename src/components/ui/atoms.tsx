import type { ReactNode } from "react";

export function Check({ size = 10 }: { size?: number }) {
  return (
    <span className="chk">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-[10px] p-0 text-[14px] leading-[1.5] text-white7">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3">
          <span className="mt-[1px]">
            <Check />
          </span>
          {t}
        </li>
      ))}
    </ul>
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
 * Etiqueta de módulo: qué es esto, para quien no sigue la historia.
 * El anillo de la marca como indicador de fase, el módulo en versalitas y el contexto en gris.
 */
export function Kicker({ module, what }: { module: string; what: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-[10px] gap-y-1">
      <svg width="12" height="12" viewBox="0 0 44 44" fill="none" aria-hidden="true" className="flex-shrink-0">
        <circle cx="22" cy="22" r="12" stroke="#6E6E6E" strokeWidth="6" />
        <path d="M22 10 A12 12 0 0 1 34 22" stroke="#FFFFFF" strokeWidth="6" />
      </svg>
      <span className="t-label text-white7">{module}</span>
      <span className="t-small text-grey5">{what}</span>
    </div>
  );
}

/** Copy de capítulo: etiqueta de módulo, titular (con remate en gris) y un párrafo. */
export function ChapterCopy({
  module,
  what,
  title,
  grey,
  body,
  className = "",
}: {
  module?: string;
  what?: string;
  title: ReactNode;
  grey?: ReactNode;
  body?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 md:gap-5 ${className}`}>
      {module && what && <Kicker module={module} what={what} />}
      <h2 className="t-h1 m-0 text-white8">
        {title}
        {grey && (
          <>
            <br />
            <span className="text-grey5">{grey}</span>
          </>
        )}
      </h2>
      {body && <p className="t-body m-0 max-w-[440px] text-grey6">{body}</p>}
    </div>
  );
}

/** Formatea un número como lo haría el CRM (es-ES). */
export const num = (n: number) => Math.round(n).toLocaleString("es-ES");
