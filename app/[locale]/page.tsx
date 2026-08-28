import { getTranslations } from "next-intl/server";
import Revelar from "../Revelar";
import CopiarEmail from "../CopiarEmail";
import HeroSection from "../HeroSection";
import FotoAnalisis from "../FotoAnalisis";
import Trayectoria from "../Trayectoria";
import ArchivoTabs, { type CategoriaId, type ItemArchivo } from "../ArchivoTabs";
import { getPosts } from "../posts";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [tSobreMi, tHero, tArchivo, tContacto, tProyectos] = await Promise.all([
    getTranslations({ locale, namespace: "sobreMi" }),
    getTranslations({ locale, namespace: "hero" }),
    getTranslations({ locale, namespace: "archivo" }),
    getTranslations({ locale, namespace: "contacto" }),
    getTranslations({ locale, namespace: "proyectos" }),
  ]);

  const posts = getPosts(locale);

  const proyectos: ItemArchivo[] = [
    {
      categoria: "side",
      titulo: tProyectos("comparadorFP.titulo"),
      subtexto: tProyectos("comparadorFP.subtexto"),
      fecha: "2025",
      href: "#",
      externo: false,
      enConstruccion: true,
    },
  ];

  const archivoItems: ItemArchivo[] = [
    ...proyectos,
    ...posts.map((post) => ({
      categoria: (post.categoria as CategoriaId) ?? "articulos",
      titulo: post.title,
      subtexto: post.description,
      fecha: post.date,
      href: `/blog/${post.slug}`,
      externo: false,
      imagen: post.imagen,
      tags: post.tags,
    })),
  ];

  return (
    <div>
      {/* BANDA 1: HERO */}
      <HeroSection
        textos={{
          titularPre: tHero("titularPre"),
          titularFuerte: tHero("titularFuerte"),
          titularPost: tHero("titularPost"),
          scroll: tHero("scroll"),
          pistaJuego: tHero("pistaJuego"),
          marcador: tHero("marcador"),
          ganasteTitulo: tHero("ganasteTitulo"),
          ganasteSubtitulo: tHero("ganasteSubtitulo"),
          perdisteTitulo: tHero("perdisteTitulo"),
          perdisteSubtitulo: tHero("perdisteSubtitulo"),
        }}
      />

      {/* BANDA 2: SOBRE MÍ */}
      <section id="sobre-mi" className="w-full bg-[#FAFAF7] text-ink border-b border-[#1A1A17] scroll-mt-10">
        <Revelar>
          <div className="grid grid-cols-1 md:grid-cols-[42%_1fr] items-start">

            {/* Foto — pegada al borde izquierdo, sin padding */}
            <div className="md:sticky md:top-0">
              <FotoAnalisis
                alt="Andrea Robles"
                textos={{
                  curiosidad: tSobreMi("fotoAlt.curiosidad"),
                  naturaleza: tSobreMi("fotoAlt.naturaleza"),
                  analogica: tSobreMi("fotoAlt.analogica"),
                  observadora: tSobreMi("fotoAlt.observadora"),
                  musica: tSobreMi("fotoAlt.musica"),
                  urbana: tSobreMi("fotoAlt.urbana"),
                  encorsetable: tSobreMi("fotoAlt.encorsetable"),
                  tech: tSobreMi("fotoAlt.tech"),
                }}
              />
            </div>

            {/* Texto */}
            <div className="px-8 md:px-14 py-12 md:py-20 space-y-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2">{tSobreMi("kicker")}</p>
                <h2 className="font-display text-5xl md:text-6xl font-bold leading-none">{tSobreMi("titulo")}</h2>
              </div>
              <div className="space-y-5 text-lg leading-relaxed">
                <p>{tSobreMi("p1")}</p>
                <p>{tSobreMi("p2")}</p>
                <p>{tSobreMi("p3")}</p>
              </div>

              <div className="border-t-2 border-ink/10 pt-8">
                <Trayectoria />
              </div>

              <div className="border-t-2 border-ink/10 pt-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
                  {tSobreMi("stackLabel")}
                </p>
                <p className="font-mono text-sm">
                  <span className="text-accent">Next.js</span> · N8N · Python · {locale === "es" ? "IA aplicada" : "Applied AI"} · Supabase
                </p>
              </div>
            </div>

          </div>
        </Revelar>
      </section>

      {/* BANDA 4: ARCHIVO */}
      <section id="archivo" className="w-full text-ink border-b border-[#1A1A17] scroll-mt-10" style={{ background: "#EAEAE6" }}>
        <div className="px-4 sm:px-6 md:px-8 pt-12 md:pt-20 pb-5">
          <Revelar>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2">
              {tArchivo("kicker")}
            </p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold leading-none">
              {tArchivo("titulo")}
            </h2>
          </Revelar>
        </div>
        <Revelar retraso={0.1}>
          <ArchivoTabs items={archivoItems} />
        </Revelar>
        <div className="h-12 md:h-20" />
      </section>

      {/* BANDA 6: CONTACTO */}
      <section id="contacto" className="w-full bg-white text-ink scroll-mt-10 border-t border-[#1A1A17]">
        <div className="px-6 md:px-8 py-12 md:py-20">
          <Revelar>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2">
              {tContacto("kicker")}
            </p>
            <h2 className="font-display text-6xl md:text-8xl font-bold leading-none mb-8">
              {tContacto("titulo")}
            </h2>
            <p className="text-muted mb-8 max-w-xl">{tContacto("texto")}</p>
            <CopiarEmail email="hola@andrearobles.net" />
          </Revelar>
        </div>
      </section>
    </div>
  );
}
