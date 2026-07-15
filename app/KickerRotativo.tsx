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
  const [saliendo, setSaliendo] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSaliendo(true);
      setTimeout(() => {
        setIndice((i) => (i + 1) % palabras.length);
        setSaliendo(false);
      }, 300);
    }, 2600);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <p className="text-sm text-muted mb-6">
      Escribo sobre{" "}
      <span
        className={`inline-block text-accent font-medium transition-all duration-300 ${
          saliendo ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
        }`}
      >
        {palabras[indice]}
      </span>
    </p>
  );
}