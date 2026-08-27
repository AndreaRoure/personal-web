"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { CATEGORIAS, categoriaDe, type CategoriaId } from "./categorias";
import PortadaTipografica from "./PortadaTipografica";
import FiltrosDuotono from "./FiltrosDuotono";

export type { CategoriaId } from "./categorias";
export { CATEGORIAS } from "./categorias";

export type FiltroId = CategoriaId | "todo";

export interface ItemArchivo {
  categoria: CategoriaId;
  titulo: string;
  subtexto: string;
  fecha: string;
  href: string;
  externo?: boolean;
  imagen?: string | null;
  // Antes era un string libre ("En construcción"); con dos idiomas eso
  // habria que traducirlo desde fuera. Como solo se usa para este caso,
  // pasa a booleano y el texto sale de las traducciones de aqui dentro.
  enConstruccion?: boolean;
  tags?: string[];
}

function Tarjeta({ item }: { item: ItemArchivo }) {
  const tCat = useTranslations("categorias");
  const tArchivo = useTranslations("archivo");
  const cat = categoriaDe(item.categoria);

  const contenido = (
    <article className="group flex flex-col h-full bg-white border-2 border-[#1A1A17] overflow-hidden transition-transform duration-200 hover:-translate-y-1">
      {/* Portada: titulo tipografico, con la imagen detras si el articulo
          trae una. Con o sin imagen es la misma pieza, asi el titulo no se
          repite mas abajo. */}
      <div className="relative w-full aspect-[16/10] border-b-2 border-[#1A1A17] overflow-hidden">
        <PortadaTipografica
          titulo={item.titulo}
          categoria={item.categoria}
          categoriaLabel={tCat(item.categoria)}
          fecha={item.fecha}
          tags={item.tags}
          imagen={item.imagen}
          compacta
        />
      </div>

      {/* Solo el estado y la descripcion: el titulo ya vive en la portada */}
      <div className="flex flex-col flex-1 gap-2 p-4 sm:p-5">
        {item.enConstruccion && (
          <p
            className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: cat.sombra }}
          >
            {tArchivo("enConstruccion")}
          </p>
        )}
        <p className="text-sm text-muted leading-relaxed line-clamp-3">
          {item.subtexto}
        </p>
        <div className="flex justify-end items-end mt-auto pt-3">
          <span
            className="font-bold text-lg transition-transform group-hover:translate-x-1"
            style={{ color: cat.sombra }}
          >
            {item.externo ? "↗" : "→"}
          </span>
        </div>
      </div>
    </article>
  );

  return item.externo ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block h-full">
      {contenido}
    </a>
  ) : (
    <Link href={item.href} className="block h-full">
      {contenido}
    </Link>
  );
}

export default function ArchivoTabs({ items }: { items: ItemArchivo[] }) {
  const tCat = useTranslations("categorias");
  const tArchivo = useTranslations("archivo");
  const [activa, setActiva] = useState<FiltroId>("todo");
  const visibles =
    activa === "todo" ? items : items.filter((i) => i.categoria === activa);

  // "Todo" no es una categoria: no tiñe ninguna imagen, solo filtra. Por eso
  // usa el negro estructural de los bordes y no uno de los tres colores.
  const pestanas: { id: FiltroId; etiqueta: string; sombra: string; luz: string }[] = [
    { id: "todo", etiqueta: tArchivo("todo"), sombra: "#1A1A17", luz: "#F7FFCC" },
    ...CATEGORIAS.map((c) => ({ ...c, etiqueta: tCat(c.id) })),
  ];
  const etiquetaActiva = pestanas.find((c) => c.id === activa)!.etiqueta;

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <FiltrosDuotono />

      {/* Pestañas de carpeta */}
      <div
        role="tablist"
        aria-label={tArchivo("categoriasAriaLabel")}
        className="flex items-end gap-1 overflow-x-auto pt-1"
      >
        {pestanas.map((c) => {
          const esActiva = c.id === activa;
          const cuantos =
            c.id === "todo"
              ? items.length
              : items.filter((i) => i.categoria === c.id).length;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={esActiva}
              onClick={() => setActiva(c.id)}
              style={esActiva ? { backgroundColor: c.sombra, color: c.luz } : undefined}
              className={`relative flex-shrink-0 whitespace-nowrap rounded-t-lg border-2 border-b-0 border-[#1A1A17]
                font-mono text-[10px] sm:text-[13px] font-bold uppercase tracking-normal sm:tracking-[0.08em]
                px-2 sm:px-4 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink
                ${esActiva
                  ? "z-10 -mb-0.5 pt-2.5 pb-3"
                  : "bg-[#DEDED9] text-ink/60 pt-2 pb-2.5 hover:bg-[#E7E7E2]"}`}
            >
              {c.etiqueta}
              {/* El contador solo cabe a partir de sm */}
              <span className="hidden sm:inline ml-1.5 opacity-60 font-normal">{cuantos}</span>
            </button>
          );
        })}
      </div>

      {/* Panel de la carpeta */}
      <div className="border-2 border-[#1A1A17] bg-[#F2F5E4] rounded-b-lg rounded-tr-lg p-4 sm:p-6">
        {visibles.length === 0 ? (
          <p className="font-mono text-sm text-muted py-8 text-center">
            {activa === "todo"
              ? tArchivo("vacioTodo")
              : tArchivo("vacioCategoria", { categoria: etiquetaActiva.toLowerCase() })}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {visibles.map((item) => (
              <Tarjeta key={item.href + item.titulo} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
