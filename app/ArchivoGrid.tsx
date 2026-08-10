import Link from "next/link";
import Image from "next/image";

export interface ArchivoItem {
  tipo: "Proyecto" | "Artículo";
  titulo: string;
  descripcion: string;
  fecha: string;
  href: string;
  externo: boolean;
  color: "gris" | "blanco" | "rojo";
  imagen?: string | null;
  span?: 2;
  estado?: string;
}

const COLORS = {
  gris:   { bgClass: "bg-[#EAEAE6] hover:bg-[#F2F5E4]", text: "#2B3300", muted: "#2B330088" },
  blanco: { bgClass: "bg-white hover:bg-[#F2F5E4]",     text: "#2B3300", muted: "#2B330088" },
  rojo:   { bgClass: "bg-[#DC4632] hover:bg-[#C93D2B]", text: "#F2F5E4", muted: "#F2F5E4AA" },
};

function Card({ item }: { item: ArchivoItem }) {
  const c = COLORS[item.color];
  // A partir de sm ocupa dos columnas; en movil la rejilla es de una sola,
  // y un col-span-2 ahi crearia una segunda columna implicita y desbordaria.
  const cls = item.span === 2 ? "sm:col-span-2" : "";
  const hasImg = !!item.imagen;

  const inner = (
    <div
      className={`group/card flex flex-col h-full transition-colors duration-200 cursor-pointer overflow-hidden ${c.bgClass}`}
      style={{ minHeight: "260px" }}
    >
      {/* Imagen si tiene */}
      {hasImg && (
        <div className="relative w-full flex-shrink-0" style={{ height: "200px" }}>
          <Image
            src={item.imagen!}
            alt={item.titulo}
            fill
            className="object-cover grayscale"
          />
        </div>
      )}

      {/* Contenido */}
      <div className="flex flex-col flex-1 justify-between p-5">
        <div>
          <p
            className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
            style={{ color: c.muted }}
          >
            {item.tipo}{item.estado ? ` · ${item.estado}` : ""}
          </p>
          <h3
            className={`font-display font-bold leading-tight ${hasImg ? "text-lg" : "text-2xl"}`}
            style={{ color: c.text }}
          >
            {item.titulo}
          </h3>
          {!hasImg && (
            <p className="text-sm mt-2 leading-relaxed line-clamp-3" style={{ color: c.muted }}>
              {item.descripcion}
            </p>
          )}
        </div>
        <div className="flex justify-between items-end mt-4">
          <span className="font-mono text-xs" style={{ color: c.muted }}>{item.fecha}</span>
          <span className="font-bold text-lg" style={{ color: c.text }}>
            {item.externo ? "↗" : "→"}
          </span>
        </div>
      </div>
    </div>
  );

  return item.externo
    ? <a href={item.href} target="_blank" rel="noopener noreferrer" className={`block ${cls}`}>{inner}</a>
    : <Link href={item.href} className={`block ${cls}`}>{inner}</Link>;
}

export default function ArchivoGrid({ items }: { items: ArchivoItem[] }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full"
      style={{ background: "#D0D0CC", gap: "2px" }}
    >
      {items.map((item) => (
        <Card key={item.titulo + item.fecha} item={item} />
      ))}
    </div>
  );
}
