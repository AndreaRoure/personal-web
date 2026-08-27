/** Iconos que sustituyen al texto en el nav al pasar el raton.
 *  Mismo lenguaje de linea que IconoVela: currentColor y grosor 1.7-1.8. */

export function IconoCarpetas({ tamano = 26 }: { tamano?: number }) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="1 1.5 19 17"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 5h6l2 2.5h9V17H2z" />
      <path d="M5 5V2.5h5L12 5" />
      <path d="M2 9h17" />
    </svg>
  );
}

/** Sobre con alas: la paloma mensajera, que a este tamaño se lee mejor
 *  que un pajaro dibujado. */
export function IconoSobreAlado({ tamano = 26 }: { tamano?: number }) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 4 25 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="7.5" y="6" width="10" height="7.5" rx="0.6" />
      <path d="M7.5 6.5l5 3.6 5-3.6" />
      <path d="M6.5 7.4c-2-1.6-4.2-1.7-5.9-.2" />
      <path d="M18.5 7.4c2-1.6 4.2-1.7 5.9-.2" />
    </svg>
  );
}
