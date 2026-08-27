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
 *  que un pajaro dibujado.
 *
 *  Es un dibujo apaisado, asi que NO va en caja cuadrada: metido en 26x26
 *  el escalado lo manda el ancho y el sobre quedaba a 12px de alto, la mitad
 *  que las carpetas. Con 38x26 el dibujo sale a ~21px de alto, que es el de
 *  la carpeta. El grosor baja a 1.35 porque el escalado es mayor. */
export function IconoSobreAlado({ alto = 27 }: { alto?: number }) {
  // El ancho tiene que dar de sobra para que el escalado lo mande la altura:
  // si no, el navegador escala por el ancho y el dibujo sale bajo otra vez.
  const ancho = Math.ceil((alto * 22) / 12);
  return (
    <svg
      width={ancho}
      height={alto}
      viewBox="1 3 22 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.35}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="6" y="5" width="12" height="9" rx="0.7" />
      <path d="M6 5.6l6 4.3 6-4.3" />
      <path d="M5 6.6c-1.7-1.4-3-1.5-4.4-.2" />
      <path d="M19 6.6c1.7-1.4 3-1.5 4.4-.2" />
    </svg>
  );
}
