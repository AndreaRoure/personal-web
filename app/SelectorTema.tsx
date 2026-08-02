"use client";

import { useEffect, useState } from "react";

export const TEMAS = [
  { id: "roble", nombre: "Roble", muestra: "#7A9201" },
  { id: "coral", nombre: "Coral", muestra: "#C2492D" },
  { id: "cielo", nombre: "Cielo", muestra: "#2A7F94" },
  { id: "tinta", nombre: "Tinta", muestra: "#3F4A14" },
];

export default function SelectorTema() {
  // Arranca en roble y se sincroniza tras montar, para no chocar con el HTML
  // que ya ha pintado el servidor.
  const [tema, setTema] = useState("roble");

  useEffect(() => {
    setTema(document.documentElement.dataset.tema || "roble");
  }, []);

  function elegir(id: string) {
    document.documentElement.dataset.tema = id;
    setTema(id);
    try {
      localStorage.setItem("tema", id);
    } catch {
      // Navegacion privada o almacenamiento bloqueado: el tema dura la sesion.
    }
  }

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted mb-2">
        Tema
      </p>
      <div className="flex gap-2">
        {TEMAS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => elegir(t.id)}
            aria-pressed={tema === t.id}
            aria-label={`Tema ${t.nombre}`}
            title={t.nombre}
            style={{ backgroundColor: t.muestra }}
            className={`w-5 h-5 rounded-full border transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
              tema === t.id ? "border-ink scale-110" : "border-ink/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
