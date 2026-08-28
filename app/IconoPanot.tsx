/** Silueta del panot de la flor, la baldosa de Puig i Cadafalch que cubre
 *  las aceras de Barcelona: 4 petalos (circulos que se solapan entre si,
 *  con las puntas donde se cruzan) alrededor de un circulo central, sobre
 *  el marco cuadrado de la baldosa. Trazo mas grueso que el resto de
 *  iconos de linea (2.3 en vez de 1.8): a peso fino los petalos se leian
 *  como aros finos cruzados en vez de como una flor solida. */
export default function IconoPanot({ tamano = 22 }: { tamano?: number }) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <rect x="2.3" y="2.3" width="19.4" height="19.4" rx="1" />
      <circle cx="12" cy="7.2" r="3.8" />
      <circle cx="16.8" cy="12" r="3.8" />
      <circle cx="12" cy="16.8" r="3.8" />
      <circle cx="7.2" cy="12" r="3.8" />
      <circle cx="12" cy="12" r="1.35" fill="currentColor" stroke="none" />
    </svg>
  );
}
