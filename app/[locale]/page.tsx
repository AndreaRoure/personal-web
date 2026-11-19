import { getTranslations } from "next-intl/server";
import Revelar from "../Revelar";
import CopiarEmail from "../CopiarEmail";
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
  const [tSobreMi, tArchivo, tContacto] = await Promise.all([
    getTranslations({ locale, namespace: "sobreMi" }),
    getTranslations({ locale, namespace: "archivo" }),
    getTranslations({ locale, namespace: "contacto" }),
  ]);

  const posts = getPosts(locale);

  // El Comparador de Empleabilidad FP (side project) esta fuera del archivo
  // por ahora — se retoma mas adelante. La categoria "side" se queda
  // definida en categorias.ts y en ArchivoTabs; sin items, esa pestaña
  // muestra el mensaje de "todavia no hay nada aqui" en vez de desaparecer.
  const archivoItems: ItemArchivo[] = [
    ...posts.map((post) => ({
      categoria: (post.categoria as CategoriaId) ?? "articulos",
      titulo: post.title,
      subtexto: post.description,
      fecha: post.date,
      href: `/blog/${post.slug}`,
      externo: false,
      imagen: post.imagen,
      imagenPosicion: post.imagenPosicion,
      imagenColor: post.imagenColor,
      tags: post.tags,
    })),
  ];

  return (
    <div>
      {/* BANDA 2: SOBRE MÍ */}
      <section id="sobre-mi" className="w-full bg-[#FAFAF7] text-ink border-b border-ink/15 scroll-mt-10">
        <Revelar>
          <div className="mx-auto max-w-5xl px-6 md:px-10 py-14 md:py-24 grid grid-cols-1 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] gap-10 md:gap-16 items-start">

            {/* Foto — pegada al borde izquierdo, sin padding */}
            <div className="w-48 md:w-full md:sticky md:top-24">
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
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-none">{tSobreMi("titulo")}</h2>
              </div>
              <div className="space-y-4 text-base md:text-[17px] leading-relaxed text-ink/85">
                <p>{tSobreMi("p1")}</p>
                <p>{tSobreMi("p2")}</p>
              </div>

              <div className="border-t border-ink/15 pt-8">
                <Trayectoria />
              </div>
            </div>

          </div>
        </Revelar>
      </section>

      {/* BANDA 4: ARCHIVO */}
      <section id="archivo" className="w-full bg-white text-ink border-b border-ink/15 scroll-mt-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 pt-14 md:pt-24 pb-6">
          <Revelar>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-none">
              {tArchivo("titulo")}
            </h2>
          </Revelar>
        </div>
        <Revelar retraso={0.1}>
          <ArchivoTabs items={archivoItems} />
        </Revelar>
        <div className="h-14 md:h-24" />
      </section>

      {/* BANDA 6: CONTACTO */}
      <section id="contacto" className="w-full bg-[#FAFAF7] text-ink scroll-mt-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 py-14 md:py-24">
          <Revelar>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-none mb-6">
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
