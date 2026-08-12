'use client';
import { useState } from 'react';
import Link from 'next/link';

const ENLACES = [
  { href: '/#sobre-mi', texto: 'Sobre mí' },
  { href: '/#archivo', texto: 'Archivo' },
  { href: '/#contacto', texto: 'Contacto' },
];

// "last-of-type" apunta al ultimo <a>, que es Contacto. Con "last" caeria en el
// boton de la hamburguesa, que sigue siendo el ultimo hijo aunque este oculto.
// Ademas gana en especificidad a "border-r-2"; un "border-r-0" suelto empataria.
const CELDA =
  'flex items-center border-r-2 last-of-type:border-r-0 border-[#1A1A17] px-3 sm:px-5 py-3 sm:py-4 ' +
  'transition-colors duration-150 hover:bg-lima ' +
  'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink';

export default function TopNav() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="w-full bg-white text-ink sticky top-0 z-50 border-b-2 border-[#1A1A17]">
      <nav className="flex items-stretch">
        {/* Marca */}
        <Link
          href="/"
          onClick={() => setAbierto(false)}
          className={`${CELDA} flex-[1.4] font-display text-[17px] sm:text-[19px] md:text-[21px] font-bold whitespace-nowrap`}
        >
          Andrea Robles
        </Link>

        {/* Celdas de navegacion: solo desktop */}
        {ENLACES.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className={`${CELDA} hidden md:flex flex-1 text-[14px] md:text-[16px] font-bold whitespace-nowrap`}
          >
            {e.texto}
          </Link>
        ))}

        {/* Hamburguesa: solo movil, en su propia celda */}
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          // Sin bordes propios: el divisor lo pone el borde derecho de la marca,
          // si no quedarian 4px de linea entre las dos celdas.
          className={`${CELDA} md:hidden w-16 justify-center border-r-0 gap-[5px] flex-col`}
        >
          <span
            className={`block w-6 h-0.5 bg-ink transition-transform duration-200 ${
              abierto ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-ink transition-opacity duration-200 ${
              abierto ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-ink transition-transform duration-200 ${
              abierto ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Desplegable: celdas apiladas, mismo lenguaje que la barra */}
      {abierto && (
        <div
          id="menu-movil"
          // top-full se resuelve contra la caja de relleno, asi que se quedaria
          // 2px por encima y taparia el borde inferior de la barra.
          className="md:hidden absolute top-[calc(100%+2px)] left-0 right-0 bg-white border-b-2 border-[#1A1A17]"
        >
          {ENLACES.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              onClick={() => setAbierto(false)}
              className="block px-4 py-4 border-t-2 border-[#1A1A17] font-bold text-[16px]
                transition-colors duration-150 hover:bg-lima
                focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink"
            >
              {e.texto}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
