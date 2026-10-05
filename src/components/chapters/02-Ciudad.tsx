"use client";

import { Chapter } from "@/components/motion/Chapter";
import { Kicker } from "@/components/ui/atoms";
import { CityPhoto } from "@/components/canvas/CityPhoto";
import { MobileListingCards } from "@/components/crm/MobileListingCards";
import { cityPhoto, citySequence } from "@/lib/script";
import { useScroll } from "@/lib/store";

export function Ciudad() {
  const progress = useScroll((state) => state.reducedMotion ? 1 : state.progress.ciudad);
  const ready = progress >= citySequence.notificationAt;
  const lit = cityPhoto.buildings.filter((_, index) => progress >= citySequence.lightAt(index) + citySequence.lightDuration).length;
  return (
    <Chapter id="ciudad" className="city-chapter">
      <div className="city-layout">
        <div className="city-copy">
          <Kicker n="01" module="Captación" what="Del portal a tu equipo" />
          <h2 className="t-h1 mt-6 mb-5 text-white8">La ciudad se mueve.<br /><span className="text-grey6">Tu próxima oportunidad, también.</span></h2>
          <p className="t-lead city-intro text-grey6">STATECRM revisa los portales en tus zonas. Detecta los anuncios nuevos y los reúne para que tu equipo pueda actuar.</p>
          <ol className="city-steps" aria-label="Cómo llega un anuncio">
            <li data-active={!ready}><span>01</span><div><strong>Los edificios se iluminan</strong><p>Cada luz representa un anuncio nuevo.</p></div></li>
            <li data-active={ready}><span>02</span><div><strong>La oportunidad llega al CRM</strong><p>Con los datos del anuncio y una persona responsable.</p></div></li>
          </ol>
          <a className="city-next" href="#bandeja">Ver la bandeja de captación <span aria-hidden="true">↗</span></a>
        </div>
        <div className="city-scene" role="group" aria-label="Ejemplo de detección de anuncios">
          <CityPhoto progress={progress} />
          <div className="city-scene-header"><span className="t-label">Explorando tu zona</span><span>Ejemplo ilustrativo</span></div>
          <div className="city-scan-status" aria-hidden="true">
            <span className={`city-status-dot ${ready ? "is-ready" : ""}`} />
            <span>{ready ? "Anuncio listo para tu equipo" : lit === 4 ? "Preparando la ficha…" : `${lit} de 4 edificios iluminados`}</span>
            <span className="city-scroll-hint">{ready ? "✓" : "↓"}</span>
          </div>
          <MobileListingCards visible={ready} />
          <div className="city-progress" aria-hidden="true"><span style={{ transform: `scaleX(${Math.min(1, progress / citySequence.notificationAt)})` }} /></div>
        </div>
        <p className="sr-only">Al recorrer la sección se iluminan cuatro edificios, uno a uno. Después aparece un anuncio de ejemplo: casa en Camino Rianxiño, 115, por 260.000 euros, asignada a Ana.</p>
      </div>
    </Chapter>
  );
}
