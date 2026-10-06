"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { useScroll } from "@/lib/store";
import { chapterIndex, type ChapterId } from "@/lib/script";

const links: { label: string; href: string; chapter?: ChapterId }[] = [
  { label: "Captación", href: "#ciudad", chapter: "ciudad" },
  { label: "Catastro", href: "#catastro", chapter: "catastro" },
  { label: "Seguimiento", href: "#seguimiento", chapter: "seguimiento" },
  { label: "Equipo", href: "#equipo", chapter: "equipo" },
  { label: "Obra", href: "#obra", chapter: "obra" },
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

  // En iOS el scroll automático de la intro esconde la barra del navegador y la
  // cabecera fija se queda fuera del área visible. La recolocamos ahí.
  useEffect(() => {
    const header = headerRef.current;
    const vv = window.visualViewport;
    if (!header || !vv) return;
    const pin = () => {
      const y = vv.offsetTop;
      header.style.transform = y > 0 ? `translate3d(0, ${y}px, 0)` : "";
    };
    pin();
    vv.addEventListener("scroll", pin);
    vv.addEventListener("resize", pin);
    return () => {
      vv.removeEventListener("scroll", pin);
      vv.removeEventListener("resize", pin);
    };
  }, []);

  const activeIdx = chapterIndex[active];

  return (
    <header
      ref={headerRef}
      className="site-header fixed inset-x-0 top-0 z-50 flex h-[72px] items-center justify-between px-[var(--edge)]"
    >
      <a href="#prologo" aria-label="statecrm, volver al inicio" className="no-underline">
        <Logo />
      </a>

      <nav className="hidden items-center gap-8 md:flex" aria-label="Capítulos">
        {links.map((l) => {
          const idx = l.chapter ? chapterIndex[l.chapter] : Infinity;
          const seen = activeIdx > idx;
          const on = !!l.chapter && (active === l.chapter || (l.chapter === "ciudad" && active === "bandeja"));
          return (
            <a
              key={l.href}
              href={l.href}
              aria-current={on ? "true" : undefined}
              className="flex items-center gap-[6px] text-[14px] font-medium no-underline transition-colors"
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

      <div className="flex items-center gap-3 md:gap-2">
        <a href="#planes" className="btn btn-line !min-h-[38px] px-3 md:px-[18px]">
          Ver planes
        </a>
        <div className="flex items-center md:contents">
          <Link href="/entrar" aria-label="Iniciar sesión o registrarte" className="flex h-10 w-8 items-center justify-center text-white7 no-underline hover:text-white8 md:h-12 md:w-12">
            <svg className="h-[22px] w-[22px] md:h-8 md:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
              <circle cx="12" cy="12" r="9.25" />
              <circle cx="12" cy="9.2" r="2.4" />
              <path d="M7.2 17.6c.7-2.15 2.5-3.3 4.8-3.3s4.1 1.15 4.8 3.3" strokeLinecap="round" />
            </svg>
          </Link>
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-7 items-center justify-end md:hidden"
          >
            {open ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#E5E5E5" strokeWidth="1.5" aria-hidden="true">
                <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
              </svg>
            ) : (
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="#E5E5E5" strokeWidth="1.5" aria-hidden="true">
                <path d="M0 1h18M0 9h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-[72px] flex flex-col gap-1 border-t border-grey3 bg-black0 p-5 md:hidden">
          {links.map((l) => {
            const on = !!l.chapter && (active === l.chapter || (l.chapter === "ciudad" && active === "bandeja"));
            return (
              <a key={l.href} href={l.href} aria-current={on ? "true" : undefined} onClick={() => setOpen(false)} className={`py-3 text-[16px] no-underline ${on ? "text-white8" : "text-white7"}`}>
                {l.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
