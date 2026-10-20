"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { transitions, type TransitionId } from "@/lib/transitions";
import { brandify } from "@/components/ui/atoms";

gsap.registerPlugin(ScrollTrigger);

const FROM = { opacity: 0.16, filter: "blur(14px)" };
const TO = { opacity: 1, filter: "blur(0px)" };

/**
 * Sección de transición: una frase grande que se revela palabra a palabra con el scroll.
 * Las palabras nacen desenfocadas y apagadas; al avanzar, cada una enfoca y pasa a blanco.
 * No empieza hasta que la frase está quieta en el centro, y aguanta un tramo ya nítida
 * antes de soltarse.
 */
export function TextReveal({ id }: { id: TransitionId }) {
  const ref = useRef<HTMLElement>(null);
  const text = transitions[id];
  const words = text.split(/\s+/);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const ws = Array.from(el.querySelectorAll<HTMLElement>(".w"));
      if (reduced) {
        gsap.set(ws, TO);
        return;
      }
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.6,
        },
      });
      // Una palabra cada vez, con la frase ya quieta en el centro. El tramo final
      // la deja entera y nítida antes de soltarla.
      tl.fromTo(ws, FROM, { ...TO, duration: 0.9, stagger: 1 }, 0).to(
        {},
        { duration: Math.max(2, words.length * 0.15) },
      );
    }, el);
    return () => ctx.revert();
  }, [text, words.length]);

  return (
    <section ref={ref} id={`transicion-${id}`} className="textreveal relative z-[2] bg-black0" aria-labelledby={`transicion-${id}-h`}>
      <div className="pin flex items-center justify-center gutter">
        <div className="mx-auto w-full max-w-[1040px] text-center">
          <p id={`transicion-${id}-h`} className="t-statement mx-auto my-0 text-white8">
            {words.map((w, i) => (
              <span key={`${i}-${w}`}>
                <span className="w" style={FROM}>
                  {brandify(w, true)}
                </span>{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
