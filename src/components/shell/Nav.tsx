"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Logo } from "./Logo";
import { useScroll } from "@/lib/store";
import { chapterIndex, type ChapterId } from "@/lib/script";

const links: { label: string; href: string; chapter?: ChapterId }[] = [
  { label: "Captación", href: "#ciudad", chapter: "ciudad" },
  { label: "Catastro", href: "#catastro", chapter: "catastro" },
  { label: "Seguimiento", href: "#seguimiento", chapter: "seguimiento" },
  { label: "Equipo", href: "#equipo", chapter: "equipo" },
  { label: "Obra", href: "#obra", chapter: "obra" },
  { label: "Planes", href: "#planes" },
];

/**
 * Cabecera fija. Los enlaces se encienden cuando su capítulo está en pantalla
 * y dejan un check verde al salir ("visto").
 */
export function Nav() {
  const active = useSyncExternalStore(
    useScroll.subscribe,
    () => useScroll.getState().active,
    () => "prologo" as ChapterId,
  );
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const activeIdx = chapterIndex[active];

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 flex h-[64px] items-center justify-between gutter"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,10,.92), rgba(10,10,10,0))" }}
    >
      <a href="#prologo" aria-label="statecrm, volver al inicio" className="no-underline">
        <Logo progress />
      </a>

      <nav className="hidden items-center gap-7 md:flex" aria-label="Capítulos">
        {links.map((l) => {
          const idx = l.chapter ? chapterIndex[l.chapter] : Infinity;
          const seen = activeIdx > idx;
          const on = !!l.chapter && (active === l.chapter || (l.chapter === "ciudad" && active === "bandeja"));
          return (
            <a
              key={l.href}
              href={l.href}
              className="flex items-center gap-[6px] text-[13px] font-medium no-underline transition-colors"
              style={{ color: on ? "#fff" : seen ? "#A3A3A3" : "#6E6E6E" }}
            >
              {l.label}
              {seen && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </a>
          );
        })}
      </nav>

      <div className="flex items-center gap-[10px]">
        <a href="#manana" className="btn btn-w hidden !min-h-[38px] md:inline-flex">
          Pedir una demo
        </a>
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E5E5E5" strokeWidth="1.8" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-[64px] flex flex-col gap-1 border-t border-grey3 bg-black0 p-5 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-[16px] text-white7 no-underline">
              {l.label}
            </a>
          ))}
          <a href="#manana" onClick={() => setOpen(false)} className="btn btn-w mt-2">
            Pedir una demo
          </a>
        </div>
      )}
    </header>
  );
}
