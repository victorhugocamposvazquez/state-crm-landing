"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

type Mode = "entrar" | "registro";

const field =
  "min-h-[46px] w-full rounded-[8px] border border-grey3 bg-black1 px-[14px] text-[14px] text-white7 placeholder:text-grey5";

/**
 * Acceso: entrar o crear la cuenta de la agencia.
 * Misma superficie, mismos campos y el mismo botón blanco que el formulario de la demo.
 */
export function Entrar() {
  const [mode, setMode] = useState<Mode>("entrar");
  const [sent, setSent] = useState(false);

  const pick = (next: Mode) => {
    setMode(next);
    setSent(false);
  };

  return (
    <div className="relative flex min-h-svh flex-col">
      <header className="flex h-[72px] items-center justify-end px-[var(--edge)]">
        <Link href="/#planes" className="btn btn-line !min-h-[38px] px-3 md:px-[18px]">
          Planes
        </Link>
      </header>

      <main className="relative flex flex-1 flex-col items-center px-[var(--gutter)] pb-16 pt-8 md:pt-16">
        <div className="halo" style={{ left: "50%", top: 80, width: 720, height: 520, transform: "translate(-50%, 0)" }} />

        <div className="relative flex w-full max-w-[440px] flex-col">
          <Link href="/" aria-label="statecrm, volver al inicio" className="mb-8 inline-flex no-underline">
            <Logo />
          </Link>
          <h1 className="t-h2 m-0 text-white8">{mode === "entrar" ? "Entra en tu agencia." : "Crea tu cuenta."}</h1>
          <p className="t-lead m-0 mt-3 text-grey5">{mode === "entrar" ? "El acceso de tu equipo." : "La agencia entra junta."}</p>

          <div className="mt-8 flex gap-6" role="tablist" aria-label="Acceso">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "entrar"}
              onClick={() => pick("entrar")}
              className={`cursor-pointer border-0 bg-transparent p-0 text-[14px] font-medium ${mode === "entrar" ? "text-white8" : "text-grey5"}`}
            >
              Entrar
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "registro"}
              onClick={() => pick("registro")}
              className={`cursor-pointer border-0 bg-transparent p-0 text-[14px] font-medium ${mode === "registro" ? "text-white8" : "text-grey5"}`}
            >
              Registrarse
            </button>
          </div>

          <form
            className="mt-8 grid grid-cols-1 gap-[10px]"
            action="#"
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {sent ? (
              <p className="t-body m-0 text-white8" role="status">
                {mode === "entrar"
                  ? "Si la cuenta existe, te escribimos hoy para darte acceso."
                  : "Recibido. Te abrimos el acceso y te escribimos hoy."}
              </p>
            ) : mode === "entrar" ? (
              <>
                <label htmlFor="email" className="t-small text-grey6">
                  Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="tu@agencia.es" className={field} />
                <label htmlFor="password" className="t-small mt-2 text-grey6">
                  Contraseña
                </label>
                <input id="password" name="password" type="password" required autoComplete="current-password" minLength={8} placeholder="Tu contraseña" className={field} />
                <button type="submit" className="btn btn-w mt-3">
                  Entrar
                </button>
              </>
            ) : (
              <>
                <label htmlFor="nombre" className="t-small text-grey6">
                  Nombre y agencia
                </label>
                <input id="nombre" name="nombre" type="text" required autoComplete="name" placeholder="Tu nombre" className={field} />
                <input id="agencia" name="agencia" type="text" required autoComplete="organization" placeholder="Agencia y ciudad" aria-label="Agencia y ciudad" className={field} />
                <label htmlFor="email" className="t-small mt-2 text-grey6">
                  Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="tu@agencia.es" className={field} />
                <label htmlFor="password" className="t-small mt-2 text-grey6">
                  Contraseña
                </label>
                <input id="password" name="password" type="password" required autoComplete="new-password" minLength={8} placeholder="Ocho caracteres como mínimo" className={field} />
                <button type="submit" className="btn btn-w mt-3">
                  Crear cuenta
                </button>
                <span className="mono text-[13px] text-grey6">sin compromiso · respondemos en el día</span>
              </>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
