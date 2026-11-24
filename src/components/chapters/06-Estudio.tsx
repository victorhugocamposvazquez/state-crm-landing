"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { scrollTo } from "@/components/providers/SmoothScroll";
import { ChapterCopy } from "@/components/ui/atoms";

const steps = ["Inmueble", "Diseño", "Editar", "Publicar"] as const;

const listings = [
  { title: "Calle del Pez, 18", meta: "92 m² · 3 dormitorios", price: "260.000 €", on: true },
  { title: "Plaza de Castilla, 5", meta: "140 m² · 4 dormitorios", price: "390.000 €", on: false },
  { title: "Calle de Posse, 9", meta: "78 m² · 2 dormitorios", price: "215.000 €", on: false },
] as const;

const formats = [
  { label: "Post", ratio: "4:5", on: true },
  { label: "Cuadrado", ratio: "1:1", on: false },
  { label: "Reel", ratio: "9:16", on: false },
  { label: "Historia", ratio: "9:16", on: false },
] as const;

const kinds = ["Nuevo inmueble", "Exclusiva", "Puertas abiertas", "Vendido"] as const;

const screens = [
  { step: 0, name: "Inmueble" },
  { step: 1, name: "Formato" },
  { step: 1, name: "Anuncio" },
  { step: 2, name: "Fotos" },
  { step: 2, name: "Pieza" },
  { step: 3, name: "Publicar" },
] as const;

/**
 * 06 · Estudio. Seis pantallas del estudio de creatividades.
 * En escritorio el scroll las cambia; en móvil se pasan con el carrusel.
 */
export function Estudio() {
  const ref = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [index, setIndex] = useState(0);
  const active = screens[index].step;

  useScrollTimeline(ref, (_tl, q, enter) => {
    enter.fromTo(q(".copy"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .fromTo(q(".studio"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9 }, 0.12);
  });

  useLayoutEffect(() => {
    const section = ref.current?.closest(".chapter");
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");

    const bind = () => {
      trigger.current?.kill();
      trigger.current = null;
      if (motion.matches || mobile.matches) return;
      trigger.current = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const next = Math.min(screens.length - 1, Math.floor(self.progress * screens.length));
          setIndex((cur) => (cur === next ? cur : next));
        },
      });
      const next = Math.min(screens.length - 1, Math.floor(trigger.current.progress * screens.length));
      setIndex(next);
    };

    bind();
    mobile.addEventListener("change", bind);
    motion.addEventListener("change", bind);
    return () => {
      mobile.removeEventListener("change", bind);
      motion.removeEventListener("change", bind);
      trigger.current?.kill();
    };
  }, []);

  const jump = (to: number) => {
    const next = Math.max(0, Math.min(screens.length - 1, to));
    const st = trigger.current;
    const touch = window.matchMedia("(max-width: 767px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!st || touch) {
      setIndex(next);
      return;
    }
    const y = st.start + (st.end - st.start) * ((next + 0.45) / screens.length);
    scrollTo(y, 0.55);
  };

  return (
    <Chapter id="estudio">
      <div ref={ref} className="stagewrap">
        <div className="stageframe">
          <div className="copy copy-block">
            <ChapterCopy
              n="06"
              module="Estudio"
              what="La ficha del piso, lista para publicarse en redes."
            />
          </div>

          <div className="visual-col flex items-start md:items-center">
            <div className="studio panel w-full p-4 md:p-5" style={{ opacity: 0 }}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-[15px] font-medium tracking-[-0.02em] text-white8">Estudio</span>
                <span className="mono text-[12px] text-grey5">Calle del Pez, 18</span>
              </div>

              <ol className="m-0 mb-3 flex list-none flex-wrap gap-x-3 gap-y-1 p-0 text-[11px]">
                {steps.map((step, i) => {
                  const on = i === active;
                  const done = i < active;
                  return (
                    <li key={step} className="flex items-center gap-1.5" style={{ color: on ? "#fff" : "#737373" }}>
                      <span
                        className="flex h-4 w-4 items-center justify-center rounded-full text-[9px]"
                        style={{
                          background: on ? "#fff" : "transparent",
                          color: on ? "#111" : done ? "#22C55E" : "#737373",
                          border: on ? "none" : `1px solid ${done ? "#22C55E" : "#3A3A3A"}`,
                        }}
                      >
                        {done ? "✓" : i + 1}
                      </span>
                      {step}
                    </li>
                  );
                })}
              </ol>

              <div className="relative h-[340px] overflow-hidden">
                <Screen on={index === 0}>
                  <ScreenTitle kicker="1 · Inmueble" title="Elige el inmueble" />
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {listings.map((item) => (
                      <li
                        key={item.title}
                        className="flex items-center gap-3 rounded-[10px] border px-3 py-2.5"
                        style={{ borderColor: item.on ? "#fff" : "#2A2A2A", background: item.on ? "#1C1C1C" : "transparent" }}
                      >
                        <span className="block h-10 w-14 shrink-0 bg-[#2A2A2A]" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] text-white8">{item.title}</span>
                          <span className="block text-[12px] text-grey5">{item.meta}</span>
                        </span>
                        <span className="text-[13px] text-white8">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </Screen>

                <Screen on={index === 1}>
                  <ScreenTitle kicker="2 · Diseño" title="Elige el formato" />
                  <div className="grid grid-cols-2 gap-2">
                    {formats.map((f) => (
                      <div
                        key={f.label}
                        className="rounded-[10px] border px-3 py-3"
                        style={{ borderColor: f.on ? "#fff" : "#2A2A2A", background: f.on ? "#1C1C1C" : "transparent" }}
                      >
                        <span className="block text-[14px] text-white8">{f.label}</span>
                        <span className="mono text-[12px] text-grey5">{f.ratio}</span>
                      </div>
                    ))}
                  </div>
                </Screen>

                <Screen on={index === 2}>
                  <ScreenTitle kicker="2 · Diseño" title="Elige el anuncio" />
                  <div className="mb-4 flex flex-wrap gap-2">
                    {kinds.map((k) => {
                      const on = k === "Nuevo inmueble";
                      return (
                        <span
                          key={k}
                          className="rounded-full border px-3 py-1 text-[12px]"
                          style={{
                            borderColor: on ? "#fff" : "#2A2A2A",
                            color: on ? "#fff" : "#A3A3A3",
                            background: on ? "#1C1C1C" : "transparent",
                          }}
                        >
                          {k}
                        </span>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Template name="Galería" on>
                      <div className="mb-1 aspect-[16/9] bg-[#3A3A3A]" />
                      <div className="grid grid-cols-2 gap-1">
                        <div className="aspect-[16/10] bg-[#333]" />
                        <div className="aspect-[16/10] bg-[#2E2E2E]" />
                      </div>
                    </Template>
                    <Template name="Portada">
                      <div className="aspect-[4/5] bg-[#3A3A3A]" />
                    </Template>
                    <Template name="Mosaico">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="aspect-square bg-[#3A3A3A]" />
                        <div className="aspect-square bg-[#333]" />
                        <div className="aspect-square bg-[#2E2E2E]" />
                        <div className="aspect-square bg-[#333]" />
                      </div>
                    </Template>
                  </div>
                </Screen>

                <Screen on={index === 3}>
                  <ScreenTitle kicker="3 · Editar" title="Elige las fotos" />
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 6 }, (_, i) => {
                      const picked = i < 3;
                      return (
                        <div key={i} className="relative aspect-[4/3] bg-[#2A2A2A]" style={{ outline: picked ? "1px solid #fff" : "none" }}>
                          <span className="mono absolute left-1.5 top-1.5 text-[10px] text-grey6">{i + 1}</span>
                          {i === 0 ? (
                            <span className="absolute bottom-1.5 left-1.5 text-[10px] text-white8">Principal</span>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </Screen>

                <Screen on={index === 4}>
                  <ScreenTitle kicker="3 · Editar" title="Pantalla 1 de 2" />
                  <PostCard />
                </Screen>

                <Screen on={index === 5}>
                  <ScreenTitle kicker="4 · Publicar" title="Pantalla 2 de 2" />
                  <div className="mx-auto flex h-[210px] w-full max-w-[220px] flex-col justify-end bg-[#2A2A2A] p-3">
                    <span className="text-center text-[11px] font-medium tracking-[0.16em] text-white8">
                      STATE<span className="text-[#8A8A8A]">CRM</span>
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-[12px]">
                    <span className="text-grey6">2 pantallas · Post 4:5</span>
                    <span className="flex gap-2">
                      <span className="rounded-full border border-[#3A3A3A] px-3 py-1 text-grey6">Descargar</span>
                      <span className="rounded-full bg-white px-3 py-1 font-medium text-[#111]">Publicar</span>
                    </span>
                  </div>
                </Screen>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  className="flex h-11 items-center px-2 text-[12px] text-grey6 disabled:opacity-30"
                  onClick={() => jump(index - 1)}
                  disabled={index === 0}
                >
                  Anterior
                </button>
                <div className="flex items-center gap-1" role="tablist" aria-label="Pantallas del estudio">
                  {screens.map((screen, i) => (
                    <button
                      key={screen.name}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`${i + 1}. ${screen.name}`}
                      className="flex h-11 w-6 items-center justify-center"
                      onClick={() => jump(i)}
                    >
                      <span
                        className="block h-1.5 rounded-full transition-[width,background] duration-300"
                        style={{ width: i === index ? 16 : 6, background: i === index ? "#fff" : "#3A3A3A" }}
                      />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="flex h-11 items-center px-2 text-[12px] text-grey6 disabled:opacity-30"
                  onClick={() => jump(index + 1)}
                  disabled={index === screens.length - 1}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}

function ScreenTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-3">
      <span className="mono block text-[11px] text-grey5">{kicker}</span>
      <span className="text-[15px] text-white8">{title}</span>
    </div>
  );
}

function Screen({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-300"
      style={{ opacity: on ? 1 : 0, pointerEvents: on ? "auto" : "none" }}
      aria-hidden={!on}
    >
      {children}
    </div>
  );
}

function Template({ name, on = false, children }: { name: string; on?: boolean; children: ReactNode }) {
  return (
    <div className="rounded-[10px] border p-2" style={{ borderColor: on ? "#fff" : "#2A2A2A" }}>
      {children}
      <span className="mt-1.5 block text-[11px]" style={{ color: on ? "#fff" : "#737373" }}>
        {name}
      </span>
    </div>
  );
}

function PostCard() {
  return (
    <div className="mx-auto w-full max-w-[200px] bg-[#F3F3F3] p-2 text-[#111]">
      <div className="mb-1 text-center text-[9px] font-medium tracking-[0.14em]">
        STATE<span className="text-[#8A8A8A]">CRM</span>
      </div>
      <div className="mb-1 aspect-[16/10] bg-[#D5D5D5]" />
      <div className="mb-1.5 grid grid-cols-2 gap-1">
        <div className="aspect-[16/8] bg-[#C8C8C8]" />
        <div className="aspect-[16/8] bg-[#BEBEBE]" />
      </div>
      <div className="border-y border-[#111] py-1.5 text-[12px] font-medium uppercase leading-[1.15] tracking-[-0.02em]">
        Piso en Calle del Pez
      </div>
      <div className="mt-1.5 flex items-end justify-between gap-2 text-[10px]">
        <span>
          <span className="block text-[12px] font-medium">92 m²</span>
          3 dormitorios
        </span>
        <span className="text-[13px] font-medium tracking-[-0.03em]">260.000 €</span>
      </div>
    </div>
  );
}
