"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { countTo } from "@/components/motion/count";
import { Kicker } from "@/components/ui/atoms";
import { MobileListingCards } from "@/components/crm/MobileListingCards";

/**
 * 02 · 07:40 · La ciudad se enciende.
 * Un titular que cambia con el scroll; el canvas y las tarjetas cuentan el resto.
 */
export function Ciudad() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q) => {
    tl.fromTo(q(".counter, .kick"), { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0)
      .fromTo(q(".t1"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0.02)
      .to(q(".t1"), { opacity: 0, y: -16, duration: 0.06 }, 0.26)
      .fromTo(q(".t2"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0.33)
      .to(q(".t2"), { opacity: 0, y: -16, duration: 0.06 }, 0.56)
      .fromTo(q(".t3"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0.63)
      .to(q(".copy, .counter"), { opacity: 0.4, duration: 0.1 }, 0.92);
    countTo(tl, q(".n")[0], { from: 0, to: 38, at: 0.08, dur: 0.75 });
  });

  return (
    <Chapter id="ciudad">
      <div ref={ref} className="relative h-full gutter">
        <div className="copy absolute left-[var(--gutter)] top-[112px] max-w-[420px] md:top-[128px]">
          <div className="kick mb-5" style={{ opacity: 0 }}>
            <Kicker module="Captación" what="anuncios de particulares, cada mañana" />
          </div>
          <div className="relative h-[110px] md:h-[130px]">
            <h2 className="t1 display absolute m-0 text-[32px] text-white8 md:text-[40px]">
              07:40.
              <br />
              <span className="text-grey5">Él publica.</span>
            </h2>
            <h2 className="t2 display absolute m-0 text-[32px] text-white8 md:text-[40px]" style={{ opacity: 0 }}>
              07:41.
              <br />
              <span className="text-grey5">Ya está en tu CRM.</span>
            </h2>
            <h2 className="t3 display absolute m-0 text-[32px] text-white8 md:text-[40px]" style={{ opacity: 0 }}>
              Toda la ciudad,
              <br />
              <span className="text-grey5">cada mañana.</span>
            </h2>
          </div>
        </div>

        <div className="counter mono absolute right-[var(--gutter)] top-[76px] flex items-center gap-[10px] text-[11px] text-grey5 md:top-[84px] md:text-[12px]" style={{ opacity: 0 }}>
          <span className="h-[6px] w-[6px] rounded-full bg-green" style={{ boxShadow: "0 0 10px #22C55E" }} />
          captados_hoy <span className="n text-[16px] text-white8">0</span>
        </div>

        <MobileListingCards />
      </div>
    </Chapter>
  );
}
