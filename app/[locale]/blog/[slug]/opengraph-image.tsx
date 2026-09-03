import fs from "fs";
import path from "path";
import sharp from "sharp";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { categoriaDe } from "../../../categorias";
import { getPost } from "../../../posts";

// Satori (el motor detras de ImageResponse) no soporta filtros SVG
// arbitrarios (url(#duo-...)) ni object-fit/object-position en <img> — con
// eso puesto el recorte salia descontrolado. La solucion: recortar la
// imagen nosotros mismos con sharp al tamaño exacto del hueco antes de
// dársela a Satori, asi no necesita fit ni position, solo la pinta tal cual.
function parsePosicion(pos: string): { x: number; y: number } {
  const partes = pos.trim().split(/\s+/);
  if (partes.length === 1) {
    const p = partes[0];
    if (p === "top") return { x: 0.5, y: 0 };
    if (p === "bottom") return { x: 0.5, y: 1 };
    if (p === "left") return { x: 0, y: 0.5 };
    if (p === "right") return { x: 1, y: 0.5 };
    if (p.endsWith("%")) return { x: parseFloat(p) / 100, y: 0.5 };
    return { x: 0.5, y: 0.5 };
  }
  const mapaX: Record<string, number> = { left: 0, center: 0.5, right: 1 };
  const mapaY: Record<string, number> = { top: 0, center: 0.5, bottom: 1 };
  const val = (token: string, mapa: Record<string, number>) =>
    token in mapa ? mapa[token] : token.endsWith("%") ? parseFloat(token) / 100 : 0.5;
  return { x: val(partes[0], mapaX), y: val(partes[1], mapaY) };
}

async function imagenRecortada(
  rutaPublica: string,
  posicion: string,
  anchoDestino: number,
  altoDestino: number
): Promise<string | null> {
  try {
    const buffer = fs.readFileSync(path.join(process.cwd(), "public", rutaPublica));
    const meta = await sharp(buffer).metadata();
    if (!meta.width || !meta.height) return null;

    // Misma logica que object-fit: cover — escala al minimo que cubra el
    // hueco entero, y luego recorta el sobrante segun la posicion pedida.
    const escala = Math.max(anchoDestino / meta.width, altoDestino / meta.height);
    const anchoEscalado = Math.ceil(meta.width * escala);
    const altoEscalado = Math.ceil(meta.height * escala);

    const { x, y } = parsePosicion(posicion);
    const left = Math.max(0, Math.min(Math.round((anchoEscalado - anchoDestino) * x), anchoEscalado - anchoDestino));
    const top = Math.max(0, Math.min(Math.round((altoEscalado - altoDestino) * y), altoEscalado - altoDestino));

    const recortado = await sharp(buffer)
      .resize(anchoEscalado, altoEscalado)
      .extract({ left, top, width: anchoDestino, height: altoDestino })
      .png()
      .toBuffer();

    return `data:image/png;base64,${recortado.toString("base64")}`;
  } catch {
    return null;
  }
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Andrea Robles";

// Ancho del panel de foto cuando el articulo trae imagen. Al recortar solo
// a este ancho (no a los 1200px enteros) una foto cuadrada no necesita un
// zoom tan bestia para cubrir el hueco — de paso evita el panel de texto
// quedando ilegible encima de la imagen.
const ANCHO_IMAGEN = 460;

// La hoja de roble, en coordenadas de su rejilla de 16x16. Satori no dibuja
// SVG complejo, asi que se pinta con divs, que es lo que ya es: pixeles.
const HOJA: [number, number, number, number][] = [
  [7, 1, 2, 1], [6, 2, 4, 1], [5, 3, 6, 1], [6, 4, 4, 1], [4, 5, 8, 1],
  [3, 6, 10, 1], [5, 7, 6, 1], [3, 8, 10, 1], [4, 9, 8, 1], [6, 10, 4, 1],
  [5, 11, 6, 1], [7, 12, 2, 1], [7, 13, 2, 2],
];

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  const t = await getTranslations({ locale, namespace: "categorias" });

  const cat = categoriaDe(post?.categoria);
  const titulo = post?.title ?? "";
  const etiquetaCategoria = t(post?.categoria ?? "articulos");
  const tags = (post?.tags ?? []).slice(0, 3);

  const imagenFondo = post?.imagen
    ? await imagenRecortada(post.imagen, post.imagenPosicion, ANCHO_IMAGEN, size.height)
    : null;

  const anchoTexto = imagenFondo ? size.width - ANCHO_IMAGEN : size.width;
  // El titular baja de cuerpo cuando el titulo es largo o el panel es
  // estrecho (con foto al lado), que si no se sale.
  const cuerpo = imagenFondo
    ? titulo.length > 70 ? 46 : titulo.length > 40 ? 58 : 70
    : titulo.length > 90 ? 60 : titulo.length > 55 ? 74 : 92;
  const px = 26; // lado del pixel de la hoja

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          fontFamily: "sans-serif",
        }}
      >
        {/* Panel de texto */}
        <div
          style={{
            width: anchoTexto,
            height: size.height,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: cat.sombra,
            color: cat.luz,
            padding: "64px 56px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", fontSize: 26, fontFamily: "monospace", opacity: 0.75 }}>
            &gt; {etiquetaCategoria.toLowerCase()}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: cuerpo,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
            }}
          >
            {titulo}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: imagenFondo ? "column" : "row",
              justifyContent: imagenFondo ? "flex-start" : "space-between",
              gap: imagenFondo ? 8 : 0,
              fontSize: 22,
              fontFamily: "monospace",
              opacity: 0.75,
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex" }}>{post?.date ?? ""}</div>
            <div style={{ display: "flex" }}>{tags.join(" · ")}</div>
          </div>

          {/* Hoja asomando por la esquina: solo cuando no hay foto que ya
              le de personalidad propia a la tarjeta */}
          {!imagenFondo && (
            <div
              style={{
                position: "absolute",
                right: -40,
                bottom: -70,
                width: 16 * px,
                height: 16 * px,
                display: "flex",
                opacity: 0.16,
              }}
            >
              {HOJA.map(([x, y, w, h], i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: x * px,
                    top: y * px,
                    width: w * px,
                    height: h * px,
                    backgroundColor: cat.luz,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Panel de foto: recortada ya al ancho exacto, sin estirarla a
            toda la tarjeta — evita el zoom extremo de fotos cuadradas */}
        {imagenFondo && (
          <div style={{ display: "flex", width: ANCHO_IMAGEN, height: size.height, position: "relative" }}>
            <img
              src={imagenFondo}
              alt=""
              width={ANCHO_IMAGEN}
              height={size.height}
              style={{ width: ANCHO_IMAGEN, height: size.height }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 8,
                height: size.height,
                display: "flex",
                backgroundColor: cat.sombra,
              }}
            />
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
