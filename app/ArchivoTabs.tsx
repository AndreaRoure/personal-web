"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CATEGORIAS, categoriaDe, type CategoriaId } from "./categorias";
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
  imagenPosicion?: string;
  imagenColor?: boolean;
  // Antes era un string libre ("En construcción"); con dos idiomas eso
  // habria que traducirlo desde fuera. Como solo se usa para este caso,
  // pasa a booleano y el texto sale de las traducciones de aqui dentro.
  enConstruccion?: boolean;
  tags?: string[];
}

function fechaCorta(fecha: string, locale: string) {
  // El frontmatter trae "2026-11-15"; en el listado basta con "15 nov 2026".
  const d = new Date(`${fecha}T12:00:00`);
  if (Number.isNaN(d.getTime())) return fecha;
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" })
    .format(d)
    .replace(".", "");
}

/** Una entrada del archivo como fila: fecha, miniatura, título y una línea de
 *  contexto. La portada grande con duotono queda para la cabecera del
 *  artículo; aquí solo asoma en pequeño. */
function Fila({
  item,
  atenuada,
  onEntrar,
  onSalir,
}: {
  item: ItemArchivo;
  atenuada: boolean;
  onEntrar: () => void;
  onSalir: () => void;
}) {
  const tCat = useTranslations("categorias");
  const tArchivo = useTranslations("archivo");
  const locale = useLocale();
  const cat = categoriaDe(item.categoria);
  const Flecha = item.externo ? ArrowUpRight : ArrowRight;

  const contenido = (
    <div className="group grid grid-cols-[4.5rem_minmax(0,1fr)] sm:grid-cols-[6.5rem_minmax(0,1fr)_1.25rem] items-center gap-x-4 sm:gap-x-6 py-4 sm:py-5">
      <time
        dateTime={item.fecha}
        className="hidden sm:block font-mono text-xs uppercase tracking-[0.08em] text-ink/70 tabular-nums"
      >
        {fechaCorta(item.fecha, locale)}
      </time>

      <div
        className="relative w-full aspect-[3/2] overflow-hidden sm:hidden"
        style={{ backgroundColor: cat.sombra }}
        aria-hidden="true"
      >
        {item.imagen && (
          <>
            <Image
              src={item.imagen}
              alt=""
              fill
              sizes="104px"
              className="object-cover"
              style={{ filter: item.imagenColor ? undefined : `url(#duo-${cat.id})`, objectPosition: item.imagenPosicion }}
            />
            {!item.imagenColor && (
              <div className="absolute inset-0" style={{ backgroundColor: cat.sombra, opacity: 0.35 }} />
            )}
          </>
        )}
      </div>

      <div className="min-w-0">
        <h3 className="font-display font-bold text-xl sm:text-2xl leading-tight text-ink text-balance transition-colors group-hover:text-accent">
          {item.titulo}
        </h3>
        <p className="mt-1 flex items-baseline gap-2 text-sm text-ink/70">
          <span className="inline-flex flex-shrink-0 items-center gap-1.5 text-ink">
            <span className="size-2" style={{ backgroundColor: cat.sombra }} aria-hidden="true" />
            {tCat(item.categoria).toLowerCase()}
          </span>
          {item.enConstruccion && (
            <span className="flex-shrink-0 font-mono text-[11px] uppercase tracking-[0.12em]">
              · {tArchivo("enConstruccion")}
            </span>
          )}
          <span className="hidden sm:inline truncate">· {item.subtexto}</span>
        </p>
        <time dateTime={item.fecha} className="sm:hidden mt-1 block font-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
          {fechaCorta(item.fecha, locale)}
        </time>
      </div>

      <Flecha
        size={18}
        strokeWidth={2}
        aria-hidden="true"
        className="hidden sm:block text-ink/40 transition-all group-hover:translate-x-0.5 group-hover:text-accent"
      />
    </div>
  );

  return (
    <li
      className={`border-t border-ink/15 first:border-t-0 transition-opacity duration-300 ${atenuada ? "sm:opacity-35" : ""}`}
      onPointerEnter={onEntrar}
      onPointerLeave={onSalir}
      onFocus={onEntrar}
      onBlur={onSalir}
    >
      {item.externo ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
          {contenido}
        </a>
      ) : (
        <Link href={item.href} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
          {contenido}
        </Link>
      )}
    </li>
  );
}


/** Lista del archivo con vista previa: al pasar por una fila, su imagen
 *  aparece junto al cursor y el resto de filas se atenua. Solo en
 *  dispositivos con raton; en tactil la fila ya lleva su miniatura. */
function ListaConVistaPrevia({ items }: { items: ItemArchivo[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducir = useReducedMotion();
  const [activo, setActivo] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });

  const mover = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left + 28);
    y.set(e.clientY - r.top - 90);
  };

  const item = activo !== null ? items[activo] : null;
  const cat = item ? categoriaDe(item.categoria) : null;

  return (
    <div ref={ref} className="relative" onPointerMove={mover} onPointerLeave={() => setActivo(null)}>
      <ul>
        {items.map((it, i) => (
          <Fila
            key={it.href + it.titulo}
            item={it}
            atenuada={activo !== null && activo !== i}
            onEntrar={() => setActivo(i)}
            onSalir={() => setActivo((a) => (a === i ? null : a))}
          />
        ))}
      </ul>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 hidden [@media(hover:hover)_and_(pointer:fine)]:block"
        style={{ x: reducir ? x : sx, y: reducir ? y : sy }}
      >
        <AnimatePresence mode="wait">
          {item && cat && (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, scale: 0.96, clipPath: "inset(12% 0 12% 0)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0)" }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: reducir ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-64 aspect-[3/2] overflow-hidden"
              style={{ backgroundColor: cat.sombra }}
            >
              {item.imagen ? (
                <Image
                  src={item.imagen}
                  alt=""
                  fill
                  sizes="256px"
                  className="object-cover"
                  style={{ filter: item.imagenColor ? undefined : `url(#duo-${cat.id})`, objectPosition: item.imagenPosicion }}
                />
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
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
    <div className="mx-auto max-w-5xl px-6 md:px-10">
      <FiltrosDuotono />

      {/* Filtros: texto subrayado, sin pestañas de carpeta */}
      <div
        role="tablist"
        aria-label={tArchivo("categoriasAriaLabel")}
        className="flex items-baseline gap-4 sm:gap-6 overflow-x-auto border-b border-ink/15"
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
              className={`relative -mb-px flex-shrink-0 whitespace-nowrap border-b-2 pb-3 pt-1 text-sm transition-colors
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink
                ${esActiva ? "border-accent text-ink" : "border-transparent text-ink/55 hover:text-ink"}`}
            >
              {c.etiqueta}
              <span className="ml-1.5 hidden sm:inline text-xs tabular-nums text-ink/40">{cuantos}</span>
            </button>
          );
        })}
      </div>

      {/* Panel de la carpeta */}
      <div className="pt-2">
        {visibles.length === 0 ? (
          <p className="font-mono text-sm text-muted py-8 text-center">
            {activa === "todo"
              ? tArchivo("vacioTodo")
              : tArchivo("vacioCategoria", { categoria: etiquetaActiva.toLowerCase() })}
          </p>
        ) : (
          <ListaConVistaPrevia items={visibles} />
        )}
      </div>
    </div>
  );
}
