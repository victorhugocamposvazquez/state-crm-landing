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
  // Only the hero reveals the decorative canvas.
  const solid = id !== "radar";

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { setProgress, setActive, setPinned, setOnScreen } = useScroll.getState();
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: () => `+=${Math.max(1, el.offsetHeight - window.innerHeight)}`,
      onUpdate: (self) => setProgress(id, self.progress),
      onToggle: (self) => {
        if (self.isActive) setActive(id);
        setPinned(id, self.isActive);
      },
      // al cargar a media página (o tras un resize) el estado real sale del refresh, no de un toggle;
      // dentro de onRefresh `isActive` aún no está al día, así que se mira la posición del scroll
      onRefresh: (self) => {
        setProgress(id, self.progress);
        const y = self.scroll();
        const on = y >= self.start && y <= self.end;
        setPinned(id, on);
        if (on) setActive(id);
      },
    });
    // la sección toca el viewport: desde que su borde superior asoma por abajo hasta que el inferior sale por arriba
    const vis = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => setOnScreen(id, self.isActive),
      onRefresh: (self) => {
        const y = self.scroll();
        setOnScreen(id, y >= self.start && y <= self.end);
      },
    });
    return () => {
      st.kill();
      vis.kill();
      setPinned(id, false);
      setOnScreen(id, false);
    };
  }, [id]);

  return (
    <section
      ref={ref}
      id={id}
      data-chapter={id}
      className={`chapter ${id === "ciudad" ? "" : "standard-chapter"} ${className}`}
      style={{ height: `calc(${chapter.vh} * var(--vh-unit, 1vh))` }}
    >
      <div className="stage" style={{ background: solid ? "var(--black0)" : "transparent" }}>
        {children}
        {/* las notificaciones, en las esquinas del contenedor centrado, no de la pantalla */}
        <div className="chapter-notifications pointer-events-none absolute inset-0 z-20" aria-hidden="true">
          <div className="stagewrap">
            <ChapterToasts id={id} />
          </div>
        </div>
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
    const media = gsap.matchMedia();
    media.add({
      compact: "(max-width: 1099px), (max-height: 740px)",
      reduced: "(prefers-reduced-motion: reduce)",
      wide: "(min-width: 1100px)",
    }, (context) => {
      const still = context.conditions?.compact || context.conditions?.reduced;
      const enter = gsap.timeline({
        paused: !!still,
        defaults: { ease: "power3.out" },
        ...(!still && { scrollTrigger: { trigger: section, start: "top bottom", end: "top 65%", scrub: 0.35 } }),
      });
      const tl = gsap.timeline({
        paused: !!still,
        defaults: { ease: "power3.out" },
        ...(!still && { scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.35 } }),
      });
      build(tl, gsap.utils.selector(el), enter);
      if (still) {
        enter.progress(1);
        tl.progress(1);
      }
      return () => { enter.kill(); tl.kill(); };
    }, el);
    return () => media.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
