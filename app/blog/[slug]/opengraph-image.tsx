import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ImageResponse } from "next/og";
import { categoriaDe } from "../../categorias";

// Runtime de Node y no edge: hay que leer el .mdx del disco para sacar el
// titulo, y en edge no hay acceso a fs.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Artículo de Andrea Robles";

// La hoja de roble, en coordenadas de su rejilla de 16x16. Satori no dibuja
// SVG complejo, asi que se pinta con divs, que es lo que ya es: pixeles.
const HOJA: [number, number, number, number][] = [
  [7, 1, 2, 1], [6, 2, 4, 1], [5, 3, 6, 1], [6, 4, 4, 1], [4, 5, 8, 1],
  [3, 6, 10, 1], [5, 7, 6, 1], [3, 8, 10, 1], [4, 9, 8, 1], [6, 10, 4, 1],
  [5, 11, 6, 1], [7, 12, 2, 1], [7, 13, 2, 2],
];

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ruta = path.join(process.cwd(), "content/posts", `${slug}.mdx`);
  const { data } = matter(fs.readFileSync(ruta, "utf8"));

  const cat = categoriaDe(data.categoria as string | undefined);
  const titulo = (data.title as string) ?? "";
  const tags = ((data.tags as string[]) ?? []).slice(0, 3);

  // El titular baja de cuerpo cuando el titulo es largo, que si no se sale.
  const cuerpo = titulo.length > 90 ? 60 : titulo.length > 55 ? 74 : 92;
  const px = 26; // lado del pixel de la hoja

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: cat.sombra,
          color: cat.luz,
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, fontFamily: "monospace", opacity: 0.75 }}>
          &gt; {cat.etiqueta.toLowerCase()}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: cuerpo,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            maxWidth: 980,
          }}
        >
          {titulo}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            fontFamily: "monospace",
            opacity: 0.75,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>{(data.date as string) ?? ""}</div>
          <div style={{ display: "flex" }}>{tags.join(" · ")}</div>
        </div>

        {/* Hoja asomando por la esquina inferior derecha */}
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
      </div>
    ),
    { ...size }
  );
}
