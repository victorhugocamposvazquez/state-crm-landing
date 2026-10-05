"use client";

import { useRef } from "react";
import { Chapter, useScrollTimeline } from "@/components/motion/Chapter";
import { countTo } from "@/components/motion/count";
import { Kicker } from "@/components/ui/atoms";
import { MobileListingCards } from "@/components/crm/MobileListingCards";

/**
 * 02 · 07:40 · La ciudad se enciende. El 3D va en el canvas; aquí el texto, el contador y la leyenda.
 */
export function Ciudad() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollTimeline(ref, (tl, q, enter) => {
    // entrada: kicker y contador suben ya puestos con la pantalla. El primer titular (.t1) viene
    // visible de serie: tl lo apaga en 0.26 y una misma propiedad no debe vivir en dos timelines.
    enter.fromTo(q(".counter, .kick"), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0);

    tl.to(q(".t1"), { opacity: 0, y: -16, duration: 0.06 }, 0.26)
      .fromTo(q(".t2"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0.33)
      .to(q(".t2"), { opacity: 0, y: -16, duration: 0.06 }, 0.56)
      .fromTo(q(".t3"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0.63)
      .fromTo(q(".legend"), { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.12);
    countTo(tl, q(".n")[0], { from: 0, to: 38, at: 0.08, dur: 0.75 });
  });

  return (
    <Chapter id="ciudad">
      <div ref={ref} className="stagewrap">
        <div className="stageframe">
        <div className="copy copy-block md:w-[560px]">
          <div className="kick mb-5" style={{ opacity: 0 }}>
            <Kicker n="02" module="Captación" what="detecta los anuncios de particulares en los portales" />
          </div>
          <div className="relative h-[96px] md:h-[120px]">
            <h2 className="t1 t-h1 absolute m-0 text-white8">
              Un particular
              <br />
              <span className="text-grey5">publica su piso.</span>
            </h2>
            <h2 className="t2 t-h1 absolute m-0 text-white8" style={{ opacity: 0 }}>
              Un minuto después
              <br />
              <span className="text-grey5">está en tu CRM.</span>
            </h2>
            <h2 className="t3 t-h1 absolute m-0 text-white8" style={{ opacity: 0 }}>
              Toda la ciudad,
              <br />
              <span className="text-grey5">cada mañana.</span>
            </h2>
          </div>
        </div>

        <div className="counter mono absolute right-0 top-[var(--copy-top)] flex items-center gap-[10px] text-[13px] text-grey6 md:text-[12px]" style={{ opacity: 0 }}>
          <span className="h-[6px] w-[6px] rounded-full bg-green" style={{ boxShadow: "0 0 10px #22C55E" }} />
          captados_hoy <span className="n text-[16px] text-white8">0</span>
        </div>

        <MobileListingCards />

        <div className="legend mono absolute bottom-10 left-0 hidden flex-wrap gap-x-6 gap-y-2 text-[13px] text-grey6 md:flex" style={{ opacity: 0 }}>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white8" />
            nuevo anuncio
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green" />
            particular con teléfono
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber" />
            agencia encubierta
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-grey4" />
            ya en seguimiento
          </span>
        </div>
        </div>
      </div>
    </Chapter>
  );
}
