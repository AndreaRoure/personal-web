/** Silueta del Hotel Vela. Hereda el color del texto con currentColor y usa
 *  un grosor de 1.8 para acompañar a los bordes de 2px del resto de la web. */
export default function IconoVela({ tamano = 22 }: { tamano?: number }) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="4 2 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d="M17 4c-6 2.5-9 8-9 15" />
      <path d="M17 4v15" />
      <path d="M17 12h4v7" />
      <path d="M6 19h16" />
    </svg>
  );
}
