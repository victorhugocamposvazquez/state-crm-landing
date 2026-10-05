"use client";

import { useEffect, useState } from "react";
import { useScroll } from "@/lib/store";
import { chapters, type LiveEvent } from "@/lib/script";

const totalEvents = chapters.reduce((n, c) => n + c.events.length, 0);

/**
 * La bandeja de notificaciones: fija en el pie, acumula hasta tres eventos con el scroll.
 * Es determinista: se calcula del progreso, así subir deshace exactamente lo que bajar hizo.
 */
export function Tray() {
  const [items, setItems] = useState<{ ev: LiveEvent; href: string }[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const compute = () => {
      const s = useScroll.getState();
      const passed: { ev: LiveEvent; href: string }[] = [];
      for (const ch of chapters) {
        const p = s.progress[ch.id] ?? 0;
        for (const ev of ch.events) if (p >= ev.at) passed.push({ ev, href: `#${ch.id}` });
      }
      setCount(passed.length);
      setItems(passed.slice(-3));
    };
    compute();
    return useScroll.subscribe(compute);
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-[var(--gutter)] z-40 w-[calc(100%-2*var(--gutter))] md:bottom-7 md:w-[340px]"
      aria-live="polite"
      aria-label="Notificaciones en vivo"
    >
      <div className="mono mb-2 text-right text-[10px] text-grey4">
        bandeja · {count} de {totalEvents}
      </div>
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {items.map(({ ev, href }, i) => {
          const depth = items.length - 1 - i; // 0 = más reciente
          const dot = ev.kind === "ok" ? "#22C55E" : ev.kind === "alert" ? "#D4A017" : "#FFFFFF";
          return (
            <li
              key={ev.text + ev.meta}
              className="pointer-events-auto"
              style={{
                opacity: depth === 0 ? 1 : depth === 1 ? 0.75 : 0.45,
                transform: `scale(${1 - depth * 0.03})`,
                transformOrigin: "bottom right",
                transition: "opacity .3s, transform .3s",
              }}
            >
              <a
                href={href}
                className="card flex items-center gap-[10px] px-[14px] py-[11px] text-[12px] text-white7 no-underline"
                style={{ borderColor: depth === 0 ? "#3A3A3A" : "#262626" }}
              >
                <span
                  className="h-[6px] w-[6px] flex-shrink-0 rounded-full"
                  style={{ background: dot, boxShadow: depth === 0 ? `0 0 10px ${dot}` : "none" }}
                />
                <span className="truncate">{ev.text}</span>
                <span className="mono ml-auto flex-shrink-0 text-[11px] text-grey5">{ev.meta}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
