import Link from "next/link";
import PalabraConFoto from "./PalabraConFoto";
import Revelar from "./Revelar";
import CopiarEmail from "./CopiarEmail";
import HeroSection from "./HeroSection";
import FotoAnalisis from "./FotoAnalisis";
import ArchivoGrid, { ArchivoItem } from "./ArchivoGrid";
import { getPosts } from "./posts";

const PROYECTOS: ArchivoItem[] = [
  {
    tipo: "Proyecto",
    titulo: "Comparador de Empleabilidad FP",
    descripcion: "Herramienta para explorar la empleabilidad real de los ciclos de FP con datos públicos.",
    fecha: "2025",
    href: "#",
    externo: false,
    color: "rojo",
    span: 2,
    estado: "En construcción",
  },
];

const ARTICLE_COLORS: ArchivoItem["color"][] = ["gris", "gris", "gris", "gris", "gris"];


export default function Home() {
  const posts = getPosts();

  const archivoItems: ArchivoItem[] = [
    ...PROYECTOS,
    ...posts.map((post, i) => ({
      tipo: "Artículo" as const,
      titulo: post.title,
      descripcion: post.description,
      fecha: post.date,
      href: `/blog/${post.slug}`,
      externo: false,
      color: ARTICLE_COLORS[i % ARTICLE_COLORS.length],
      imagen: post.imagen,
    })),
  ];

  return (
    <div>
      {/* BANDA 1: HERO */}
      <HeroSection />

      {/* BANDA 2: SOBRE MÍ */}
      <section id="sobre-mi" className="w-full bg-[#FAFAF7] text-ink border-b border-[#1A1A17] scroll-mt-10">
        <Revelar>
          <div className="grid grid-cols-1 md:grid-cols-[42%_1fr] items-start">

            {/* Foto — pegada al borde izquierdo, sin padding */}
            <div className="md:sticky md:top-0">
              <FotoAnalisis />
            </div>

            {/* Texto */}
            <div className="px-8 md:px-14 py-12 md:py-20 space-y-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2">Quién soy</p>
                <h2 className="font-display text-6xl md:text-8xl font-bold leading-none">Sobre mí</h2>
              </div>
              <div className="space-y-5 text-lg leading-relaxed">
                <p>
                  Soy Andrea Robles. Llevo 8 años especializándome en tecnología y datos aplicados a proyectos de desarrollo social.
                  Empecé en Magisterio, seguí por marketing, y he continuado formándome en Big Data e IA —
                  no porque cambiara de rumbo, sino porque cada paso me acercaba a la misma pregunta: ¿en qué tipo de sociedad quiero vivir y qué papel tengo?
                </p>
                <p>
                  Desarrollo proyectos con impacto social real: pongo las herramientas —datos, automatización, digitalización— al servicio de espacios de decisión colectiva, para que los equipos y las comunidades con las que trabajo puedan decidir mejor, no solo trabajar más rápido y a más escala.
                </p>
              </div>

              <aside className="font-mono text-sm space-y-6 border-t border-ink/10 pt-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">Ahora mismo</p>
                  <p>Dirección de transformación digital en una organización social</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">Base</p>
                  <p>Barcelona · pueblo</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">Stack</p>
                  <p>
                    <span className="text-accent">Next.js</span> · N8N · Python · IA aplicada · Supabase
                  </p>
                </div>
              </aside>
            </div>

          </div>
        </Revelar>
      </section>

      {/* BANDA 4: ARCHIVO */}
      <section id="archivo" className="w-full text-ink border-b border-[#1A1A17] scroll-mt-10" style={{ background: "#EAEAE6" }}>
        <div className="px-6 md:px-8 pt-12 md:pt-20 pb-4">
          <Revelar>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2">
              Proyectos y escritura
            </p>
            <h2 className="font-display text-6xl md:text-8xl font-bold leading-none">
              Archivo
            </h2>
          </Revelar>
        </div>
        <Revelar retraso={0.1}>
          <ArchivoGrid items={archivoItems} />
        </Revelar>
      </section>

      {/* BANDA 6: CONTACTO */}
      <section id="contacto" className="w-full bg-white text-ink scroll-mt-10 border-t border-[#1A1A17]">
        <div className="px-6 md:px-8 py-12 md:py-20">
          <Revelar>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2">
              Escríbeme
            </p>
            <h2 className="font-display text-6xl md:text-8xl font-bold leading-none mb-8">
              Contacto
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