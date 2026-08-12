"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HojaRoble from "./HojaRoble";

export type CategoriaId = "casos" | "articulos" | "side";
export type FiltroId = CategoriaId | "todo";

/** Cada categoria define su par de duotono. Todos comparten la luz lima
 *  para que las tarjetas se lean como una familia y no como tres estilos. */
export const CATEGORIAS: {
  id: CategoriaId;
  etiqueta: string;
  sombra: string;
  luz: string;
}[] = [
  { id: "casos",     etiqueta: "Casos de uso",  sombra: "#DC4632", luz: "#F7FFCC" },
  { id: "articulos", etiqueta: "Artículos",     sombra: "#7A9201", luz: "#F7FFCC" },
  { id: "side",      etiqueta: "Side projects", sombra: "#2B3300", luz: "#F7FFCC" },
];

/** "Todo" no es una categoria: no tiñe ninguna imagen, solo filtra. Por eso
 *  usa el negro estructural de los bordes y no uno de los tres colores. */
const TODO = { id: "todo" as const, etiqueta: "Todo", sombra: "#1A1A17", luz: "#F7FFCC" };

const PESTANAS: { id: FiltroId; etiqueta: string; sombra: string; luz: string }[] = [
  TODO,
  ...CATEGORIAS,
];

export interface ItemArchivo {
  categoria: CategoriaId;
  titulo: string;
  subtexto: string;
  fecha: string;
  href: string;
  externo?: boolean;
  imagen?: string | null;
  estado?: string;
}

const aTabla = (hex: string) => {
  const n = hex.replace("#", "").match(/../g)!.map((h) => parseInt(h, 16) / 255);
  return n;
};

/** Filtros SVG de duotono, uno por categoria. Se declaran una sola vez y
 *  evitan tener que pregenerar una imagen por color. */
function FiltrosDuotono() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        {CATEGORIAS.map((c) => {
          const s = aTabla(c.sombra);
          const l = aTabla(c.luz);
          return (
            <filter key={c.id} id={`duo-${c.id}`} colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0"
              />
              <feComponentTransfer>
                <feFuncR type="table" tableValues={`${s[0]} ${l[0]}`} />
                <feFuncG type="table" tableValues={`${s[1]} ${l[1]}`} />
                <feFuncB type="table" tableValues={`${s[2]} ${l[2]}`} />
              </feComponentTransfer>
            </filter>
          );
        })}
      </defs>
    </svg>
  );
}

function Tarjeta({ item }: { item: ItemArchivo }) {
  const cat = CATEGORIAS.find((c) => c.id === item.categoria)!;

  const contenido = (
    <article className="group flex flex-col h-full bg-white border-2 border-[#1A1A17] overflow-hidden transition-transform duration-200 hover:-translate-y-1">
      {/* Imagen con el duotono de su categoria */}
      <div
        className="relative w-full aspect-[16/10] border-b-2 border-[#1A1A17] overflow-hidden"
        style={{ backgroundColor: cat.sombra }}
      >
        {item.imagen ? (
          <Image
            src={item.imagen}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            style={{ filter: `url(#duo-${item.categoria})` }}
          />
        ) : (
          // Sin imagen: bloque del color de la categoria con la hoja de marca
          <div className="absolute inset-0 flex items-center justify-center">
            <HojaRoble tamano={72} color={cat.luz} opacidad={0.5} />
          </div>
        )}
      </div>

      {/* Titulo y subtexto */}
      <div className="flex flex-col flex-1 gap-2 p-4 sm:p-5">
        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ color: cat.sombra }}
        >
          {cat.etiqueta}
          {item.estado ? ` · ${item.estado}` : ""}
        </p>
        <h3 className="font-display text-lg sm:text-xl font-bold leading-tight text-ink">
          {item.titulo}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-3">
          {item.subtexto}
        </p>
        <div className="flex justify-between items-end mt-auto pt-3">
          <span className="font-mono text-xs text-muted">{item.fecha}</span>
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
  const [activa, setActiva] = useState<FiltroId>("todo");
  const visibles =
    activa === "todo" ? items : items.filter((i) => i.categoria === activa);
  const activaDef = PESTANAS.find((c) => c.id === activa)!;

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <FiltrosDuotono />

      {/* Pestañas de carpeta */}
      <div
        role="tablist"
        aria-label="Categorías del archivo"
        className="flex items-end gap-1 overflow-x-auto pt-1"
      >
        {PESTANAS.map((c) => {
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
              ? "El archivo está vacío por ahora."
              : `Todavía no hay nada en ${activaDef.etiqueta.toLowerCase()}.`}
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
