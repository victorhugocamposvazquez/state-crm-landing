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
    <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[14px] text-white7 md:text-[15px]">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-3">
          <Check />
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

/** Copy de capítulo: hora + dos frases. */
/** Etiqueta de módulo: qué es esto, para quien no sigue la historia. */
export function Kicker({ module, what }: { module: string; what: string }) {
  return (
    <div className="flex items-center gap-[10px] text-[13px]">
      <span className="h-[14px] w-[14px] flex-shrink-0 rounded-[3px] border border-grey5" />
      <span className="font-medium text-white8">{module}</span>
      <span className="text-grey4">·</span>
      <span className="text-grey6">{what}</span>
    </div>
  );
}

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
    <div className={`flex flex-col gap-5 ${className}`}>
      {module && what && <Kicker module={module} what={what} />}
      <h2 className="display m-0 text-[30px] text-white8 md:text-[40px]">
        {title}
        {grey && (
          <>
            <br />
            <span className="text-grey5">{grey}</span>
          </>
        )}
      </h2>
      {body && <p className="m-0 max-w-[460px] text-[15px] leading-[1.6] text-grey6 md:text-[17px]">{body}</p>}
    </div>
  );
}

/** Formatea un número como lo haría el CRM (es-ES). */
export const num = (n: number) => Math.round(n).toLocaleString("es-ES");
