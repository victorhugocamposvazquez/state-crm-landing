"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";

/**
 * 01 · El radar. El titular entra con la pantalla.
 * La cadena «captación → oportunidades → ventas» se escribe sola, sin scroll.
 */
export function Radar() {
  const ref = useRef<HTMLDivElement>(null);
  const chain = useRef<HTMLSpanElement>(null);

  useScrollTimeline(ref, (tl, q, enter) => {
    enter.fromTo(q(".copy"), { opacity: 0 }, { opacity: 1, duration: 1 }, 0);

    tl.fromTo(q(".sub"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.2)
      .fromTo(q(".cta"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.2 }, 0.28)
      .fromTo(q(".tag"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.15 }, 0.55)
      .fromTo(q(".tag .ln"), { scaleY: 0 }, { scaleY: 1, duration: 0.1, transformOrigin: "bottom" }, 0.5);
  });

  useEffect(() => {
    const el = chain.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(q(".beat, .arrow, .tick"), { opacity: 1, y: 0, scale: 1, scaleX: 1 });
      return;
    }

    gsap.set(q(".beat"), { opacity: 0, y: 10 });
    gsap.set(q(".arrow"), { opacity: 0, scaleX: 0, transformOrigin: "left center" });
    gsap.set(q(".tick"), { opacity: 0, scale: 0.5 });

    const tl = gsap.timeline({ paused: true });
    tl.to(q(".beat-1"), { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
      .to(q(".arrow-1"), { opacity: 1, scaleX: 1, duration: 0.28, ease: "power2.out" }, "+=0.15")
      .to(q(".beat-2"), { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "+=0.08")
      .to(q(".arrow-2"), { opacity: 1, scaleX: 1, duration: 0.28, ease: "power2.out" }, "+=0.15")
      .to(q(".beat-3"), { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "+=0.08")
      .to(q(".tick"), { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.2)" }, "+=0.1");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        tl.play();
        io.disconnect();
      },
      { threshold: 0.5 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      tl.kill();
    };
  }, []);

  return (
    <Chapter id="radar">
      <div ref={ref} className="stagewrap">
        <div className="stageframe">
        <div className="halo" style={{ right: "-10%", bottom: "-20%", width: 900, height: 700 }} />

        <div className="copy absolute left-0 top-[40%] w-full max-w-[860px] -translate-y-1/2 md:top-[46%]" style={{ opacity: 0 }}>
          <h1 className="t-hero m-0 text-white8">
            <span className="block">Impulsa tu negocio inmobiliario.</span>
            <span
              ref={chain}
              className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[clamp(22px,1.1rem+1vw,34px)] font-medium leading-[1.25] tracking-[-0.03em] text-grey5"
              aria-label="Más captación, más oportunidades, más ventas"
            >
              <span className="beat beat-1 whitespace-nowrap">Más captación</span>
              <Arrow className="arrow arrow-1" />
              <span className="beat beat-2 whitespace-nowrap">más oportunidades</span>
              <Arrow className="arrow arrow-2" />
              <span className="beat beat-3 whitespace-nowrap text-white8">Más ventas</span>
              <span className="tick chk !h-7 !w-7" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            </span>
          </h1>
          <p className="sub t-lead mt-7 max-w-[560px] text-grey6">
            Multiplica lo que capta tu agencia con un CRM que sabe, cada mañana, qué han publicado los particulares,
            qué fincas hay en cada calle y qué cliente las está buscando.
          </p>
          <div className="cta mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#proceso" className="btn btn-w">
              Ver cómo funciona
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#manana" className="btn btn-g">
              Pedir una demo
            </a>
          </div>
        </div>

        {/* etiqueta de la ventana que se enciende */}
        <div className="tag mono absolute bottom-[22%] right-[8%] flex flex-col items-start text-[11px] text-grey6 md:bottom-[26%] md:right-[18%]" style={{ opacity: 0 }}>
          <span className="ln mb-2 ml-[2px] block h-9 w-px bg-grey4" />
          <span>
            3º izquierda · 92 m² · <span className="text-green">publicado hace 0 min</span>
          </span>
        </div>

        </div>
      </div>
    </Chapter>
  );
}

function Arrow({ className }: { className: string }) {
  return (
    <svg className={`${className} h-[14px] w-7 shrink-0`} viewBox="0 0 32 14" fill="none" aria-hidden="true">
      <path d="M0 7h26M20 1.5 26.5 7 20 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
