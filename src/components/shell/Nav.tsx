"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

const links = [
  { label: "Captación", id: "ciudad" },
  { label: "Catastro", id: "catastro" },
  { label: "Seguimiento", id: "seguimiento" },
  { label: "Equipo", id: "equipo" },
  { label: "Obra", id: "obra" },
  { label: "Módulos", id: "producto" },
  { label: "Planes", id: "planes" },
];
const sections: Record<string, string> = { bandeja: "ciudad", "captacion-texto": "ciudad", proceso: "ciudad", "catastro-texto": "catastro", "seguimiento-texto": "seguimiento", "equipo-texto": "equipo", "obra-texto": "obra", "transicion-cerrar": "obra", "plataforma-texto": "producto" };

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("radar");
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const items = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
        const current = items.filter((item) => item.getBoundingClientRect().top <= 150).at(-1);
        if (current) setActive(sections[current.id] ?? current.id);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const wide = window.matchMedia("(min-width: 1100px)");
    const resize = () => { if (wide.matches) setOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    wide.addEventListener("change", resize);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); wide.removeEventListener("change", resize); };
  }, [open]);

  function navigate(id: string) {
    setOpen(false);
    requestAnimationFrame(() => {
      const section = document.getElementById(id);
      if (section) { section.setAttribute("tabindex", "-1"); section.focus({ preventScroll: true }); }
    });
  }

  return (
    <header ref={header} className="site-header fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-5" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <a href="#radar" onClick={() => navigate("radar")} aria-label="STATECRM, volver al inicio" className="inline-flex min-h-11 items-center"><Logo progress /></a>
      <nav className="hidden items-center gap-4 min-[1100px]:flex xl:gap-5" aria-label="Secciones">
        {links.map((link) => <a key={link.id} href={`#${link.id}`} className="nav-link" aria-current={active === link.id ? "location" : undefined}>{link.label}</a>)}
      </nav>
      <div className="flex items-center gap-2">
        <a href="#manana" className="btn btn-w !min-h-11 !px-3 !text-[12px] sm:!px-4 sm:!text-[13px]">Pedir demo <span className="hidden sm:inline" aria-hidden="true">↗</span></a>
        <button ref={toggle} type="button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center rounded-lg border border-grey3 min-[1100px]:hidden">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}</svg>
        </button>
      </div>
      <nav id="mobile-navigation" hidden={!open} className="mobile-navigation min-[1100px]:hidden" aria-label="Secciones en móvil" data-lenis-prevent>
        {links.map((link) => <a key={link.id} href={`#${link.id}`} className="nav-link" aria-current={active === link.id ? "location" : undefined} onClick={() => navigate(link.id)}>{link.label}<span className="ml-auto" aria-hidden="true">↗</span></a>)}
      </nav>
    </header>
  );
}
