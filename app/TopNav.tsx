'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HojaRoble from './HojaRoble';
import { IconoCarpetas, IconoSobreAlado } from './IconosNav';

const ENLACES = [
  { href: '/#sobre-mi', texto: 'Sobre mí' },
  { href: '/#archivo', texto: 'Archivo' },
  { href: '/#contacto', texto: 'Contacto' },
];

// "last-of-type" apunta al ultimo <a>, que es Contacto. Con "last" caeria en el
// boton de la hamburguesa, que sigue siendo el ultimo hijo aunque este oculto.
// Ademas gana en especificidad a "border-r-2"; un "border-r-0" suelto empataria.
const CELDA =
  'group flex items-center border-r-2 last-of-type:border-r-0 border-[#1A1A17] px-3 sm:px-5 py-3 sm:py-4 ' +
  'transition-colors duration-150 hover:bg-lima ' +
  'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink';

/** El texto sale hacia arriba y el icono entra por abajo, ocupando la misma
 *  casilla. El texto no se borra del DOM, solo se desplaza: asi la etiqueta
 *  del enlace sigue existiendo para un lector de pantalla. */
function Pila({
  texto,
  icono,
  clasesTexto = '',
}: {
  texto: string;
  icono: React.ReactNode;
  clasesTexto?: string;
}) {
  const comun =
    'col-start-1 row-start-1 flex items-center whitespace-nowrap ' +
    'transition-[transform,opacity] duration-300 ease-[cubic-bezier(.22,1,.36,1)] ' +
    'motion-reduce:transition-none';
  // 32px es la altura que tenia la linea de texto antes de la pila: asi la
  // barra conserva sus 66px y no encoge al añadir los iconos.
  return (
    <span className="grid h-[32px] items-center overflow-hidden">
      <span className={`${comun} ${clasesTexto} group-hover:-translate-y-[130%] group-hover:opacity-0`}>
        {texto}
      </span>
      <span
        aria-hidden="true"
        className={`${comun} translate-y-[130%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100`}
      >
        {icono}
      </span>
    </span>
  );
}

export default function TopNav() {
  const [abierto, setAbierto] = useState(false);

  const iconos: Record<string, React.ReactNode> = {
    'Sobre mí': (
      <Image
        src="/andrea-cara.png"
        alt=""
        width={30}
        height={30}
        className="rounded-full grayscale"
      />
    ),
    Archivo: <IconoCarpetas />,
    Contacto: <IconoSobreAlado />,
  };

  return (
    <header className="w-full bg-white text-ink sticky top-0 z-50 border-b-2 border-[#1A1A17]">
      <nav className="flex items-stretch">
        {/* Marca: el nombre se convierte en la hoja de roble */}
        <Link
          href="/"
          onClick={() => setAbierto(false)}
          className={`${CELDA} flex-[1.4] font-display text-[17px] sm:text-[19px] md:text-[21px] font-bold`}
        >
          {/* En movil no hay hover, asi que la marca se queda en texto */}
          <span className="md:hidden whitespace-nowrap">Andrea Robles</span>
          <span className="hidden md:block">
            <Pila texto="Andrea Robles" icono={<HojaRoble tamano={24} />} />
          </span>
        </Link>

        {/* Celdas de navegacion: solo desktop */}
        {ENLACES.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className={`${CELDA} hidden md:flex flex-1 text-[14px] md:text-[16px] font-bold`}
          >
            <Pila texto={e.texto} icono={iconos[e.texto]} />
          </Link>
        ))}

        {/* Hamburguesa: solo movil, en su propia celda.
            Sin bordes propios: el divisor lo pone el borde derecho de la marca,
            si no quedarian 4px de linea entre las dos celdas. */}
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
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

      {/* Desplegable movil: celdas apiladas, mismo lenguaje que la barra.
          top-full se resuelve contra la caja de relleno, asi que se quedaria
          2px por encima y taparia el borde inferior de la barra. */}
      {abierto && (
        <div
          id="menu-movil"
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
