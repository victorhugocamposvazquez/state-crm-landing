"use client";

import { Chapter } from "@/components/motion/Chapter";
import { Brand, Kicker } from "@/components/ui/atoms";
import { Prologo } from "./00-Prologo";

export function Radar() {
  return (
    <Chapter id="radar" className="hero-chapter">
      <div className="hero-layout">
        <div className="hero-copy">
          <Prologo />
          <Kicker module="CRM inmobiliario a medida" what="De la captación al cierre" />
          <h1 className="t-hero mt-7 mb-6 text-white8">Tu próxima captación.<br /><span className="text-grey6">El siguiente paso de tu agencia.</span></h1>
          <p className="t-lead max-w-[550px] text-grey6"><Brand /> reúne los anuncios de particulares en tus zonas y conecta inmuebles, clientes y tareas. Todo tu equipo, trabajando con la misma información.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#manana" className="btn btn-w">Pedir una demo <span aria-hidden="true">↗</span></a>
            <a href="#ciudad" className="btn btn-g">Ver cómo funciona <span aria-hidden="true">↓</span></a>
          </div>
          <p className="mt-5 text-[12px] text-grey6">Para tu agencia · Desde el navegador · También en móvil</p>
        </div>
        <div className="hero-signal" aria-hidden="true"><span className="hero-signal-line" /><span>Tu zona, bajo seguimiento</span><span className="text-grey6">Captación diaria de particulares</span></div>
        <div className="hero-index"><span className="text-grey6">Un solo lugar para</span><a href="#ciudad">Captar <span>01</span></a><a href="#seguimiento">Dar seguimiento <span>03</span></a><a href="#equipo">Coordinar <span>04</span></a><a href="#obra">Gestionar la obra <span>05</span></a></div>
      </div>
    </Chapter>
  );
}
