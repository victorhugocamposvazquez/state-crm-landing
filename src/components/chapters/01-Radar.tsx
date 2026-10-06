"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";

/**
 * 01 · El radar. Al llegar la pantalla, entra todo el bloque solo.
 * Los tres pasos cuelgan de un hilo: el pulso sigue recorriéndolo.
 */
export function Radar() {
  const ref = useRef<HTMLDivElement>(null);
  const chain = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (_tl, q, enter) => {
    enter.fromTo(q(".copy"), { opacity: 0 }, { opacity: 1, duration: 1 }, 0);
  });

  useEffect(() => {
    const root = ref.current;
    const el = chain.current;
    if (!root || !el) return;
    const q = gsap.utils.selector(root);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    if (reduced) {
      gsap.set(q(".step, .sub, .cta, .tag, .tag .ln, .rail"), { opacity: 1, y: 0, scaleX: 1, scaleY: 1 });
      gsap.set(q(".mark"), { opacity: 1, scale: 1 });
      el.classList.add("is-live");
      return;
    }

    gsap.set(q(".rail"), mobile ? { scaleY: 0, transformOrigin: "top center" } : { scaleX: 0, transformOrigin: "left center" });
    gsap.set(q(".step"), { opacity: 0, y: 8 });
    gsap.set(q(".mark"), { opacity: 0, scale: 0.4 });
    gsap.set(q(".sub, .cta"), { opacity: 0, y: 14 });
    gsap.set(q(".tag"), { opacity: 0, y: 8 });
    gsap.set(q(".tag .ln"), { scaleY: 0, transformOrigin: "bottom" });

    const tl = gsap.timeline({ paused: true });
    tl.to(q(".rail"), mobile ? { scaleY: 1, duration: 0.7, ease: "power2.inOut" } : { scaleX: 1, duration: 0.7, ease: "power2.inOut" })
      .to(q(".step"), { opacity: 1, y: 0, duration: 0.4, stagger: 0.16, ease: "power2.out" }, 0.2)
      .to(q(".mark"), { opacity: 1, scale: 1, duration: 0.35, stagger: 0.2, ease: "back.out(2.2)" }, "-=0.15")
      .add(() => el.classList.add("is-live"))
      .to(q(".sub"), { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.15")
      .to(q(".cta"), { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2")
      .to(q(".tag"), { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.15")
      .to(q(".tag .ln"), { scaleY: 1, duration: 0.3, ease: "power2.out" }, "<");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        tl.play();
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(root);

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
            Impulsa tu negocio inmobiliario.
          </h1>
          <div ref={chain} className="thread mt-7" aria-label="Más captación, más oportunidades, más ventas">
            <span className="rail" aria-hidden="true">
              <span className="pulse" />
            </span>
            <span className="step">
              <span className="dot" aria-hidden="true"><Check /></span>
              <span className="lbl">Más captación</span>
            </span>
            <span className="step">
              <span className="dot" aria-hidden="true"><Check /></span>
              <span className="lbl">más oportunidades</span>
            </span>
            <span className="step step-end">
              <span className="dot" aria-hidden="true"><Check /></span>
              <span className="lbl">Más ventas</span>
            </span>
          </div>
          <p className="sub t-lead mt-7 max-w-[560px] text-grey6" style={{ opacity: 0 }}>
            Nuevos anuncios de particulares, búsqueda de fincas y todo el proceso comercial: contactar, agendar, gestionar demandas y cerrar.
          </p>
          <div className="cta mt-8 flex flex-col gap-3 sm:flex-row" style={{ opacity: 0 }}>
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

        <div className="tag mono absolute bottom-[22%] right-[8%] flex flex-col items-start text-[11px] text-grey6 md:bottom-[26%] md:right-[18%]" style={{ opacity: 0 }}>
          <span className="ln mb-2 ml-[2px] block h-9 w-px origin-bottom bg-grey4" />
          <span>
            3º izquierda · 92 m² · <span className="text-green">publicado hace 0 min</span>
          </span>
        </div>

        </div>
      </div>
    </Chapter>
  );
}

function Check() {
  return (
    <span className="mark">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}
