"use client";

import { useRef } from "react";
import { plans, planRows, planNotes } from "@/lib/plans";
import { Kicker } from "@/components/ui/atoms";
import { useReveal } from "@/components/motion/reveal";

function Tick({ on }: { on: boolean }) {
  return on ? (
    <span className="chk" aria-label="incluido">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  ) : (
    <span className="inline-block h-px w-[14px] bg-grey4" aria-label="no incluido" />
  );
}

/**
 * Planes: tres cuotas mensuales (Captación · Catastro · Completo) con lo que incluye cada una,
 * y debajo la tabla de qué módulo entra en qué plan. Los datos viven en src/lib/plans.ts.
 */
export function Planes() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="planes" className="relative z-[2] border-t border-[#171717] bg-black0 py-[80px] gutter md:py-[128px]" aria-labelledby="planes-h">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[760px]">
          <div data-reveal className="mb-6">
            <Kicker module="Planes" what="tres cuotas mensuales, según lo que use tu agencia" />
          </div>
          <h2 id="planes-h" data-reveal className="t-h1 m-0 text-white8">
            Un precio claro. Sin coste por usuario.
            <br />
            <span className="text-grey5">De 250 € al mes al plan completo, con todas las opciones.</span>
          </h2>
          <p data-reveal className="t-lead m-0 mt-6 max-w-[560px] text-grey6">
            Toda la agencia entra con la cuota. El plan Catastro es el recomendado: captar es el principio; saber qué finca es y pedir la nota simple sin salir del CRM es lo que cierra la captación.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
          {plans.map((p) => (
            <article
              key={p.id}
              data-reveal
              className="flex flex-col gap-6 rounded-[14px] border bg-black1 p-6 md:p-7"
              style={{ borderColor: p.highlight ? "#3A3A3A" : "#222222", boxShadow: p.highlight ? "0 30px 60px rgba(0,0,0,.5)" : "none" }}
            >
              <header className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className={`t-label ${p.highlight ? "text-green" : "text-grey5"}`}>{p.name}</span>
                  {p.badge && <span className="st st-g">{p.badge}</span>}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[40px] font-medium leading-none tracking-[-0.02em] text-white8">{p.price}</span>
                  <span className="mono text-[13px] text-grey5">{p.unit}</span>
                </div>
                <p className="t-body m-0 text-white7">{p.lead}</p>
              </header>

              <ul className="m-0 flex list-none flex-col gap-[14px] p-0">
                {p.items.map((it) => (
                  <li key={it.title} className="flex gap-3">
                    <span className="chk mt-[3px]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-[14px] font-medium text-white7">{it.title}</span>
                      <span className="text-[13px] leading-[1.5] text-grey6">{it.text}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <footer className="mt-auto">
                <a href="#manana" className={`btn w-full ${p.highlight ? "btn-w" : "btn-g"}`}>
                  Pedir una demo
                </a>
              </footer>
            </article>
          ))}
        </div>

        <ul data-reveal className="m-0 mt-5 flex list-none flex-col gap-1 p-0 text-[12px] leading-[1.6] text-grey5 md:flex-row md:gap-6">
          {planNotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>

        <div className="mt-14 md:mt-20">
          <h3 data-reveal className="t-h2 m-0 mb-5 text-white8">
            Qué entra en cada plan
          </h3>
          <div data-reveal className="overflow-x-auto rounded-[12px] border border-[#222222]">
            <table className="w-full min-w-[640px] border-collapse text-[14px]">
              <thead>
                <tr className="bg-black1 text-left">
                  <th scope="col" className="px-5 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-grey5">Módulo</th>
                  {plans.map((p) => (
                    <th key={p.id} scope="col" className={`w-[150px] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.12em] ${p.highlight ? "text-green" : "text-grey5"}`}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {planRows.map((r) => (
                  <tr key={r.module} className="border-t border-[#1F1F1F]">
                    <th scope="row" className="px-5 py-3 text-left font-normal text-white7">{r.module}</th>
                    {plans.map((p) => (
                      <td key={p.id} className="px-5 py-3">
                        <Tick on={r.in[p.id]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p data-reveal className="t-body m-0 mt-6 max-w-[600px] text-grey6">
            ¿No sabes qué plan te encaja? En la demo lo vemos con tu zona y te decimos qué módulos tienen sentido para tu agencia.
          </p>
        </div>
      </div>
    </section>
  );
}
