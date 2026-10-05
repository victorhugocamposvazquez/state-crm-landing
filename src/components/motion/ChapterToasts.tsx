"use client";

import { useEffect, useState } from "react";
import { useScroll } from "@/lib/store";
import { chapters, chapterIndex, type ChapterId, type LiveEvent, type ToastCorner } from "@/lib/script";

const corners: Record<ToastCorner, string> = {
  br: "bottom-4 right-[var(--gutter)] md:bottom-7",
  bl: "bottom-4 left-[var(--gutter)] md:bottom-7",
  tr: "top-[var(--copy-top)] right-[var(--gutter)]",
  tl: "top-[var(--copy-top)] left-[var(--gutter)]",
};

/**
 * Las notificaciones del capítulo, dentro de su propia pantalla: aparecen en la esquina que el
 * guion le asigna (`toasts` en script.ts) cuando el scroll pasa por `at`, y se van con el capítulo.
 * Deterministas: se calculan del progreso, así subir deshace exactamente lo que bajar hizo.
 */
export function ChapterToasts({ id }: { id: ChapterId }) {
  const chapter = chapters[chapterIndex[id]];
  const [items, setItems] = useState<LiveEvent[]>([]);

  useEffect(() => {
    if (!chapter.events.length) return;
    const compute = () => {
      const p = useScroll.getState().progress[id] ?? 0;
      const passed = chapter.events.filter((ev) => p >= ev.at);
      setItems((prev) => (prev.length === passed.length ? prev : passed));
    };
    compute();
    return useScroll.subscribe(compute);
  }, [id, chapter]);

  if (!chapter.events.length || items.length === 0) return null;
  const corner = corners[chapter.toasts ?? "br"];
  // la más reciente, pegada a la esquina: arriba en las esquinas superiores, abajo en las inferiores
  const last = items[items.length - 1];
  const ordered = corner.startsWith("top") ? [...items].reverse() : items;

  return (
    <div
      className={`pointer-events-none absolute z-20 w-[calc(100%-2*var(--gutter))] md:w-[340px] ${corner}`}
      aria-live="polite"
      aria-label="Notificaciones del CRM"
    >
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {ordered.map((ev) => {
          const latest = ev === last;
          const dot = ev.kind === "ok" ? "#22C55E" : ev.kind === "alert" ? "#D4A017" : "#FFFFFF";
          return (
            <li
              key={ev.text + ev.meta}
              className="card flex items-center gap-[10px] px-[14px] py-[11px] text-[12px] text-white7"
              style={{
                opacity: latest ? 1 : 0.6,
                borderColor: latest ? "#3A3A3A" : "#262626",
                transition: "opacity .3s, border-color .3s",
              }}
            >
              <span
                className="h-[6px] w-[6px] flex-shrink-0 rounded-full"
                style={{ background: dot, boxShadow: latest ? `0 0 10px ${dot}` : "none" }}
              />
              <span className="truncate">{ev.text}</span>
              <span className="mono ml-auto flex-shrink-0 text-[11px] text-grey5">{ev.meta}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
