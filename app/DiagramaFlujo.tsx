/** Diagrama de flujo "dibujado a mano": cajas con doble trazo ligeramente
 *  desalineado (como un rotulador que repasa la misma línea dos veces) y
 *  flechas con un leve quiebre en vez de rectas de CAD. Pensado para los
 *  bloques de arquitectura/stack de los artículos — se usa directamente
 *  dentro del MDX como <DiagramaFlujo pasos={...} flechas={...} />.
 *
 *  El bamboleo es determinista (una tabla fija de offsets, no Math.random):
 *  así el diagrama sale igual en cada build, no cambia de aspecto solo por
 *  volver a generar la página. */

const ANCHO_CAJA = 148;
const ALTO_CAJA = 66;
const GAP = 34;
const MARGEN = 16;
const ALTO_FILA = 120;

// [dx1,dy1, dx2,dy2, dx3,dy3, dx4,dy4] por esquina, dos pasadas por caja.
// Los valores estan pensados para notarse a tamaño normal de lectura
// (6-10px), no para ser sutiles.
const BAMBOLEOS: [number, number][][] = [
  [[2, -6], [7, 2], [3, 7], [-6, 3]],
  [[-5, -3], [8, -4], [-2, 6], [4, 5]],
  [[4, 4], [-6, -2], [6, 5], [-3, -4]],
  [[-3, 5], [3, -7], [-5, -3], [6, 2]],
];

function cajaSketchy(x: number, y: number, w: number, h: number, seed: number) {
  const a = BAMBOLEOS[seed % BAMBOLEOS.length];
  const b = BAMBOLEOS[(seed + 1) % BAMBOLEOS.length];
  const pase = (d: [number, number][]) =>
    `M${x + d[0][0]},${y + d[0][1]} L${x + w + d[1][0]},${y + d[1][1]} ` +
    `L${x + w + d[2][0]},${y + h + d[2][1]} L${x + d[3][0]},${y + h + d[3][1]} Z`;
  return { pase1: pase(a), pase2: pase(b) };
}

const ICONOS: Record<string, (cx: number, cy: number) => React.ReactNode> = {
  correo: (cx, cy) => (
    <g transform={`translate(${cx - 25}, ${cy - 11})`}>
      <path d="M0,0 L50,0 L50,22 L0,22 Z M0,1 L25,15 L50,1" />
    </g>
  ),
  reloj: (cx, cy) => (
    <g>
      <circle cx={cx} cy={cy} r="10" />
      <path d={`M${cx},${cy - 7} L${cx},${cy} L${cx + 6},${cy + 4}`} />
    </g>
  ),
  http: (cx, cy) => (
    <path
      d={`M${cx},${cy - 10} a10,10 0 1 1 -10,10 M${cx},${cy - 10} l4.5,-3.5 M${cx},${cy - 10} l-2.5,5`}
    />
  ),
  chat: (cx, cy) => (
    <path
      d={`M${cx - 12},${cy - 10} q11,-7 22,0 q11,7 -3,11 l2,8 l-9,-5.5 q-12,0 -12,-13.5 Z`}
    />
  ),
};

export interface PasoDiagrama {
  icono: keyof typeof ICONOS;
  lineas: string[];
}

export interface RamaDiagrama {
  desde: number;
  lineas: string[];
  etiqueta: string;
}

export default function DiagramaFlujo({
  pasos,
  flechas,
  rama,
  alt,
}: {
  pasos: PasoDiagrama[];
  flechas: string[];
  rama?: RamaDiagrama;
  alt: string;
}) {
  const anchoTotal = pasos.length * ANCHO_CAJA + (pasos.length - 1) * GAP + MARGEN * 2;
  const altoTotal = ALTO_FILA + (rama ? 130 : 30);
  const yFila = 50;

  const centros = pasos.map((_, i) => MARGEN + i * (ANCHO_CAJA + GAP) + ANCHO_CAJA / 2);
  const xCajas = pasos.map((_, i) => MARGEN + i * (ANCHO_CAJA + GAP));

  return (
    <svg
      viewBox={`0 0 ${anchoTotal} ${altoTotal}`}
      role="img"
      aria-label={alt}
      className="w-full max-w-full"
      style={{ fontFamily: "var(--font-plex-mono), monospace" }}
    >
      <defs>
        <marker id="df-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0.5,0.5 L9.5,5 L0.5,9.5" fill="none" stroke="#7A9201" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </marker>
      </defs>

      {/* Cajas */}
      {pasos.map((paso, i) => {
        const { pase1, pase2 } = cajaSketchy(xCajas[i], yFila, ANCHO_CAJA, ALTO_CAJA, i);
        const cx = centros[i];
        return (
          <g key={i}>
            <g fill="none" stroke="#1A1A17" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round">
              <path d={pase1} />
              <path d={pase2} opacity={0.6} />
            </g>
            <g fill="none" stroke="#7A9201" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              {ICONOS[paso.icono]?.(cx, yFila + 24)}
            </g>
            <g fill="#2B3300" fontSize="12" textAnchor="middle">
              {paso.lineas.map((linea, li) => (
                <text key={li} x={cx} y={yFila + 46 + li * 13}>
                  {linea}
                </text>
              ))}
            </g>
          </g>
        );
      })}

      {/* Flechas entre cajas consecutivas */}
      {flechas.map((etiqueta, i) => {
        const x1 = xCajas[i] + ANCHO_CAJA;
        const x2 = xCajas[i + 1];
        const yMid = yFila + ALTO_CAJA / 2;
        const bend = i % 2 === 0 ? -5 : 5;
        return (
          <g key={i}>
            <path
              d={`M${x1 + 8},${yMid - bend} L${(x1 + x2) / 2},${yMid + bend} L${x2 - 6},${yMid - bend}`}
              fill="none"
              stroke="#7A9201"
              strokeWidth={2}
              strokeLinecap="round"
              markerEnd="url(#df-arrow)"
            />
            <text
              x={(x1 + x2) / 2}
              y={yMid - bend - 12}
              fill="#7A9201"
              fontSize="10.5"
              textAnchor="middle"
            >
              {etiqueta}
            </text>
          </g>
        );
      })}

      {/* Rama opcional: una caja mas abajo, colgando de un paso concreto */}
      {rama && (() => {
        const cxOrigen = centros[rama.desde];
        const yOrigen = yFila + ALTO_CAJA;
        const wRama = ANCHO_CAJA + 60;
        const xRama = Math.max(MARGEN, cxOrigen - wRama / 2 - 20);
        const yRama = yFila + ALTO_CAJA + 70;
        const { pase1, pase2 } = cajaSketchy(xRama, yRama, wRama, ALTO_CAJA - 12, pasos.length);
        return (
          <g>
            <path
              d={`M${cxOrigen},${yOrigen + 4} L${cxOrigen + 5},${yRama - 30} L${cxOrigen - 3},${yRama - 4}`}
              fill="none"
              stroke="#7A9201"
              strokeWidth={2}
              strokeLinecap="round"
              markerEnd="url(#df-arrow)"
            />
            <text x={cxOrigen + 40} y={yRama - 34} fill="#7A9201" fontSize="10.5" textAnchor="middle">
              {rama.etiqueta}
            </text>
            <g fill="none" stroke="#1A1A17" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round">
              <path d={pase1} />
              <path d={pase2} opacity={0.6} />
            </g>
            <g fill="#2B3300" fontSize="12" textAnchor="middle">
              {rama.lineas.map((linea, li) => (
                <text key={li} x={xRama + wRama / 2} y={yRama + (ALTO_CAJA - 12) / 2 - 4 + li * 15}>
                  {linea}
                </text>
              ))}
            </g>
          </g>
        );
      })()}
    </svg>
  );
}
