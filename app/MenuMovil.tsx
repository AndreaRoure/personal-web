"use client";

import { useState } from "react";
import HojaRoble from "./HojaRoble";

const enlaces = [
  { href: "/", texto: "Sobre mí" },
  { href: "/blog", texto: "Blog" },
  { href: "/contacto", texto: "Contacto" },
];

export default function MenuMovil() {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setAbierto(!abierto)}
        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        className="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
      >
        <span className={`block w-6 h-0.5 bg-crema transition-transform ${abierto ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-crema transition-opacity ${abierto ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-crema transition-transform ${abierto ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {abierto && (
        <div className="fixed inset-0 top-[72px] bg-dark z-50 px-6 pt-10">
          <nav className="flex flex-col gap-6">
            {enlaces.map((enlace, i) => (
              <a key={enlace.href} href={enlace.href} onClick={() => setAbierto(false)} className="font-display text-4xl font-semibold text-crema hover:text-accent-dark transition-colors animate-aparecer" style={{ animationDelay: `${i * 0.08}s` }}>
                {enlace.texto}
              </a>
            ))}
          </nav>
          <div className="mt-12">
            <HojaRoble tamano={24} color="#A8C63C" opacidad={0.7} />
          </div>
        </div>
      )}
    </div>
  );
}