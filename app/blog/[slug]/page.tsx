import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import CompartirPost from "../../CompartirPost";
import FiltrosDuotono from "../../FiltrosDuotono";
import HojaRoble from "../../HojaRoble";
import { categoriaDe } from "../../categorias";

const postsDirectory = path.join(process.cwd(), "content/posts");

function calcularMinutos(texto: string) {
  const palabras = texto.trim().split(/\s+/).length;
  return Math.max(1, Math.round(palabras / 200));
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContent);
  const tags = (data.tags as string[]) ?? [];
  const minutos = calcularMinutos(content);
  const cat = categoriaDe(data.categoria as string | undefined);

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

        {data.imagen && (
          <>
            <Image
              src={data.imagen as string}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ filter: `url(#duo-${cat.id})` }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ backgroundColor: cat.sombra, opacity: 0.72 }}
            />
          </>
        )}

        <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-14 md:pt-16 md:pb-20">
          <a
            href="/#archivo"
            className="inline-block font-mono text-xs uppercase tracking-[0.2em] mb-8 hover:opacity-100 transition-opacity"
            style={{ opacity: 0.75 }}
          >
            ← Archivo
          </a>
          <p className="font-mono text-xs uppercase tracking-[0.16em] mb-4" style={{ opacity: 0.75 }}>
            {cat.etiqueta} · {data.date} · {minutos} min de lectura
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold max-w-4xl leading-[1.02] text-balance">
            {data.title}
          </h1>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {tags.map((tag) => (
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
            <MDXRemote source={content} />
          </article>
          <Link
            href="/#archivo"
            className="inline-flex items-center gap-2 mt-14 text-sm text-muted hover:text-accent transition-colors"
          >
            <span className="text-accent">←</span> Volver al archivo
          </Link>

          <div className="mt-16 pt-12 border-t border-ink/10">
            <p className="text-sm text-muted mb-4">
              Si este contenido te fue útil, compártelo o apoya mi trabajo:
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://ko-fi.com/andrearoblescastro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-accent text-accent rounded-md hover:bg-accent hover:text-white transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span aria-hidden="true">☕</span>
                Apoyar en Ko-fi
              </a>
              <span className="w-px self-stretch bg-ink/15 mx-1" aria-hidden="true" />
              <CompartirPost titulo={data.title as string} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}