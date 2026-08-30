/** Cita destacada con una imagen al lado (portada de libro, retrato...).
 *  Pensado para el momento del artículo donde se cita a alguien y conviene
 *  que se note visualmente — mismo lenguaje que el resto de la web: borde
 *  de 2px, barra de acento a la izquierda de la cita, atribución en mono
 *  mayúsculas. Se usa directamente dentro del MDX de los artículos. */
export default function CitaConImagen({
  src,
  alt,
  cita,
  atribucion,
}: {
  src: string;
  alt: string;
  cita: string;
  atribucion: string;
}) {
  return (
    <figure className="not-prose my-10 flex flex-col sm:flex-row gap-6 sm:items-center border-2 border-[#1A1A17] bg-white p-6">
      {/* eslint-disable-next-line @next/next/no-img-element -- imagen de contenido dentro de MDX, no una de next/image del layout */}
      <img
        src={src}
        alt={alt}
        className="w-28 sm:w-36 shrink-0 self-center border border-[#1A1A17]"
      />
      <blockquote className="border-l-0 sm:border-l-4 border-accent sm:pl-5 m-0">
        <p className="font-display text-xl sm:text-2xl font-semibold leading-snug text-ink m-0">
          &ldquo;{cita}&rdquo;
        </p>
        <figcaption className="mt-3 font-mono text-xs uppercase tracking-wide text-muted">
          {atribucion}
        </figcaption>
      </blockquote>
    </figure>
  );
}
