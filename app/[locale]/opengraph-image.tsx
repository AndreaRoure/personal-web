import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

// "edge" esta deprecado desde Next 16.3 a favor del runtime nodejs por
// defecto; ImageResponse funciona igual sin declararlo.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#2B3300";
const LIMA = "#F7FFCC";
const ACCENT = "#7A9201";

// La hoja en su rejilla de 16x16. Satori no dibuja SVG complejo, asi que se
// pinta con divs, que es lo que ya es: pixeles.
const HOJA: [number, number, number, number][] = [
  [7, 1, 2, 1], [6, 2, 4, 1], [5, 3, 6, 1], [6, 4, 4, 1], [4, 5, 8, 1],
  [3, 6, 10, 1], [5, 7, 6, 1], [3, 8, 10, 1], [4, 9, 8, 1], [6, 10, 4, 1],
  [5, 11, 6, 1], [7, 12, 2, 1], [7, 13, 2, 2],
];

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "og" });
  const px = 26;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: LIMA,
          color: INK,
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, fontFamily: "monospace", color: ACCENT }}>
          &gt; {t("sitePrefijo")}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            maxWidth: 940,
          }}
        >
          {t("siteTitular")}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontFamily: "monospace",
            textTransform: "uppercase",
            color: ACCENT,
          }}
        >
          {t("siteSubtitulo")}
        </div>

        <div
          style={{
            position: "absolute",
            right: -40,
            bottom: -70,
            width: 16 * px,
            height: 16 * px,
            display: "flex",
            opacity: 0.18,
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
                backgroundColor: ACCENT,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
