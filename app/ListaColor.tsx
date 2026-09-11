/** Lista con marcador de color por elemento — para categorías paralelas
 *  donde el color en sí aporta información (niveles de riesgo, semáforos...).
 *  Deliberadamente al margen de la paleta de acento del sitio: aquí el color
 *  es semántico, no de marca. Se usa directamente dentro del MDX de los
 *  artículos. */
export interface ItemColor {
  titulo: string;
  texto: string;
  color: string;
}

export default function ListaColor({ items }: { items: ItemColor[] }) {
  return (
    <ul className="not-prose my-10 flex flex-col gap-5 list-none p-0">
      {items.map((it) => (
        <li key={it.titulo} className="flex gap-4 items-start">
          <span
            aria-hidden="true"
            className="mt-1.5 w-3 h-3 shrink-0"
            style={{ backgroundColor: it.color }}
          />
          <div>
            <p
              className="font-mono text-xs font-bold uppercase tracking-[0.14em]"
              style={{ color: it.color }}
            >
              {it.titulo}
            </p>
            <p className="text-sm text-muted leading-relaxed mt-1">{it.texto}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
