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
 *  Es apaisado, asi que NO va en caja cuadrada. Y no basta con igualar la
 *  altura a la de las carpetas: el tamaño se percibe por area, y con las alas
 *  largas el dibujo medía 51px de ancho, el doble que la carpeta, y se veia
 *  mas grande aun teniendo la misma altura. Las alas se acortan y el conjunto
 *  se ajusta para que el area coincida con la de las carpetas. */
export function IconoSobreAlado({ alto = 17 }: { alto?: number }) {
  // El ancho tiene que dar de sobra para que el escalado lo mande la altura:
  // si no, el navegador escala por el ancho y el dibujo sale bajo.
  const ancho = Math.ceil((alto * 18) / 10);
  return (
    <svg
      width={ancho}
      height={alto}
      viewBox="2 3.4 18 10"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5.5" y="4.5" width="11" height="8.2" rx="0.6" />
      <path d="M5.5 5l5.5 4 5.5-4" />
      <path d="M4.7 5.9c-1.2-1-2.1-1.1-3.1-.2" />
      <path d="M17.3 5.9c1.2-1 2.1-1.1 3.1-.2" />
    </svg>
  );
}
