"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE = "cookieConsent";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 días

/**
 * Aviso de cookies con el sistema editorial: barra fija inferior, filete
 * superior, esquinas de 2px como el resto de los botones del sitio.
 * Solo aparece si no hay una decisión guardada (antes se mostraba un instante
 * y luego se ocultaba aunque ya hubieras aceptado).
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!document.cookie.includes(`${COOKIE}=`)) setVisible(true);
    } catch {
      // Sin acceso a cookies: no mostramos el aviso.
    }
  }, []);

  const decide = (accepted: boolean) => {
    document.cookie = `${COOKIE}=${accepted}; max-age=${MAX_AGE}; path=/; SameSite=Lax`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="cookie-in fixed inset-x-0 bottom-0 z-[200] border-t border-[var(--color-rule)] bg-[var(--color-paper)]/97 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between md:gap-10 md:px-8">
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--color-stone)]">
          Usamos cookies para que el sitio funcione bien y para entender cómo se
          usa. Consulta nuestra{" "}
          <Link href="/legal/politica-de-cookies" className="link-quiet text-sm">
            política de cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide(false)}
            className="btn h-10 min-h-0 flex-1 border border-[var(--color-ink)] px-5 text-sm text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] md:flex-none">
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="btn h-10 min-h-0 flex-1 bg-[var(--color-ink)] px-5 text-sm text-[var(--color-paper)] hover:bg-black md:flex-none">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
