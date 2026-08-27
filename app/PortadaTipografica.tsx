import HojaRoble from "./HojaRoble";
import { categoriaDe } from "./categorias";

/** Portada generada a partir de lo que ya se escribe en el frontmatter.
 *  No hay que buscar ni diseñar imagen: el titulo ocupa la portada sobre el
 *  color de su categoria. Se usa en la tarjeta del archivo y como cabecera
 *  del articulo, con el mismo diseño en los dos sitios.
 *
 *  Los tamaños van en cqw para que la misma pieza sirva a 300px de ancho en
 *  una tarjeta y a pantalla completa en la cabecera. */
export default function PortadaTipografica({
  titulo,
  categoria,
  fecha,
  tags = [],
  compacta = false,
}: {
  titulo: string;
  categoria?: string;
  fecha?: string;
  tags?: string[];
  compacta?: boolean;
}) {
  const cat = categoriaDe(categoria);

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
      <p
        className="font-mono uppercase"
        style={{ fontSize: "3.2cqw", letterSpacing: "0.16em", opacity: 0.75 }}
      >
        &gt; {cat.etiqueta.toLowerCase()}
      </p>

      <p
        className="font-display font-bold"
        style={{
          fontSize: compacta ? "9cqw" : "7.4cqw",
          lineHeight: 0.98,
          maxWidth: "90%",
          textWrap: "balance",
        }}
      >
        {titulo}
      </p>

      <div
        className="font-mono uppercase flex justify-between gap-4"
        style={{ fontSize: "3cqw", letterSpacing: "0.14em", opacity: 0.75 }}
      >
        <span>{fecha}</span>
        {tags.length > 0 && (
          <span className="text-right">{tags.slice(0, 3).join(" · ")}</span>
        )}
      </div>

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
