// Las posiciones son fijas (dependen del encuadre de la foto), pero el texto
// de cada etiqueta se recibe traducido: son las mismas 8 cajas en los dos
// idiomas, solo cambia lo que dicen.
const CAJAS = [
  { clave: "curiosidad", top: "20%", left: "6%", width: "60%", height: "35%" },
  { clave: "naturaleza", top: "4%", left: "40%", width: "56%", height: "44%" },
  { clave: "analogica", top: "2%", left: "4%", width: "52%", height: "26%" },
  { clave: "observadora", top: "40%", left: "16%", width: "46%", height: "22%" },
  { clave: "musica", top: "62%", left: "4%", width: "46%", height: "22%" },
  { clave: "urbana", top: "57%", left: "36%", width: "56%", height: "26%" },
  { clave: "encorsetable", top: "78%", left: "8%", width: "60%", height: "18%" },
  { clave: "tech", top: "46%", left: "58%", width: "38%", height: "18%" },
] as const;

const C = "#DC4632";

export default function FotoAnalisis({
  textos,
  alt,
}: {
  textos: Record<(typeof CAJAS)[number]["clave"], string>;
  alt: string;
}) {
  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- ver comentario de abajo */}
      <img
        src="/andrea-about.jpg"
        alt={alt}
        // Fichero ya optimizado (1080 px, ~JPEG progresivo) en vez de
        // next/image: por /_next/image se perderia la cabecera
        // X-Robots-Tag: noimageindex que tiene /andrea-about.jpg.
        // lazy: sin esto React la precargaba en el <head> de la home,
        // compitiendo con fuentes y titular.
        width={1080}
        height={1440}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-top grayscale contrast-110"
      />
      {CAJAS.map((c) => (
        <div
          key={c.clave}
          className="absolute"
          style={{ top: c.top, left: c.left, width: c.width, height: c.height, border: `1.5px solid ${C}` }}
        >
          <span
            className="absolute top-0 left-0 font-mono leading-none px-1 py-0.5 text-white whitespace-nowrap"
            style={{ backgroundColor: C, fontSize: "10px" }}
          >
            {textos[c.clave]}
          </span>
        </div>
      ))}
    </div>
  );
}
