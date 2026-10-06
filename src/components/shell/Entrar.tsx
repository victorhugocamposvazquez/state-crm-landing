"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "./Logo";

type Mode = "entrar" | "registro" | "recuperar";

const field =
  "min-h-[46px] w-full rounded-[8px] border border-grey3 bg-black1 px-[14px] text-[14px] text-white7 placeholder:text-grey5";

const socialBtn =
  "inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-grey4 bg-black0 px-3 text-[14px] font-medium text-white8 hover:border-grey6";

function appleNow() {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const platform = nav.userAgentData?.platform || nav.platform || "";
  const ua = nav.userAgent || "";
  const touchMac = nav.maxTouchPoints > 1 && /Mac/i.test(platform);
  return /iPhone|iPad|iPod|Macintosh|Mac OS/i.test(ua) || /Mac/i.test(platform) || touchMac;
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.3 35.1 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.5 5.7-6.6 7.1l6.3 5.3C37.4 38.4 44 33 44 24c0-1.2-.1-2.3-.4-3.5z" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg width="16" height="18" viewBox="0 0 14 17" fill="currentColor" aria-hidden="true">
      <path d="M13.2 5.7c-.1.1-1.6.9-1.6 2.8 0 2.2 1.9 2.9 2 3-.1.1-.3 1.1-1 2.1-.6.9-1.3 1.8-2.3 1.8s-1.3-.6-2.4-.6-1.5.6-2.4.6-1.8-1-2.4-1.9C1.6 12 1 9.9 1 8c0-2.5 1.6-3.8 3.2-3.8 1 0 1.8.7 2.4.7.6 0 1.6-.8 2.8-.7.5 0 1.8.2 2.6 1.5zM9.6 2.8c.5-.6.8-1.4.7-2.3-.7 0-1.6.5-2.1 1.1-.5.5-.9 1.4-.8 2.2.8.1 1.6-.4 2.2-1z" />
    </svg>
  );
}

/**
 * Acceso: entrar, crear la cuenta o recuperar la contraseña.
 * Google en cualquier dispositivo; Apple solo si el aparato es de Apple.
 * En Android el equivalente es Google: no hay un acceso «con Android».
 */
export function Entrar() {
  const router = useRouter();
  const apple = useSyncExternalStore(() => () => {}, appleNow, () => false);
  const [mode, setMode] = useState<Mode>("entrar");
  const [sent, setSent] = useState(false);
  const [provider, setProvider] = useState<"Google" | "Apple" | null>(null);

  const pick = (next: Mode) => {
    setMode(next);
    setSent(false);
    setProvider(null);
  };

  const close = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  const title = mode === "registro" ? "Crea tu cuenta" : mode === "recuperar" ? "Recuperar contraseña" : "Accede a tu panel";

  return (
    <div className="relative flex min-h-svh flex-col">
      <header className="flex h-[72px] items-center justify-end px-[var(--edge)]">
        <button type="button" onClick={close} aria-label="Cerrar y volver" className="flex h-11 w-11 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-white7 hover:text-white8">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      <main className="relative flex flex-1 flex-col items-center px-[var(--gutter)] pb-16 pt-4 md:pt-10">
        <div className="halo" style={{ left: "50%", top: 40, width: 720, height: 520, transform: "translate(-50%, 0)" }} />

        <div className="relative flex w-full max-w-[440px] flex-col items-center">
          <Logo
            className="gap-1.5"
            markClassName="h-14 w-14 md:h-[72px] md:w-[72px]"
            wordClassName="text-[24px] md:text-[30px]"
          />
          <h1 className="m-0 mt-6 w-full text-left text-[20px] font-medium leading-[1.25] tracking-[-0.03em] text-white8 md:text-[22px]">{title}</h1>

          {mode !== "recuperar" && (
            <div className="mt-5 flex gap-5 self-start" role="tablist" aria-label="Acceso">
              <button
                type="button"
                role="tab"
                aria-selected={mode === "entrar"}
                onClick={() => pick("entrar")}
                className={`cursor-pointer border-0 bg-transparent p-0 text-[12px] font-medium ${mode === "entrar" ? "text-white8" : "text-grey5"}`}
              >
                Acceso
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "registro"}
                onClick={() => pick("registro")}
                className={`cursor-pointer border-0 bg-transparent p-0 text-[12px] font-medium ${mode === "registro" ? "text-white8" : "text-grey5"}`}
              >
                Regístrate
              </button>
            </div>
          )}

          {mode !== "recuperar" && !sent && (
            <div className={`mt-8 grid w-full gap-3 ${apple ? "grid-cols-2" : "grid-cols-1"}`}>
              <button
                type="button"
                className={socialBtn}
                onClick={() => {
                  setProvider("Google");
                  setSent(true);
                }}
              >
                <GoogleMark />
                {apple ? "Google" : "Continuar con Google"}
              </button>
              {apple && (
                <button
                  type="button"
                  className={socialBtn}
                  onClick={() => {
                    setProvider("Apple");
                    setSent(true);
                  }}
                >
                  <AppleMark />
                  Apple
                </button>
              )}
            </div>
          )}

          <form
            className="mt-6 grid w-full grid-cols-1 gap-[10px]"
            action="#"
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              setProvider(null);
              setSent(true);
            }}
          >
            {sent ? (
              <p className="t-body m-0 text-white8" role="status">
                {provider
                  ? `Recibido. Seguimos el acceso con ${provider} y te escribimos hoy.`
                  : mode === "recuperar"
                    ? "Si el email está en una cuenta, te escribimos hoy con el enlace."
                    : mode === "registro"
                      ? "Recibido. Te abrimos el acceso y te escribimos hoy."
                      : "Si la cuenta existe, te escribimos hoy para darte acceso."}
              </p>
            ) : mode === "recuperar" ? (
              <>
                <label htmlFor="email" className="t-small text-grey6">
                  Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="tu@agencia.es" className={field} />
                <button type="submit" className="btn btn-w mt-3">
                  Enviar enlace
                </button>
                <button type="button" onClick={() => pick("entrar")} className="cursor-pointer justify-self-start border-0 bg-transparent p-0 text-[13px] text-grey6 hover:text-white7">
                  Volver al acceso
                </button>
              </>
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
                <button type="button" onClick={() => pick("recuperar")} className="cursor-pointer justify-self-start border-0 bg-transparent p-0 text-[13px] text-grey6 hover:text-white7">
                  Recuperar contraseña
                </button>
                <button type="submit" className="btn btn-w mt-3">
                  Acceder
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
