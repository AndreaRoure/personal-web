"use client";

import { useRef, useState } from "react";

export default function CopiarEmail({ email }: { email: string }) {
  const [copiado, setCopiado] = useState(false);
  const [fallo, setFallo] = useState(false);
  const refEmail = useRef<HTMLAnchorElement>(null);

  function seleccionarEmail() {
    const el = refEmail.current;
    if (!el) return;
    const rango = document.createRange();
    rango.selectNodeContents(el);
    const seleccion = window.getSelection();
    seleccion?.removeAllRanges();
    seleccion?.addRange(rango);
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(email);
      setCopiado(true);
      setFallo(false);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // El portapapeles falla sin contexto seguro o sin activacion del usuario.
      // Dejamos el email seleccionado para que baste con copiar.
      setFallo(true);
      seleccionarEmail();
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <a
        ref={refEmail}
        href={`mailto:${email}`}
        className="font-display text-2xl md:text-3xl font-semibold underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent transition-colors"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copiar}
        className="font-mono text-xs uppercase tracking-[0.14em] border border-ink/20 rounded-full px-4 py-2 text-muted hover:border-accent hover:text-accent transition-colors"
      >
        {copiado ? "copiado" : "copiar"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copiado ? "Email copiado al portapapeles" : ""}
      </span>
      {fallo && (
        <span className="text-sm text-muted">
          Te lo he seleccionado para que lo copies.
        </span>
      )}
    </div>
  );
}
