/** Silueta del panot de la flor, la baldosa de Puig i Cadafalch que cubre
 *  las aceras de Barcelona: 5 circulos tangentes entre si (uno central y
 *  4 alrededor, sin solaparse — se tocan pero no se cruzan), sobre el
 *  marco cuadrado de la baldosa. */
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
      <rect x="2.3" y="2.3" width="19.4" height="19.4" rx="1" />
      <circle cx="12" cy="7" r="3.54" />
      <circle cx="17" cy="12" r="3.54" />
      <circle cx="12" cy="17" r="3.54" />
      <circle cx="7" cy="12" r="3.54" />
      <circle cx="12" cy="12" r="1.47" />
    </svg>
  );
}
