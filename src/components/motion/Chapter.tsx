"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters, chapterIndex, type ChapterId } from "@/lib/script";
import { useScroll } from "@/lib/store";
import { ChapterToasts } from "./ChapterToasts";

gsap.registerPlugin(ScrollTrigger);

/**
 * Una sección alta (N vh) con una pantalla pegada arriba (sticky, no pin: iOS lo agradece).
 * Escribe su progreso 0–1 en el store para que la pizarra, las notificaciones y el canvas lo lean.
 *
 * Sin transición entre capítulos. Las secciones van una detrás de otra en el flujo normal
 * de la página: cuando un capítulo agota su tramo, su pantalla se despega y sube con el
 * scroll mientras la del siguiente entra por abajo, como en cualquier web. Ni fundidos, ni
 * solapes, ni cortinillas: los únicos efectos son los de cada capítulo (ver useScrollTimeline).
 */
export function Chapter({
  id,
  children,
  className = "",
}: {
  id: ChapterId;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const chapter = chapters[chapterIndex[id]];
  const index = chapterIndex[id];
  // Del Catastro en adelante el canvas 3D ya no cuenta nada: fondo sólido por si sigue encendido
  const solid = index >= chapterIndex.catastro;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { setProgress, setActive } = useScroll.getState();
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setProgress(id, self.progress),
      onToggle: (self) => self.isActive && setActive(id),
    });
    return () => st.kill();
  }, [id]);

  return (
    <section
      ref={ref}
      id={id}
      data-chapter={id}
      className={`chapter ${className}`}
      style={{ height: `calc(${chapter.vh} * var(--vh-unit, 1vh))` }}
    >
      <div className="stage" style={{ background: solid ? "var(--black0)" : "transparent" }}>
        {children}
        <ChapterToasts id={id} />
      </div>
    </section>
  );
}

/**
 * Timelines GSAP frotadas por el scroll de la sección que contiene a `scope`.
 * `build(tl, q, enter)` recibe:
 *  - `tl`    · de 0 a 1 = todo el tramo pegado (de `top top` a `bottom bottom`). Aquí va el guion del capítulo.
 *  - `q`     · selector acotado al scope.
 *  - `enter` · de 0 a 1 = la entrada de la pantalla, mientras sube desde el borde inferior hasta
 *              media pantalla. Aquí van los beats de aparición (el copy, el panel principal) para que
 *              el capítulo llegue ya compuesto y no entre como un rectángulo vacío.
 * Regla: una misma propiedad de un mismo elemento no se anima en `enter` y en `tl` a la vez (los dos
 * scrubs se solapan medio segundo y el último en pintar gana). Lo que `tl` vaya a apagar después,
 * que nazca visible en el JSX en vez de encenderse en `enter`.
 */
export function useScrollTimeline(
  scope: RefObject<HTMLElement | null>,
  build: (tl: gsap.core.Timeline, q: gsap.utils.SelectorFunc, enter: gsap.core.Timeline) => void,
  deps: React.DependencyList = [],
) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const section = el.closest(".chapter") ?? el;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const enter = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 50%",
          scrub: 0.5,
        },
      });
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });
      build(tl, gsap.utils.selector(el), enter);
      if (reduced) {
        for (const t of [enter, tl]) {
          t.progress(1).pause();
          t.scrollTrigger?.kill();
        }
      } else if (!enter.duration()) {
        // capítulo sin beats de entrada (el prólogo): no dejamos un trigger vacío vivo
        enter.scrollTrigger?.kill();
      }
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
