"use client";

import { useRef, type ReactNode } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { ChapterCopy } from "@/components/ui/atoms";

type SectionId =
  | "hoy" | "calendario" | "tareas" | "captacion" | "catastro" | "seguimiento"
  | "inmuebles" | "demandas" | "contactos" | "herramientas" | "presupuestos" | "facturas";

const menu: { group: string; items: { id: SectionId; label: string; badge?: string }[] }[] = [
  { group: "Día a día", items: [
    { id: "hoy", label: "Hoy" },
    { id: "calendario", label: "Calendario" },
    { id: "tareas", label: "Tareas", badge: "6" },
  ]},
  { group: "Captación", items: [
    { id: "captacion", label: "Captación" },
    { id: "catastro", label: "Catastro" },
    { id: "seguimiento", label: "Seguimiento" },
    { id: "inmuebles", label: "Inmuebles" },
    { id: "demandas", label: "Demandas" },
    { id: "contactos", label: "Contactos" },
  ]},
  { group: "Herramientas", items: [{ id: "herramientas", label: "Herramientas" }] },
  { group: "Obra y facturación", items: [
    { id: "presupuestos", label: "Presupuestos" },
    { id: "facturas", label: "Facturas" },
  ]},
];

const flat = menu.flatMap((g) => g.items);

/**
 * 07 · Los módulos. El menú entero se queda; el scroll solo cambia la pantalla activa.
 */
export function Producto() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q, enter) => {
    const screens = q<HTMLElement>(".mod-screen");
    const sides = q<HTMLElement>(".side-item");
    enter.fromTo(q(".copy"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0)
      .fromTo(q(".app-shell"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 0.1);

    const hold = 0.9 / screens.length;
    screens.forEach((_, k) => {
      if (k === 0) return;
      const t = 0.02 + k * hold;
      tl.to(screens[k - 1], { opacity: 0, duration: 0.045 }, t)
        .fromTo(screens[k], { opacity: 0 }, { opacity: 1, duration: 0.045 }, t)
        .to(sides[k - 1], { color: "#A3A3A3", backgroundColor: "transparent", duration: 0.04 }, t)
        .to(sides[k], { color: "#fff", backgroundColor: "#1c1c1c", duration: 0.04 }, t);
    });
  });

  return (
    <Chapter id="producto">
      <div ref={ref} className="stagewrap">
        <div className="stageframe">
          <div className="halo" style={{ left: "18%", top: "10%", width: 900, height: 640 }} />

          <div className="app-shell absolute inset-x-0 bottom-2 top-[var(--copy-top)] z-10 grid grid-cols-1 gap-3 md:grid-cols-[228px_minmax(0,1fr)] md:gap-4" style={{ opacity: 0 }}>
            <div className="flex min-h-0 flex-col gap-3">
              <div className="copy">
                <ChapterCopy n="07" module="Los módulos" what="Captación, catastro, equipo y facturación, en la misma herramienta." />
              </div>
              <nav className="sidebar flex min-h-0 flex-col rounded-[12px] border border-[#1F1F1F] bg-[#0F0F0F] p-1.5 md:flex-1 md:overflow-y-auto" aria-label="Secciones">
                {menu.map((g) => (
                  <div key={g.group}>
                    <div className="px-2 pb-0.5 pt-2 text-[10px] uppercase tracking-[0.12em] text-grey4">{g.group}</div>
                    {g.items.map((s) => {
                      const on = s.id === flat[0].id;
                      return (
                        <div
                          key={s.id}
                          data-mod={s.id}
                          className="side-item flex items-center gap-2 rounded-[7px] px-2 py-[5px] text-[12.5px]"
                          style={{ color: on ? "#fff" : "#A3A3A3", backgroundColor: on ? "#1c1c1c" : "transparent" }}
                        >
                          <Mark id={s.id} />
                          <span className="min-w-0 flex-1 truncate">{s.label}</span>
                          {"badge" in s && s.badge && (
                            <span className="mono rounded-full bg-[#1F1F1F] px-1.5 text-[10px] text-grey6">{s.badge}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div className="mt-auto flex items-center gap-2 border-t border-[#1F1F1F] px-2 pb-1 pt-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2A2A2A] text-[10px] text-white7">AN</span>
                  <span className="min-w-0">
                    <span className="block truncate text-[12px] text-white7">Ana</span>
                    <span className="block truncate text-[10px] text-grey5">Equipo</span>
                  </span>
                </div>
              </nav>
            </div>

            <div className="app-stage panel relative min-h-[280px] overflow-hidden md:min-h-0">
              {flat.map((s, i) => (
                <section key={s.id} className="mod-screen absolute inset-0 overflow-hidden p-3 md:p-4" data-screen={s.id} style={{ opacity: i === 0 ? 1 : 0 }}>
                  <Screen id={s.id} />
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}

function Screen({ id }: { id: SectionId }) {
  if (id === "hoy") return <Hoy />;
  if (id === "calendario") return <Calendario />;
  if (id === "tareas") return <Tareas />;
  if (id === "captacion") return <Captacion />;
  if (id === "catastro") return <Catastro />;
  if (id === "seguimiento") return <Seguimiento />;
  if (id === "inmuebles") return <Inmuebles />;
  if (id === "demandas") return <Demandas />;
  if (id === "contactos") return <Contactos />;
  if (id === "herramientas") return <Herramientas />;
  if (id === "presupuestos") return <Presupuestos />;
  return <Facturas />;
}

function Mark({ id }: { id: SectionId }) {
  const p = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": true as const };
  if (id === "hoy") return <svg {...p}><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></svg>;
  if (id === "calendario") return <svg {...p}><path d="M5 6h14v13H5zM5 10h14M9 4v4M15 4v4" /></svg>;
  if (id === "tareas") return <svg {...p}><path d="M8 6h11M8 12h11M8 18h11M4 6l1.2 1.2L7 5.2M4 12l1.2 1.2L7 11.2M4 18l1.2 1.2L7 17.2" /></svg>;
  if (id === "captacion") return <svg {...p}><circle cx="11" cy="11" r="6" /><path d="m20 20-3.5-3.5" /></svg>;
  if (id === "catastro") return <svg {...p}><path d="M4 5h16v14H4zM4 10h16M10 5v14" /></svg>;
  if (id === "seguimiento") return <svg {...p}><path d="M5 17V7M10 17V11M15 17V9M20 17V5" /></svg>;
  if (id === "inmuebles") return <svg {...p}><path d="M4 11 12 4l8 7v8H4z" /></svg>;
  if (id === "demandas") return <svg {...p}><circle cx="9" cy="9" r="3" /><path d="M4 18c.7-2.2 2.5-3.4 5-3.4s4.3 1.2 5 3.4" /></svg>;
  if (id === "contactos") return <svg {...p}><circle cx="12" cy="8" r="3" /><path d="M6 19c.8-2.6 3-4 6-4s5.2 1.4 6 4" /></svg>;
  if (id === "herramientas") return <svg {...p}><path d="M14 6a4 4 0 0 0-5 5L4 16l4 4 5-5a4 4 0 0 0 5-5l-3 3-2-2 3-3z" /></svg>;
  if (id === "presupuestos") return <svg {...p}><path d="M7 3h8l4 4v14H7zM15 3v4h4M9 12h6M9 16h4" /></svg>;
  return <svg {...p}><path d="M6 4h12v16H6zM9 8h6M9 12h6M9 16h3" /></svg>;
}

function Head({ title, hint, extra }: { title: string; hint: string; extra?: ReactNode }) {
  return (
    <div className="mb-2 flex items-start justify-between gap-3">
      <div>
        <h3 className="m-0 text-[15px] font-medium tracking-[-0.02em] text-white8">{title}</h3>
        <p className="m-0 mt-0.5 text-[12px] text-grey5">{hint}</p>
      </div>
      {extra}
    </div>
  );
}

function Hoy() {
  const rows = [
    ["09:30", "Llamada", "Propietario · Calle del Pez, 18", "Ana"],
    ["11:00", "Visita", "Piso en Plaza de Castilla, 5", "Luis"],
    ["13:00", "Visita", "Casa en Camino Rianxiño, 115", "Marta"],
    ["16:30", "Firma", "Encargo · Rúa Barcelona, 2", "Nora"],
    ["18:00", "Llamada", "Demanda de Iria · Oleiros", "Pablo"],
  ];
  return (
    <>
      <Head title="Hoy" hint="5 citas · oficina centro" />
      {rows.map(([t, kind, what, who]) => (
        <div key={t + what} className="grid grid-cols-[52px_72px_minmax(0,1fr)_auto] items-center gap-2 border-t border-[#1F1F1F] py-2 text-[12px]">
          <span className="mono text-grey5">{t}</span>
          <span className="text-white7">{kind}</span>
          <span className="truncate text-grey6">{what}</span>
          <span className="text-grey5">{who}</span>
        </div>
      ))}
    </>
  );
}

function Calendario() {
  const days = ["lun", "mar", "mié", "jue", "vie"];
  const slots = [
    ["09:00", "Ana", "", "Luis", "", ""],
    ["11:00", "", "Visita", "", "Marta", ""],
    ["13:00", "Firma", "", "Nora", "", "Pablo"],
    ["16:30", "", "Ana", "", "", "Visita"],
  ];
  return (
    <>
      <Head title="Calendario" hint="Oficina centro · esta semana" />
      <div className="mono grid grid-cols-[52px_repeat(5,1fr)] gap-1 text-center text-[10px] text-grey5">
        <span />
        {days.map((d) => <span key={d}>{d}</span>)}
      </div>
      {slots.map(([h, ...cells]) => (
        <div key={h} className="mt-1 grid grid-cols-[52px_repeat(5,1fr)] items-center gap-1">
          <span className="mono text-[10px] text-grey5">{h}</span>
          {cells.map((c, i) => (
            <span key={h + i} className="flex h-7 items-center justify-center rounded-[5px] border text-[10px]" style={{ borderColor: c ? "#3A3A3A" : "#1F1F1F", background: c ? "#171717" : "transparent", color: c ? "#E5E5E5" : "transparent" }}>{c || "·"}</span>
          ))}
        </div>
      ))}
    </>
  );
}

function Tareas() {
  const cols = [
    ["Hoy", "5", [["Visita: enseñar piso", "RHB-2026-0002", "Ayer 12:15", "AN"], ["Llamar a Mario", "Calle del Pez, 18", "Ayer 10:00", "LU"], ["Recordatorio captación", "Rúa Barcelona, 2", "Ayer 11:00", "MA"]]],
    ["Esta semana", "9", [["Captación · Jericó", "mar 13 · 16:15", "RA", "NO"], ["Llamada: captar encargo", "Manuel", "mar 13 · 12:00", "IR"], ["Captación · Oza 127", "", "mar 13 · 11:00", "PA"]]],
    ["Esperando", "1", [["Visitar a Nora", "Oleiros", "Ayer", "LU"]]],
    ["Hechas", "1", [["Visita", "Iria · Oleiros", "Ayer 17:30", "MA"]]],
  ] as const;
  return (
    <>
      <Head title="Tareas" hint="Todo lo del calendario entra por día" extra={<span className="rounded-full border border-[#333] px-2 py-1 text-[11px] text-grey6">Tablero</span>} />
      <div className="mb-2 flex gap-1.5">
        {[["AN", "Ana"], ["LU", "Luis"], ["MA", "Marta"], ["NO", "Nora"], ["IR", "Iria"], ["PA", "Pablo"]].map(([i, n]) => (
          <span key={n} className="flex h-6 w-6 items-center justify-center rounded-full bg-[#262626] text-[9px] text-grey6" title={n}>{i}</span>
        ))}
      </div>
      <div className="grid min-h-0 grid-cols-4 gap-1.5">
        {cols.map(([name, n, cards]) => (
          <div key={name} className="rounded-[8px] border border-[#222] bg-[#121212] p-1.5">
            <div className="mb-1 flex justify-between px-1 text-[11px] text-grey5"><span>{name}</span><span>{n}</span></div>
            {cards.map(([title, meta, when, who]) => (
              <div key={title} className="mb-1 rounded-[6px] border border-[#2A2A2A] bg-[#181818] p-1.5">
                <div className="text-[11px] leading-snug text-white7">{title}</div>
                <div className="mt-1 truncate text-[10px] text-grey5">{meta}</div>
                <div className="mt-1 flex items-center justify-between text-[10px] text-grey5">
                  <span>{when}</span>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#262626] text-[8px]">{who}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function Captacion() {
  const rows = [
    ["Casa en Camino Rianxiño, 115", "Particular · id. 115 · 3 hab · hace 2 h", "260.000 €", "140", "Ana", "Oleiros"],
    ["Piso en calle de Posse", "Idealista · id. 0002 · 3 hab · hace 6 h", "435.000 €", "92", "Luis", "A Coruña"],
    ["Piso en Calle del Pez, 18", "Fotocasa · id. 0018 · 2 hab · hace 9 h", "450.000 €", "78", "Marta", "Madrid"],
    ["Casa en Plaza de Castilla, 5", "Idealista · id. 0005 · 4 hab · hace 14 h", "310.000 €", "160", "Nora", "Centro"],
    ["Piso en Rúa Barcelona, 2", "Pisos.com · id. 0009 · 1 hab · hace 1 d", "189.000 €", "54", "Pablo", "Rianxo"],
  ];
  return (
    <>
      <Head title="Captación" hint="Anuncios de particulares. Lo de hoy y lo que estás trabajando." extra={<span className="text-[12px] text-grey5">8 sin teléfono</span>} />
      <div className="mb-2 flex gap-4 border-b border-[#1F1F1F] text-[12px]">
        <span className="border-b border-green pb-1.5 text-white8">Novedades <b className="text-green">86</b></span>
        <span className="pb-1.5 text-grey5">Seguimiento 4</span>
        <span className="pb-1.5 text-grey5">Alertas 4</span>
        <span className="hidden pb-1.5 text-grey5 sm:inline">Notificaciones 5</span>
      </div>
      <div className="mb-2 grid grid-cols-4 gap-1.5">
        {[["12", "Nuevos hoy"], ["7", "Subidas de precio"], ["9", "Bajadas de precio"], ["4", "En seguimiento"]].map(([n, l]) => (
          <div key={l} className="rounded-[8px] border border-[#222] bg-[#141414] px-2 py-1.5">
            <div className="text-[16px] font-medium text-white8">{n}</div>
            <div className="text-[10px] text-grey5">{l}</div>
          </div>
        ))}
      </div>
      <div className="mb-2 flex flex-wrap gap-1 text-[10px] text-grey6">
        {["Todos 86", "Particulares 31", "Agencias 55", "Nuevos hoy 12", "Sin teléfono 8", "Idealista 40", "Fotocasa 22"].map((c, i) => (
          <span key={c} className="rounded-full border px-2 py-0.5" style={{ borderColor: i === 0 ? "#555" : "#2A2A2A", color: i === 0 ? "#fff" : "#8A8A8A" }}>{c}</span>
        ))}
      </div>
      <div className="mono grid grid-cols-[minmax(0,1.4fr)_88px_36px_64px_72px] gap-2 px-1 pb-1 text-[10px] text-grey5">
        <span>Anuncio</span><span className="text-right">Precio</span><span className="text-right">m²</span><span>Contacto</span><span>Zona</span>
      </div>
      {rows.map(([title, meta, price, m, who, zone]) => (
        <div key={title} className="grid grid-cols-[minmax(0,1.4fr)_88px_36px_64px_72px] items-center gap-2 border-t border-[#1F1F1F] py-1.5">
          <span className="min-w-0">
            <span className="block truncate text-[12px] text-white7">{title}</span>
            <span className="block truncate text-[10px] text-grey5">{meta}</span>
          </span>
          <span className="text-right text-[12px] text-white8">{price}</span>
          <span className="text-right text-[11px] text-grey6">{m}</span>
          <span className="truncate text-[11px] text-grey6">{who}</span>
          <span className="truncate text-[11px] text-grey5">{zone}</span>
        </div>
      ))}
    </>
  );
}

function Catastro() {
  const rows = [
    ["A CORUÑA · CL DEL PEZ", "18 fincas · 3 candidatas · 10/10", "Completa", "g", "100%"],
    ["OLEIROS · CAMINO RIANXIÑO", "7 fincas · 1 candidata · 9/10", "En curso", "n", "62%"],
    ["MADRID · CL DEL PEZ", "30 fincas · 10 candidatas · 10/10", "En curso", "n", "40%"],
    ["A CORUÑA · CP 15009", "62 fincas · 9 candidatas · 9/10", "Pausada", "a", "18%"],
    ["RIANXO · RÚA REAL", "6 fincas · 1 candidata · 8/10", "Completa", "g", "100%"],
    ["A CORUÑA · PL CASTILLA", "24 fincas · 4 candidatas · 8/10", "En curso", "n", "55%"],
  ] as const;
  return (
    <>
      <Head title="Catastro · Historial" hint="30 fincas · 10 candidatas · hoy" />
      <div className="mb-1 flex gap-4 border-b border-[#1F1F1F] text-[12px] text-grey5">
        <span className="pb-1.5">Buscar</span>
        <span className="pb-1.5">Resultados</span>
        <span className="border-b border-white8 pb-1.5 text-white8">Historial</span>
      </div>
      {rows.map(([place, meta, st, kind, w]) => (
        <div key={place} className="grid grid-cols-[minmax(0,1fr)_auto_72px_52px] items-center gap-2 border-t border-[#1F1F1F] py-1.5">
          <span className="min-w-0">
            <span className="block truncate text-[12px] text-white7">{place}</span>
            <span className="mono text-[10px] text-grey5">{meta}</span>
          </span>
          <span className={`st st-${kind} text-[11px]`}>{st}</span>
          <span className="h-[3px] overflow-hidden rounded-full bg-[#222]">
            <span className="block h-full" style={{ width: w, background: kind === "a" ? "#D4A017" : kind === "g" ? "#22C55E" : "#6E6E6E" }} />
          </span>
          <span className="text-right text-[11px] text-grey6">Abrir</span>
        </div>
      ))}
    </>
  );
}

function Seguimiento() {
  const cols = [
    ["Captado", ["Calle del Pez, 18", "Rianxiño, 115"]],
    ["Visita", ["Plaza de Castilla, 5"]],
    ["Reserva", ["Posse · 435.000 €"]],
    ["Vendido", ["Rúa Barcelona, 2"]],
  ];
  return (
    <>
      <Head title="Seguimiento" hint="Etapas de la oficina · 4 operaciones vivas" />
      <div className="grid grid-cols-4 gap-1.5">
        {cols.map(([name, cards]) => (
          <div key={name as string} className="rounded-[8px] border border-[#222] bg-[#121212] p-2">
            <div className="mb-2 text-[11px] text-grey5">{name as string}</div>
            {(cards as string[]).map((c) => (
              <div key={c} className="mb-1 rounded-[6px] border border-[#2A2A2A] bg-[#181818] px-2 py-1.5 text-[11px] text-white7">{c}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function Inmuebles() {
  const rows = [
    ["RHB-2026-0002", "Piso en calle de Posse", "435.000 €", "disponible", "Luis"],
    ["RHB-2026-0005", "Casa en Plaza de Castilla, 5", "310.000 €", "disponible", "Nora"],
    ["RHB-2026-0018", "Piso en Calle del Pez, 18", "450.000 €", "reservado", "Marta"],
    ["RHB-2026-0115", "Casa en Camino Rianxiño, 115", "260.000 €", "en visita", "Ana"],
  ];
  return (
    <>
      <Head title="Inmuebles" hint="Stock de la agencia · 2 disponibles" />
      <div className="mono grid grid-cols-[110px_minmax(0,1fr)_88px_80px_52px] gap-2 px-1 pb-1 text-[10px] text-grey5">
        <span>Ref.</span><span>Inmueble</span><span className="text-right">Precio</span><span>Estado</span><span>Quién</span>
      </div>
      {rows.map(([ref, title, price, st, who]) => (
        <div key={ref} className="grid grid-cols-[110px_minmax(0,1fr)_88px_80px_52px] items-center gap-2 border-t border-[#1F1F1F] py-2 text-[12px]">
          <span className="mono text-[11px] text-grey5">{ref}</span>
          <span className="truncate text-white7">{title}</span>
          <span className="text-right text-white8">{price}</span>
          <span className={st === "disponible" ? "text-green" : "text-grey5"}>{st}</span>
          <span className="text-grey6">{who}</span>
        </div>
      ))}
    </>
  );
}

function Demandas() {
  const cards = [
    ["Iria Seoane", "Compra · piso, bajo", "Culleredo", "hasta 200.000 €", "Ana", "0"],
    ["Manuel Rico", "Compra", "A Coruña", "hasta 620.000 €", "Luis", "2"],
    ["Nora Vidal", "Compra y alquiler · piso", "Oleiros", "hasta 800.000 €", "Marta", "1"],
    ["Pablo Naya", "Compra · piso, chalet", "Centro", "hasta 450.000 €", "Nora", "2"],
    ["Elena Cruz", "Compra · piso", "Rianxo", "hasta 250.000 €", "Pablo", "0"],
  ];
  return (
    <>
      <Head title="Demandas" hint="Lo que busca cada cliente. El cruce usa el stock; tú confirmas." extra={<span className="rounded-full bg-white8 px-2.5 py-1 text-[11px] text-black0">Nueva demanda</span>} />
      <div className="mb-2 flex flex-wrap gap-1 text-[11px]">
        <span className="rounded-full border border-[#444] px-2 py-0.5 text-white8">activa 5</span>
        <span className="rounded-full border border-[#2A2A2A] px-2 py-0.5 text-grey5">pausada 1</span>
        <span className="rounded-full border border-[#2A2A2A] px-2 py-0.5 text-grey5">cubierta 2</span>
        <span className="rounded-full border border-[#2A2A2A] px-2 py-0.5 text-grey5">cerrada 3</span>
      </div>
      <div className="mb-2 grid grid-cols-4 gap-1 text-[11px] text-grey5">
        {["Operación", "Tipo", "Zona", "Comercial"].map((f) => (
          <span key={f} className="rounded-[8px] border border-[#2A2A2A] px-2 py-1.5">{f}</span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-3">
        {cards.map(([who, what, zone, price, comercial, n]) => (
          <div key={who} className="rounded-[8px] border border-[#262626] bg-[#141414] p-2">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[12px] text-white8">{who}</span>
              <span className="st st-g text-[10px]">activa</span>
            </div>
            <div className="mt-1 text-[11px] text-grey6">{what}</div>
            <div className="text-[11px] text-grey5">{zone}</div>
            <div className="mt-1 text-[11px] text-white7">{price}</div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-grey5">
              <span>{comercial}</span>
              <span className="text-white7">{n} encajan</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Contactos() {
  const rows = [
    ["IS", "Iria Seoane", "Calle del Pez, 18", "9 oct", "644 902 221", "Propietaria. El piso lleva una semana en Idealista y aún no tiene comercial.", true],
    ["PN", "Pablo Naya", "Demanda · Oleiros", "9 oct", "655 330 178", "Busca bajo con terraza, hasta 200.000 €. Quiere verlo esta semana.", false],
    ["MC", "Marta Couce", "Plaza de Castilla, 5", "8 oct", "633 118 440", "Encargo firmado. Pide el informe del catastro antes de la visita del jueves.", false],
    ["NV", "Nora Vidal", "Rúa Barcelona, 2", "8 oct", "622 118 904", "Compradora. Le encajan dos pisos del stock; pendiente de confirmar la visita.", false],
    ["EC", "Elena Cruz", "Camino Rianxiño, 115", "7 oct", "611 440 228", "Llamó para vender. La casa está ocupada; dejar la valoración por escrito.", false],
  ] as const;
  return (
    <>
      <Head
        title="Contactos"
        hint="Quien busca, ofrece o tiene obra pasa a cliente. El resto sigue como contacto."
        extra={<span className="rounded-full border border-[#333] px-2.5 py-1 text-[11px] text-white7">Nuevo contacto</span>}
      />
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="flex min-h-0 flex-col rounded-[10px] border border-[#262626] bg-[#101010]">
          <div className="flex flex-wrap items-center gap-1.5 border-b border-[#1F1F1F] p-2">
            <span className="min-w-[140px] flex-1 rounded-full border border-[#2A2A2A] px-3 py-1 text-[11px] text-grey5">Nombre, teléfono o nota</span>
            {["Todos", "Contactos", "Clientes", "Ofrecen"].map((f, i) => (
              <span key={f} className="rounded-full border px-2 py-0.5 text-[10px]" style={{ borderColor: i === 0 ? "#555" : "#2A2A2A", color: i === 0 ? "#fff" : "#8A8A8A" }}>{f}</span>
            ))}
          </div>
          {rows.map(([ini, who, where, when, phone, note, on]) => (
            <div key={who} className="grid grid-cols-[28px_minmax(0,1fr)_auto] gap-2 border-t border-[#1F1F1F] px-2 py-2" style={{ background: on ? "#161616" : "transparent", boxShadow: on ? "inset 2px 0 0 #fff" : "none" }}>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2A2A2A] text-[9px] text-grey6">{ini}</span>
              <span className="min-w-0">
                <span className="block truncate text-[12px] text-white8">{who}</span>
                <span className="block truncate text-[10px] text-grey5">{where}</span>
                <span className="mt-0.5 block truncate text-[10px] text-grey6">{note}</span>
              </span>
              <span className="text-right">
                <span className="mono block text-[10px] text-grey5">{when} · {phone}</span>
                <span className="mt-1 inline-flex gap-1">
                  <span className="rounded-full border border-[#333] px-1.5 py-0.5 text-[9px] text-grey6">Contacto</span>
                  <span className="rounded-full border border-[#244428] px-1.5 py-0.5 text-[9px] text-green">Activo</span>
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 rounded-[10px] border border-[#262626] bg-[#101010] p-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2A2A2A] text-[10px] text-grey6">IS</span>
            <span>
              <span className="block text-[14px] text-white8">Iria Seoane</span>
              <span className="text-[11px] text-grey5">Contacto · Calle del Pez, 18</span>
            </span>
          </div>
          <span className="text-[11px] text-grey6">Asignada a Ana · alta 9 oct</span>
          <div className="flex flex-wrap gap-1">
            {["Llamar", "WhatsApp", "Nueva tarea", "Nueva demanda"].map((b, i) => (
              <span key={b} className="rounded-[8px] border px-2 py-1 text-[11px]" style={{ borderColor: i === 2 ? "#fff" : "#333", background: i === 2 ? "#fff" : "transparent", color: i === 2 ? "#0A0A0A" : "#E5E5E5" }}>{b}</span>
            ))}
          </div>
          <span className="rounded-[8px] border border-[#2A2A2A] py-1.5 text-center text-[11px] text-grey6">Pasar a cliente</span>
          <div>
            <div className="text-[11px] text-grey5">Notas</div>
            <p className="m-0 mt-1 text-[11px] leading-snug text-grey6">El anuncio lleva una semana fuera. Quiere saber si hay ofertas antes de bajar el precio. Visita posible el jueves, con Ana.</p>
          </div>
          <div className="mt-auto grid grid-cols-2 gap-2 border-t border-[#1F1F1F] pt-2 text-[11px]">
            <span><span className="block text-grey5">Teléfono</span><span className="mono text-white7">644 902 221</span></span>
            <span><span className="block text-grey5">Email</span><span className="text-white7">iria@correo.es</span></span>
            <span className="col-span-2"><span className="block text-grey5">Dirección</span><span className="text-white7">Calle del Pez, 18 · Madrid</span></span>
          </div>
        </div>
      </div>
    </>
  );
}

function Herramientas() {
  const tiles = [
    ["Valorador de zona", "Precio medio por calle, con los anuncios de la semana."],
    ["Informe para el propietario", "Una página con la finca, el anuncio y el comercial."],
    ["Cruce demanda–stock", "Lo que encaja, antes de llamar."],
    ["Cartel y ficha", "Con el logotipo y los colores de la agencia."],
  ];
  return (
    <>
      <Head title="Herramientas" hint="Las utilidades de la agencia, dentro del CRM" />
      <div className="grid grid-cols-2 gap-2">
        {tiles.map(([t, d]) => (
          <div key={t} className="rounded-[10px] border border-[#262626] bg-[#141414] p-3">
            <div className="text-[13px] text-white8">{t}</div>
            <p className="m-0 mt-1 text-[12px] text-grey5">{d}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function Presupuestos() {
  const rows = [
    ["PRS-2026-0001", "Reforma Calle del Pez", "74.536 €", "enviado"],
    ["PRS-2026-0004", "Cocina · Posse", "18.200 €", "en negociación"],
    ["PRS-2026-0007", "Baño · Rianxiño", "6.480 €", "aceptado"],
  ];
  return (
    <>
      <Head title="Presupuestos" hint="Por partidas, en la ficha del piso" />
      <div className="mb-2 grid grid-cols-4 gap-1.5">
        {[["12", "Enviados"], ["3", "En negociación"], ["2", "Sin facturar"], ["68 %", "Aceptación"]].map(([n, l]) => (
          <div key={l} className="rounded-[8px] border border-[#222] bg-[#141414] px-2 py-1.5">
            <div className="text-[15px] text-white8">{n}</div>
            <div className="text-[10px] text-grey5">{l}</div>
          </div>
        ))}
      </div>
      {rows.map(([ref, title, total, st]) => (
        <div key={ref} className="grid grid-cols-[120px_minmax(0,1fr)_80px_110px] items-center gap-2 border-t border-[#1F1F1F] py-2 text-[12px]">
          <span className="mono text-[11px] text-grey5">{ref}</span>
          <span className="truncate text-white7">{title}</span>
          <span className="text-white8">{total}</span>
          <span className="text-grey6">{st}</span>
        </div>
      ))}
    </>
  );
}

function Facturas() {
  const rows = [
    ["FAC-2026-0001", "Reforma Calle del Pez", "16.200 €", "cobrada", "Ana"],
    ["FAC-2026-0003", "Honorarios Posse", "8.700 €", "pendiente", "Luis"],
    ["FAC-2026-0006", "Señal Rúa Barcelona", "3.000 €", "cobrada", "Marta"],
    ["FAC-2026-0008", "Informe catastro Oleiros", "420 €", "emitida", "Nora"],
  ];
  return (
    <>
      <Head title="Facturas" hint="Enlazadas al inmueble y al cliente" />
      {rows.map(([ref, title, total, st, who]) => (
        <div key={ref} className="grid grid-cols-[120px_minmax(0,1fr)_80px_80px_48px] items-center gap-2 border-t border-[#1F1F1F] py-2 text-[12px]">
          <span className="mono text-[11px] text-grey5">{ref}</span>
          <span className="truncate text-white7">{title}</span>
          <span className="text-white8">{total}</span>
          <span className={st === "cobrada" ? "text-green" : "text-grey5"}>{st}</span>
          <span className="text-grey6">{who}</span>
        </div>
      ))}
    </>
  );
}
