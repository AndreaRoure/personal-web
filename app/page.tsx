import Link from "next/link";
import PalabraConFoto from "./PalabraConFoto";
import KickerRotativo from "./KickerRotativo";
import HojaRoble from "./HojaRoble";
import Revelar from "./Revelar";
import CopiarEmail from "./CopiarEmail";
import { getPosts } from "./posts";


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
  const posts = getPosts();

  return (
    <div>
      {/* BANDA 1: HERO */}
      <section className="w-full bg-white text-ink relative overflow-hidden border-b border-[#1A1A17]">
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
          <a href="#proyectos" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mt-10 animate-aparecer" style={{ animationDelay: "0.45s" }}><span className="text-accent">↓</span> proyectos y más abajo</a>
        </div>
      </section>

      {/* BANDA 2: SOBRE MÍ */}
      <section id="sobre-mi" className="w-full bg-[#FAFAF7] text-ink border-b border-[#1A1A17] scroll-mt-10">
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
                  . Llevo 8 años especializándome en tecnología y datos aplicados a proyectos de desarrollo social. 
                  Empecé en Magisterio, seguí por marketing, y he continuado formándome en Big Data e IA —
                  no porque cambiara de rumbo, sino porque cada paso me acercaba a la misma pregunta: ¿en qué tipo de sociedad quiero vivir y qué papel tengo?
                </p>
                <p>
                Desarrollo proyectos con impacto social real: pongo las herramientas —datos, automatización, digitalización— al servicio de espacios de decisión colectiva, para que los equipos y las comunidades con las que trabajo puedan decidir mejor, no solo trabajar más rápido y a más escala.
                </p>
                <p>
                 Creo en la soberanía digital y en la formación como palanca de cambio,
                para que las organizaciones y las personas controlen sus herramientas y sus datos, no al revés.
           
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
                    Modelos alternativos · Tecnología para la transformación social                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">
                    Stack
                  </p>
                  <p>
                    <span className="text-accent">Next.js</span> · N8N ·
                    Python · IA aplicada · Supabase · Postgres 
                  </p>
                </div>
              </aside>
            </div>
          </Revelar>
        </div>
      </section>

      {/* BANDA 3: CITA LIMA */}
      <section className="bg-lima text-ink relative overflow-hidden border-b border-[#1A1A17] w-full">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 relative">
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 rotate-12 hidden xl:block">
            <HojaRoble tamano={220} color="#7A9201" opacidad={0.18} />
          </div>
          <Revelar>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-8">
              Lo que creo
            </p>
            <blockquote className="font-display text-4xl md:text-5xl font-medium leading-tight max-w-3xl relative">
              Creo en la <span className="text-accent">formación</span> y la{" "}
              <span className="text-accent">soberanía digital</span>, para que
              las organizaciones y las personas controlen sus herramientas y
              sus datos, no al revés.
            </blockquote>
          </Revelar>
        </div>
      </section>

      {/* BANDA 4: PROYECTOS */}
      <section id="proyectos" className="w-full bg-white text-ink border-b border-[#1A1A17] scroll-mt-10">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
          <Revelar>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
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
                  className="bg-lima text-ink border-2 border-ink rounded-lg p-6 shadow-[6px_6px_0_#1A1A17] hover:shadow-[9px_9px_0_#1A1A17] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
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
              <div className="border-2 border-dashed border-ink/20 rounded-lg p-6 flex items-center justify-center text-muted text-sm min-h-[140px]">
                próximo proyecto…
              </div>
            </div>
          </Revelar>
        </div>
      </section>

      {/* BANDA 5: BLOG */}
      <section
        id="blog"
        className="w-full bg-[#FAFAF7] text-ink border-b border-[#1A1A17] scroll-mt-10"
      >
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
          <Revelar>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
              Blog
            </p>
            <h2 className="font-display text-3xl font-semibold mb-2">
              Lo que te comparto
            </h2>
            <p className="text-muted mb-8 max-w-xl">
              Noticias y notas de campo sobre tecnología, soberanía digital y
              organizaciones sociales.
            </p>
          </Revelar>
          {posts.length === 0 && (
            <p className="text-muted">Próximamente los primeros artículos.</p>
          )}
          <ul className="max-w-3xl">
            {posts.map((post, indice) => (
              <li
                key={post.slug}
                className="border-b border-ink/10 last:border-b-0"
              >
                <Revelar retraso={indice * 0.08}>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ borderLeftColor: post.color }}
                    className="group block py-8 pl-5 border-l-4 hover:opacity-60 transition-opacity"
                  >
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <p className="font-mono text-xs text-muted font-medium">
                        {post.date}
                      </p>
                      <span className="text-xs text-muted bg-white border border-ink/10 px-2.5 py-1 rounded-md whitespace-nowrap">
                        {post.minutos} min
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold leading-snug mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed max-w-2xl mb-4">
                      {post.description}
                    </p>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-muted border border-ink/15 px-2.5 py-1 rounded-md hover:border-ink/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </Revelar>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BANDA 6: CONTACTO */}
      <section id="contacto" className="w-full bg-white text-ink scroll-mt-10">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
          <Revelar>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
              Contacto
            </p>
            <h2 className="font-display text-3xl font-semibold mb-4">
              <span className="marcador-animado marcador-cielo">Hablemos</span>
            </h2>
            <p className="text-muted mb-8 max-w-xl">
              Escríbeme si quieres proponerme un proyecto, si te interesa una
              formación, o si quieres comentar algo de lo que escribo.
            </p>
            <CopiarEmail email="robleshca@gmail.com" />
          </Revelar>
        </div>
      </section>
    </div>
  );
}