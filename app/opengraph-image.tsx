import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Andrea Robles — Tecnología humanocéntrica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1C2410",
          padding: "70px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: "#A8C63C",
            fontFamily: "monospace",
          }}
        >
          &gt; andrearobles
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            color: "#F2F5E4",
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          Trabajo en la intersección entre la tecnología y las personas.
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(242,245,228,0.7)",
          }}
        >
          Soberanía digital · Transformación social · Formación
        </div>
      </div>
    ),
    { ...size }
  );
}