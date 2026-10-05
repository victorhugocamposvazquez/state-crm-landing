"use client";

import { useState, type FormEvent } from "react";
import { Brand, Kicker } from "@/components/ui/atoms";

// Public destinations are supplied by the owner; no request is marked sent locally.
const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL;
const bookingUrl = process.env.NEXT_PUBLIC_DEMO_URL;
const privacyUrl = process.env.NEXT_PUBLIC_PRIVACY_URL;
const legalUrl = process.env.NEXT_PUBLIC_LEGAL_URL;

export function Manana() {
  const [prepared, setPrepared] = useState(false);
  const available = Boolean(demoEmail);

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!demoEmail) return;
    const data = new FormData(event.currentTarget);
    const body = `Hola, me gustaría conocer STATECRM.\n\nNombre: ${data.get("nombre")}\nAgencia: ${data.get("agencia")}\nEmail: ${data.get("email")}\nZona: ${data.get("zona")}\n\n${data.get("mensaje") || ""}`;
    window.location.href = `mailto:${demoEmail}?subject=${encodeURIComponent("Solicitud de demo de STATECRM")}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }

  return (
    <section id="manana" className="relative z-[2] border-t border-grey3 bg-black0 pt-16 md:pt-24" aria-labelledby="demo-h">
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--gutter)]">
        <div className="demo-layout">
          <div>
            <Kicker module="Hablemos de tu agencia" what="Una demo con contexto" />
            <h2 id="demo-h" className="t-h1 mb-6 mt-6 text-white8">La próxima oportunidad.<br /><span className="text-grey6">Con un equipo preparado.</span></h2>
            <p className="t-lead max-w-[460px] text-grey6">Te enseñamos cómo encaja <Brand /> en tu día a día: desde los anuncios de tu zona hasta las tareas de cada comercial.</p>
            <ul className="m-0 mt-8 flex list-none flex-col gap-4 p-0 text-[14px] text-white7">
              <li><span className="mr-3 text-grey6">01</span>Nos cuentas cómo trabaja tu agencia.</li>
              <li><span className="mr-3 text-grey6">02</span>Recorremos los módulos que necesitas.</li>
              <li><span className="mr-3 text-grey6">03</span>Vemos juntos la puesta en marcha.</li>
            </ul>
            <p className="mt-8 text-[13px] text-grey6">30 minutos · Sin compromiso</p>
          </div>
          <div className="panel p-5 sm:p-7">
            {bookingUrl ? (
              <div className="flex h-full flex-col justify-center gap-6">
                <h3 className="t-h2 m-0 text-white8">Encuentra un momento para verlo.</h3>
                <p className="t-body m-0 text-grey6">Elige el horario que te venga bien y cuéntanos en qué zona trabajas.</p>
                <a className="btn btn-w" href={bookingUrl}>Elegir horario <span aria-hidden="true">↗</span></a>
              </div>
            ) : (
              <form onSubmit={prepareEmail} className="demo-form" aria-describedby="demo-help">
                <label>Tu nombre<input name="nombre" autoComplete="name" placeholder="Nombre y apellidos" required disabled={!available} /></label>
                <label>Agencia<input name="agencia" autoComplete="organization" placeholder="Nombre de la agencia" required disabled={!available} /></label>
                <label className="col-span-full">Email profesional<input name="email" type="email" autoComplete="email" placeholder="tu@agencia.es" required disabled={!available} /></label>
                <label className="col-span-full">Ciudad o zona<input name="zona" autoComplete="address-level2" placeholder="¿Dónde trabajáis?" required disabled={!available} /></label>
                <label className="col-span-full">¿Qué te gustaría mejorar? <span className="sr-only">Opcional</span><textarea name="mensaje" rows={3} placeholder="Opcional: captación, equipo, seguimiento…" disabled={!available} /></label>
                <button type="submit" className="btn btn-w col-span-full" disabled={!available}>Pedir una demo <span aria-hidden="true">↗</span></button>
                <p id="demo-help" className="col-span-full m-0 text-[12px] leading-relaxed text-grey6">{available ? "Se abrirá tu aplicación de correo con la solicitud preparada. Podrás revisarla antes de enviarla." : "Las solicitudes online estarán disponibles próximamente."}</p>
                {prepared && <p role="status" className="col-span-full m-0 text-[13px] text-white7">Solicitud preparada. Completa el envío desde tu aplicación de correo. {demoEmail && <a className="underline" href={`mailto:${demoEmail}`}>También puedes escribirnos directamente.</a>}</p>}
              </form>
            )}
          </div>
        </div>
        <footer className="site-footer">
          <Brand wordmark /><span>CRM inmobiliario a medida · España</span>
          <div className="flex flex-wrap gap-6">
            {privacyUrl && <a href={privacyUrl}>Privacidad</a>}
            {legalUrl && <a href={legalUrl}>Aviso legal</a>}
            <a href="#radar">Volver al inicio <span className="ml-2" aria-hidden="true">↑</span></a>
          </div>
        </footer>
      </div>
    </section>
  );
}
