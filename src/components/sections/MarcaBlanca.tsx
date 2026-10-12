const points = [
  { title: "Tu logotipo", text: "En la cabecera, en el acceso del equipo y en los PDF que salen del CRM." },
  { title: "Tus colores", text: "Botones, avisos y el anillo de la marca, en la paleta de la agencia." },
  { title: "Tu dominio", text: "El equipo entra en una dirección vuestra. La nuestra no aparece." },
];

/**
 * Marca blanca, en el plan Completo. Sección estática: el panel enseña
 * cómo queda el CRM con el logotipo y el color de la agencia.
 */
export function MarcaBlanca() {
  return (
    <section id="marca" className="relative z-[2] border-t border-[#171717] bg-black0 py-[80px] md:py-[128px]" aria-labelledby="marca-h">
      <div className="mx-auto grid w-full max-w-[var(--content-max)] grid-cols-1 items-center gap-12 px-[var(--gutter)] md:grid-cols-2 md:gap-16">
        <div>
          <h2 id="marca-h" className="t-h1 m-0 text-white8">
            El CRM, con tu marca.
          </h2>
          <p className="t-lead m-0 mt-6 max-w-[460px] text-grey6">
            En el plan Completo el equipo trabaja dentro de la agencia: vuestro logotipo, vuestros colores y vuestro dominio.
          </p>
          <ul className="m-0 mt-10 flex list-none flex-col gap-6 p-0">
            {points.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="chk mt-[2px]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[15px] font-medium leading-[1.35] text-white7">{p.title}</span>
                  <span className="text-[14px] leading-[1.55] text-grey6">{p.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-[#1F1F1F] px-5 py-4 md:px-6">
            <span className="inline-flex items-center gap-3">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <circle cx="14" cy="14" r="10" stroke="#C4A574" strokeWidth="3" />
                <path d="M14 4a10 10 0 0 1 10 10" stroke="#F3E6C8" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span className="text-[18px] font-medium tracking-[-0.03em] text-white8">norte</span>
            </span>
            <span className="text-[12px] text-grey5">agencia.norte.es</span>
          </div>
          <div className="h-[3px]" style={{ background: "#C4A574" }} />

          <div className="flex flex-col gap-3 px-5 py-6 md:px-6">
            <div className="flex items-center justify-between rounded-[10px] border border-[#222222] bg-black2 px-4 py-3">
              <span className="text-[13px] text-white7">Nuevo anuncio de particular</span>
              <span className="h-2 w-2 rounded-full" style={{ background: "#C4A574" }} />
            </div>
            <div className="flex items-center justify-between rounded-[10px] border border-[#1F1F1F] px-4 py-3">
              <span className="text-[13px] text-grey6">Visita concertada · jueves 13:00</span>
              <span className="h-2 w-2 rounded-full bg-grey4" />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-[12px] text-grey5">Tus colores</span>
              <span className="h-4 w-4 rounded-full" style={{ background: "#C4A574" }} />
              <span className="h-4 w-4 rounded-full" style={{ background: "#F3E6C8" }} />
              <span className="h-4 w-4 rounded-full border border-[#3A3A3A] bg-black0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
