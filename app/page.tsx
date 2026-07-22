import PalabraConFoto from "./PalabraConFoto";
import KickerRotativo from "./KickerRotativo";
import Icono from "./Icono";
import HojaRoble from "./HojaRoble";
import Revelar from "./Revelar";


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
    clases: "bg-sky text-ink",
  },
  activo: {
    texto: "Activo",
    clases: "bg-accent text-crema",
  },
  pausado: {
    texto: "En pausa",
    clases: "bg-ink/10 text-ink",
  },
};


export default function Home() {
  return (
    <div>
      {/* BANDA 1: HERO DARK */}
{/* BANDA 1: HERO DARK */}
      <section className="bg-dark text-crema relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-12 md:pt-24 md:pb-24 relative z-10 pointer-events-none">

          <div className="animate-aparecer">
            <KickerRotativo />
          </div>
          <h1
            className="font-display text-5xl md:text-8xl font-semibold leading-[1.05] animate-aparecer"
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
          <a href="#proyectos" className="inline-flex items-center gap-2 text-sm text-crema-muted hover:text-accent-dark transition-colors mt-10 animate-aparecer" style={{ animationDelay: "0.45s" }}><span className="text-accent-dark">↓</span> proyectos y más abajo</a>
        </div>
      </section>

      {/* BANDA 2: SOBRE MÍ CLARA */}
      <section className="bg-bg text-ink">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
          <Revelar>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-8">
              Sobre mí
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-5 text-lg leading-relaxed">
                <p>
                  Soy{" "}
                 <PalabraConFoto src="/andrea.png" rotacion={-3}>
                    Andrea Robles
                  </PalabraConFoto>
                  . Empecé en Magisterio, seguí por marketing, y terminé formándome en
                  Big Data e IA — no porque cambiara de rumbo, sino porque
                  cada paso me acercaba a la misma pregunta: ¿cómo hacemos que
                  la tecnología sirva a las personas, y no al revés?
                </p>
                <p>
                  Hoy dirijo la transformación digital de una organización
                  social, donde cada decisión técnica (qué herramienta usar{" "}
                  <Icono nombre="herramienta" />, qué datos recoger{" "}
                  <Icono nombre="datos" />, qué automatizar{" "}
                  <Icono nombre="automatizar" />) se mide con una vara
                  distinta a la de una empresa.
                </p>
                <p>
                  Creo en la formación <Icono nombre="formacion" /> como
                  palanca de cambio real. Y creo que los modelos alternativos
                  de vida y organización (cooperativismo{" "}
                  <Icono nombre="brote" />, espacios democráticos) no son una
                  utopía, son una forma práctica de hacer las cosas de otra
                  manera.
                </p>
              </div>

              <aside className="font-mono text-sm space-y-6 md:border-l md:border-ink/10 md:pl-8 self-start">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">
                    Ahora mismo
                  </p>
                  <p>
                    Dirección de transformación digital en una organización
                    social
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">
                    Base
                  </p>
                  <p>Barcelona</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">
                    Temas
                  </p>
                  <p>
                    Soberanía digital · Formación · Datos con criterio ·
                    Modelos alternativos
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">
                    Stack
                  </p>
                  <p>
                    <span className="text-accent">Next.js</span> · Power BI ·
                    Python · IA aplicada
                  </p>
                </div>
              </aside>
            </div>
          </Revelar>
        </div>
      </section>

      {/* BANDA 3: CITA LIMA */}
      <section className="bg-lima text-ink relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 relative">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 rotate-12 hidden md:block">
            <HojaRoble tamano={220} color="#7A9201" opacidad={0.18} />
          </div>
          <Revelar>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-8">
              Lo que creo
            </p>
            <blockquote className="font-display text-4xl md:text-5xl font-medium leading-tight max-w-4xl relative">
              Creo en la <span className="text-accent">soberanía digital</span>{" "}
              — que las organizaciones y las personas controlen sus
              herramientas y sus datos, no al revés.
            </blockquote>
          </Revelar>
        </div>
      </section>

      {/* BANDA 4: PROYECTOS DARK */}
      <section id="proyectos" className="bg-dark text-crema scroll-mt-10">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
          <Revelar>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-dark mb-3">
              Proyectos
            </p>
            <h2 className="font-display text-3xl font-semibold mb-8">
              Cosas que construyo
            </h2>
          </Revelar>
         <Revelar retraso={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              {proyectos.map((p) => (
                <div
                  key={p.nombre}
                  className="bg-lima text-ink border-2 border-ink rounded-lg p-6 shadow-[6px_6px_0_#A8C63C] hover:shadow-[9px_9px_0_#A8C63C] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                >
                  <p className="font-display text-xl font-semibold">
                    {p.nombre}
                  </p>
                  <span
                    className={`inline-block text-xs uppercase tracking-wide border-2 border-ink rounded-full px-3 py-1 mt-3 ${estados[p.estado].clases}`}
                  >
                    {estados[p.estado].texto}
                  </span>
                  <p className="text-ink/70 text-sm mt-3 leading-relaxed">
                    {p.descripcion}
                  </p>
                </div>
              ))}
              <div className="border-2 border-dashed border-crema/30 rounded-lg p-6 flex items-center justify-center text-crema-muted text-sm min-h-[140px]">
                próximo proyecto…
              </div>
            </div>
          </Revelar>
        </div>
      </section>
    </div>
  );
}