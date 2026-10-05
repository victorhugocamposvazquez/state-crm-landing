"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters, chapterIndex, type ChapterId } from "@/lib/script";
import { useScroll } from "@/lib/store";

gsap.registerPlugin(ScrollTrigger);

/**
 * Una sección alta (N vh) con una pantalla pegada arriba (sticky, no pin: iOS lo agradece).
 * Escribe su progreso 0–1 en el store para que la pizarra, la bandeja y el canvas lo lean.
 */
export function Chapter({
  id,
  children,
  className = "",
  opaque,
}: {
  id: ChapterId;
  children: React.ReactNode;
  className?: string;
  /** fondo negro propio (cubre al capítulo anterior al entrar); los capítulos que dejan ver el canvas 3D van transparentes */
  opaque?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const chapter = chapters[chapterIndex[id]];

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

  // Cada capítulo cubre al anterior: el siguiente empieza justo donde termina el tramo pegado del anterior,
  // así no hay un hueco de 100 vh en negro entre capítulo y capítulo. El último no se solapa con nada.
  const index = chapterIndex[id];
  const last = index === chapters.length - 1;
  const solid = opaque ?? index >= chapterIndex.catastro;
  return (
    <section
      ref={ref}
      id={id}
      data-chapter={id}
      className={`chapter ${className}`}
      style={{
        height: `calc(${chapter.vh} * var(--vh-unit, 1vh))`,
        marginBottom: last ? 0 : "calc(-1 * var(--stage-h, 100vh))",
        zIndex: index + 1,
      }}
    >
      <div className="stage" style={{ background: solid ? "#0A0A0A" : "transparent" }}>
        {children}
      </div>
    </section>
  );
}

/**
 * Timeline GSAP frotado por el scroll de la sección que contiene a `scope`.
 * `build(tl, q)` recibe la timeline (de 0 a 1 = todo el tramo) y un selector acotado al scope.
 */
export function useScrollTimeline(
  scope: RefObject<HTMLElement | null>,
  build: (tl: gsap.core.Timeline, q: gsap.utils.SelectorFunc) => void,
  deps: React.DependencyList = [],
) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const section = el.closest(".chapter") ?? el;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });
      build(tl, gsap.utils.selector(el));
      if (reduced) {
        // Modo estático: todo en su fotograma final.
        tl.progress(1).pause();
        tl.scrollTrigger?.kill();
      }
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
