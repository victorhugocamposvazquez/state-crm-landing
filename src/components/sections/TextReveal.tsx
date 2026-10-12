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
 * La frase empieza a enfocarse mientras el bloque sube y termina con la pantalla pegada,
 * que aguanta un tramo ya nítida antes de soltarse.
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
          start: "top 60%",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });
      // cada palabra tarda 1.8 y la siguiente arranca 1 después: siempre hay una a medio enfocar
      tl.fromTo(ws, FROM, { ...TO, duration: 1.8, stagger: 1 }, 0)
        // ya nítida, aguanta un tramo antes de que la pantalla se despegue
        .to({}, { duration: Math.max(3, words.length * 0.35) });
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
