"use client";

import { useEffect, useState } from "react";

const palabras = [
  "soberanía digital",
  "tecnología humanista",
  "formación",
  "modelos alternativos",
  "datos con criterio",
];

export default function KickerRotativo() {
  const [indice, setIndice] = useState(0);
  const [texto, setTexto] = useState("");
  const [borrando, setBorrando] = useState(false);

  useEffect(() => {
    const palabra = palabras[indice];
    let timeout: ReturnType<typeof setTimeout>;

    if (!borrando && texto.length < palabra.length) {
      // escribiendo
      timeout = setTimeout(() => {
        setTexto(palabra.slice(0, texto.length + 1));
      }, 55);
    } else if (!borrando && texto.length === palabra.length) {
      // pausa con la palabra completa
      timeout = setTimeout(() => setBorrando(true), 2200);
    } else if (borrando && texto.length > 0) {
      // borrando
      timeout = setTimeout(() => {
        setTexto(palabra.slice(0, texto.length - 1));
      }, 30);
    } else if (borrando && texto.length === 0) {
      // pasar a la siguiente palabra
      setBorrando(false);
      setIndice((i) => (i + 1) % palabras.length);
    }

    return () => clearTimeout(timeout);
  }, [texto, borrando, indice]);

  return (
    <p className="text-sm text-muted mb-6 font-mono">
      <span className="text-accent">&gt;</span> escribo sobre{" "}
      <span className="text-ink font-medium">{texto}</span>
      <span className="cursor-terminal" aria-hidden="true" />
    </p>
  );
}