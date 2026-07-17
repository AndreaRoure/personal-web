import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

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

  return (
    <div>
      <section className="bg-dark text-crema">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-16">
          <p className="font-mono text-xs text-crema-muted mb-4">
            {data.date} · {minutos} min de lectura
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold max-w-4xl leading-tight">
            {data.title}
          </h1>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs border border-crema/25 rounded-full px-3 py-1 text-crema-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-bg text-ink">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <article className="prose prose-lg max-w-2xl prose-headings:font-display prose-headings:font-semibold prose-a:text-accent prose-a:decoration-2 prose-blockquote:border-accent prose-strong:text-ink">
            <MDXRemote source={content} />
          </article>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mt-14 text-sm text-muted hover:text-accent transition-colors"
          >
            <span className="text-accent">←</span> Volver al blog
          </Link>
        </div>
      </section>
    </div>
  );
}