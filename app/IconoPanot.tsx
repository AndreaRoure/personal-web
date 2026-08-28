/** Silueta del panot de la flor, la baldosa de Puig i Cadafalch que cubre
 *  las aceras de Barcelona. Mismo lenguaje de linea que el resto de iconos
 *  (currentColor, grosor 1.8): la baldosa como borde y la flor construida
 *  con 4 circulos que se solapan entre si (como los aros de la baldosa
 *  real), con un circulo mas pequeño en el centro. */
export default function IconoPanot({ tamano = 22 }: { tamano?: number }) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="1.5" />
      <circle cx="12" cy="8" r="4" />
      <circle cx="16" cy="12" r="4" />
      <circle cx="12" cy="16" r="4" />
      <circle cx="8" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}
