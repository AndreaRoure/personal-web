import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "../../../../i18n/navigation";
import CitaConImagen from "../../../CitaConImagen";
import CompartirPost from "../../../CompartirPost";
import DiagramaFlujo from "../../../DiagramaFlujo";
import FiltrosDuotono from "../../../FiltrosDuotono";
import HojaRoble from "../../../HojaRoble";
import { categoriaDe } from "../../../categorias";
import { getPost, slugAlterno } from "../../../posts";

// Componentes usables directamente dentro del MDX de los artículos.
const componentesMDX = { DiagramaFlujo, CitaConImagen };

type Params = { locale: string; slug: string };

// El post ya no lo lee page.tsx en solitario: generateMetadata necesita los
// mismos datos, y sin esto se duplicaria la lectura del .mdx del disco.
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};

  const otroLocale = locale === "es" ? "en" : "es";
  const slugOtroIdioma = slugAlterno(locale, slug, otroLocale);

  return {
    title: post.title,
    description: post.description,
    alternates: slugOtroIdioma
      ? { languages: { [otroLocale]: `/${otroLocale}/blog/${slugOtroIdioma}` } }
      : undefined,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function Post({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) notFound();

  const [tCat, tArticulo] = await Promise.all([
    getTranslations({ locale, namespace: "categorias" }),
    getTranslations({ locale, namespace: "articulo" }),
  ]);

  const cat = categoriaDe(post.categoria);
  const otroLocale = locale === "es" ? "en" : "es";
  const slugOtroIdioma = slugAlterno(locale, slug, otroLocale);

  return (
    <div>
      {/* Cabecera: mismo tratamiento tipografico que la portada de la tarjeta.
          Si el articulo tiene imagen, va de fondo con el duotono de su
          categoria y un velo del mismo color, que si no el titulo en lima no
          se lee sobre las zonas claras del duotono. */}
      <section
        className="relative w-full border-b-2 border-[#1A1A17] overflow-hidden"
        style={{ backgroundColor: cat.sombra, color: cat.luz }}
      >
        <FiltrosDuotono />

        {post.imagen && (
          <>
            <Image
              src={post.imagen}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ filter: `url(#duo-${cat.id})`, objectPosition: post.imagenPosicion }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ backgroundColor: cat.sombra, opacity: 0.72 }}
            />
          </>
        )}

        <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-14 md:pt-16 md:pb-20">
          <Link
            href="/#archivo"
            className="inline-block font-mono text-xs uppercase tracking-[0.2em] mb-8 hover:opacity-100 transition-opacity"
            style={{ opacity: 0.75 }}
          >
            {tArticulo("volverArchivo")}
          </Link>
          <p className="font-mono text-xs uppercase tracking-[0.16em] mb-4" style={{ opacity: 0.75 }}>
            {tCat(post.categoria)} · {post.date} · {tArticulo("minutosLectura", { n: post.minutos })}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold max-w-4xl leading-[1.02] text-balance">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] uppercase tracking-[0.12em] border rounded-full px-3 py-1"
                  style={{ borderColor: "currentColor", opacity: 0.7 }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* La hoja asomando por la esquina, como en la portada */}
        <div
          aria-hidden="true"
          className="absolute right-[-2%] bottom-[-14%] w-[22%] max-w-[220px] hidden sm:block"
          style={{ opacity: 0.14, color: cat.luz }}
        >
          <HojaRoble tamano="100%" color="currentColor" />
        </div>
      </section>

      <section className="w-full bg-[#FAFAF7] text-ink">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <article className="prose prose-lg max-w-2xl prose-headings:font-display prose-headings:font-semibold prose-a:text-accent prose-a:decoration-2 prose-blockquote:border-accent prose-strong:text-ink prose-code:text-accent prose-pre:bg-ink/5">
            <MDXRemote
              source={post.content}
              components={componentesMDX}
              options={{
                mdxOptions: { remarkPlugins: [remarkGfm] },
                // Los .mdx de content/posts/ los escribo yo, no son
                // contenido de terceros — sin esto, next-mdx-remote borra en
                // silencio cualquier expresion JS del MDX (es su medida de
                // seguridad por defecto para contenido no confiable), y los
                // props tipo objeto/array de componentes como DiagramaFlujo
                // llegaban siempre "undefined".
                blockJS: false,
              }}
            />
          </article>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-14">
            <Link
              href="/#archivo"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
            >
              <span className="text-accent">←</span> {tArticulo("volverAlArchivo")}
            </Link>
            {slugOtroIdioma && (
              <Link
                href={`/blog/${slugOtroIdioma}`}
                locale={otroLocale}
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
              >
                <span className="text-accent">🌐</span> {tArticulo("leerEnOtroIdioma")}
              </Link>
            )}
          </div>

          <div className="mt-16 pt-12 border-t border-ink/10">
            <p className="text-sm text-muted mb-4">{tArticulo("compartirTexto")}</p>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://ko-fi.com/andrearoblescastro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-accent text-accent rounded-md hover:bg-accent hover:text-white transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span aria-hidden="true">☕</span>
                {tArticulo("apoyarKofi")}
              </a>
              <span className="w-px self-stretch bg-ink/15 mx-1" aria-hidden="true" />
              <CompartirPost titulo={post.title} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
