import Image from "next/image";
import HojaRoble from "./HojaRoble";
import { categoriaDe } from "./categorias";

/** Portada generada a partir de lo que ya se escribe en el frontmatter.
 *  No hay que buscar ni diseñar imagen: el titulo ocupa la portada sobre el
 *  color de su categoria.
 *
 *  Si el articulo trae imagen, esta va de fondo con el duotono de su
 *  categoria y un velo del mismo color, y el titulo se mantiene encima. Asi
 *  las dos variantes se leen igual y el titulo no queda suelto debajo.
 *
 *  Los tamaños van en cqw para que la misma pieza sirva a 300px de ancho en
 *  una tarjeta y a pantalla completa.
 *
 *  La etiqueta de categoria se recibe ya traducida: este componente lo usan
 *  tanto piezas cliente como de servidor, y asi no depende de como cada una
 *  resuelve las traducciones. */
export default function PortadaTipografica({
  titulo,
  categoria,
  categoriaLabel,
  fecha,
  tags = [],
  imagen,
  compacta = false,
  comoTitulo = false,
}: {
  titulo: string;
  categoria?: string;
  categoriaLabel: string;
  fecha?: string;
  tags?: string[];
  imagen?: string | null;
  compacta?: boolean;
  comoTitulo?: boolean;
}) {
  const cat = categoriaDe(categoria);
  const hayPie = Boolean(fecha) || tags.length > 0;
  const Titulo = comoTitulo ? "h3" : "p";

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col justify-between"
      style={{
        backgroundColor: cat.sombra,
        color: cat.luz,
        padding: "6% 6.5%",
        // En linea y no con la clase de Tailwind: las unidades cqw de dentro
        // dependen de que este contenedor exista, y no quiero que dependa de
        // que el plugin de container queries este activo.
        containerType: "inline-size",
      }}
    >
      {imagen && (
        <>
          <Image
            src={imagen}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            style={{ filter: `url(#duo-${cat.id})` }}
          />
          {/* Sin este velo el titulo en lima no se lee sobre las zonas
              claras del duotono. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ backgroundColor: cat.sombra, opacity: 0.72 }}
          />
        </>
      )}

      <p
        className="relative font-mono uppercase"
        style={{ fontSize: "3.2cqw", letterSpacing: "0.16em", opacity: 0.75 }}
      >
        &gt; {categoriaLabel.toLowerCase()}
      </p>

      <Titulo
        className="relative font-display font-bold"
        style={{
          fontSize: compacta ? "7.6cqw" : "7.4cqw",
          lineHeight: 1,
          maxWidth: "92%",
          textWrap: "balance",
        }}
      >
        {titulo}
      </Titulo>

      {hayPie ? (
        <div
          className="relative font-mono uppercase flex justify-between gap-4"
          style={{ fontSize: "3cqw", letterSpacing: "0.14em", opacity: 0.75 }}
        >
          {/* La fecha nunca se parte: sin flex-shrink-0 el flex la comprimía
              por debajo de su ancho de contenido y "2026-07-29" se rompía a
              media palabra. Las etiquetas sí pueden ocupar dos líneas. */}
          <span className="flex-shrink-0 whitespace-nowrap">{fecha}</span>
          {tags.length > 0 && (
            <span className="flex-1 min-w-0 text-right">{tags.slice(0, 3).join(" · ")}</span>
          )}
        </div>
      ) : (
        <span aria-hidden="true" />
      )}

      {/* La hoja como marca de agua, asomando por la esquina */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{ right: "-2%", bottom: "-9%", width: "26%", opacity: 0.16, color: cat.luz }}
      >
        <HojaRoble tamano="100%" color="currentColor" />
      </div>
    </div>
  );
}
