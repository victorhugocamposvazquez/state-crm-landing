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
 *
 * Sin cortinillas: el stage entra/sale con autoAlpha en TODOS los capítulos. Mientras el
 * siguiente sube por el solapamiento (antes de `top top`) permanece invisible; no pinta
 * un rectángulo negro vacío encima del anterior.
 */
export function Chapter({
  id,
  children,
  className = "",
}: {
  id: ChapterId;
  children: React.ReactNode;
  className?: string;
  /** ignorado: se mantiene por compat; el fondo sólido lo decide el índice */
  opaque?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const chapter = chapters[chapterIndex[id]];
  const index = chapterIndex[id];
  const last = index === chapters.length - 1;
  const first = index === 0;
  // Del Catastro en adelante tapamos el canvas; el fundido evita que ese negro sea cortina
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

  useLayoutEffect(() => {
    const el = ref.current;
    const stage = stageRef.current;
    if (!el || !stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.set(stage, { autoAlpha: first ? 1 : 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      if (!first) {
        tl.fromTo(stage, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 0);
      }
      if (!last) {
        tl.to(stage, { autoAlpha: 0, duration: 0.05 }, 0.95);
      }

      if (reduced) {
        tl.progress(1).pause();
        tl.scrollTrigger?.kill();
        gsap.set(stage, { autoAlpha: 1 });
      }
    }, el);

    return () => ctx.revert();
  }, [id, first, last]);

  return (
    <section
      ref={ref}
      id={id}
      data-chapter={id}
      className={`chapter ${className}`}
      style={{
        height: `calc(${chapter.vh} * var(--vh-unit, 1vh))`,
        marginBottom: last ? 0 : "calc(-1 * var(--stage-h))",
        zIndex: index + 1,
      }}
    >
      <div
        ref={stageRef}
        className="stage"
        style={{ background: solid ? "var(--black0)" : "transparent" }}
      >
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
        tl.progress(1).pause();
        tl.scrollTrigger?.kill();
      }
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
