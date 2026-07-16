import PalabraConFoto from "./PalabraConFoto";
import KickerRotativo from "./KickerRotativo";
import Icono from "./Icono";

const proyectos = [
  {
    nombre: "Comparador de Empleabilidad FP",
    descripcion:
      "Herramienta para explorar la empleabilidad real de los ciclos de FP con datos públicos.",
    estado: "construccion",
  },
];

const estados: Record<string, { texto: string; clases: string }> = {
  construccion: {
    texto: "En construcción",
    clases: "bg-sky/30 border-sky text-ink",
  },
  activo: {
    texto: "Activo",
    clases: "bg-accent/25 border-accent text-ink",
  },
  pausado: {
    texto: "En pausa",
    clases: "bg-lima border-ink/20 text-muted",
  },
};

export default function Home() {
  return (
    <div>
      <div className="animate-aparecer">
        <KickerRotativo />
      </div>

      <h1
        className="font-display text-6xl md:text-7xl font-semibold leading-[1.05] mb-10 max-w-5xl animate-aparecer"
        style={{ animationDelay: "0.15s" }}
      >
        Trabajo en la intersección entre la{" "}
        <span
          className="marcador-animado marcador-cielo"
          style={{ animationDelay: "0.6s" }}
        >
          tecnología
        </span>{" "}
        y las{" "}
        <span
          className="marcador-animado marcador-lima"
          style={{ animationDelay: "1.1s" }}
        >
          personas
        </span>
        .
      </h1>
<a href="#proyectos" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-14 animate-aparecer" style={{ animationDelay: "0.45s" }}><span className="text-accent">↓</span> proyectos y más abajo</a>

      <div className="animate-aparecer" style={{ animationDelay: "0.3s" }}>
        <div className="space-y-5 text-lg leading-relaxed max-w-2xl">
          <p>
            Soy{" "}
            <PalabraConFoto src="/andrea.png" rotacion={-3}>
              Andrea Robles
            </PalabraConFoto>
            . Empecé en Magisterio, seguí por marketing, y terminé formándome
            en Big Data e IA — no porque cambiara de rumbo, sino porque cada
            paso me acercaba a la misma pregunta: ¿cómo hacemos que la
            tecnología sirva a las personas, y no al revés?
          </p>
          <p>
            Hoy dirijo la transformación digital de una organización social,
            donde cada decisión técnica (qué herramienta usar{" "}
            <Icono nombre="herramienta" />, qué datos recoger{" "}
            <Icono nombre="datos" />, qué automatizar{" "}
            <Icono nombre="automatizar" />) se mide con una vara distinta a la
            de una empresa.
          </p>
        </div>

        <blockquote className="border-l-2 border-accent pl-6 my-10 text-xl leading-relaxed text-ink/80 max-w-2xl">
          Creo en la soberanía digital — que las organizaciones y las personas
          controlen sus herramientas y sus datos, no al revés.
        </blockquote>

        <div className="space-y-5 text-lg leading-relaxed max-w-2xl">
          <p>
            Creo en la formación <Icono nombre="formacion" /> como palanca de
            cambio real. Y creo que los modelos alternativos de vida y
            organización (cooperativismo <Icono nombre="brote" />, espacios
            democráticos) no son una utopía, son una forma práctica de hacer
            las cosas de otra manera.
          </p>
          <p>
            Este espacio es donde voy dejando por escrito lo que aprendo en el
            camino.
          </p>
        </div>

        <section
          id="proyectos"
          className="mt-20 pt-10 border-t border-ink/10 scroll-mt-10"
        >
          <h2 className="font-display text-3xl font-semibold mb-8">
            Proyectos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proyectos.map((p) => (
              <div
                key={p.nombre}
                className="border border-ink/15 rounded-xl p-6 hover:bg-sky/10 hover:border-ink hover:-translate-y-0.5 transition-all"
              >
                <p className="font-display text-xl font-semibold">
                  {p.nombre}
                </p>
                <span
                  className={`inline-block text-xs uppercase tracking-wide border rounded-full px-3 py-1 mt-3 ${estados[p.estado].clases}`}
                >
                  {estados[p.estado].texto}
                </span>
                <p className="text-muted text-sm mt-3 leading-relaxed">
                  {p.descripcion}
                </p>
              </div>
            ))}
            <div className="border border-dashed border-ink/20 rounded-xl p-6 flex items-center justify-center text-muted text-sm min-h-[140px]">
              próximo proyecto…
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}