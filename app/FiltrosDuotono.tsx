import { CATEGORIAS } from "./categorias";

const aTabla = (hex: string) =>
  hex.replace("#", "").match(/../g)!.map((h) => parseInt(h, 16) / 255);

/** Filtros SVG de duotono, uno por categoria. Se declaran una vez por pagina y
 *  evitan pregenerar una imagen por color: cualquier imagen que pase por aqui
 *  sale en la paleta. */
export default function FiltrosDuotono() {
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
