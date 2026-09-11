/** Rejilla de tarjetas para presentar categorías paralelas (niveles de
 *  riesgo, tipos de etiqueta...) — mismo lenguaje visual que el resto del
 *  sitio: borde de 2px, etiqueta en mono mayúsculas con el acento. Se usa
 *  directamente dentro del MDX de los artículos. */
export interface Tarjeta {
  titulo: string;
  texto: string;
  icono?: string;
}

export default function Tarjetas({
  items,
  cols = 2,
}: {
  items: Tarjeta[];
  cols?: 2 | 3 | 4;
}) {
  const colsClase =
    cols === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : cols === 3
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <div className={`not-prose my-10 grid grid-cols-1 ${colsClase} gap-4`}>
      {items.map((it) => (
        <div
          key={it.titulo}
          className="border-2 border-[#1A1A17] bg-white p-5 flex flex-col gap-3"
        >
          {it.icono && (
            // eslint-disable-next-line @next/next/no-img-element -- imagen de contenido dentro de MDX, no una de next/image del layout
            <img src={it.icono} alt="" className="h-8 w-auto" />
          )}
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
            {it.titulo}
          </p>
          <p className="text-sm text-muted leading-relaxed">{it.texto}</p>
        </div>
      ))}
    </div>
  );
}
