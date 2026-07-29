import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Revelar from "../Revelar";

const postsDirectory = path.join(process.cwd(), "content/posts");

function calcularMinutos(texto: string) {
  const palabras = texto.trim().split(/\s+/).length;
  return Math.max(1, Math.round(palabras / 200));
}

function getPosts() {
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    const slug = filename.replace(".mdx", "");

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      tags: (data.tags as string[]) ?? [],
      minutos: calcularMinutos(content),
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function Blog() {
  const posts = getPosts();

  return (
    <div>
      <section className="w-full bg-white text-ink border-b border-[#1A1A17]">
       <div className="max-w-5xl mx-auto px-6 pt-14 pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            Blog
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold">
            Lo que te{" "}
            <span className="marcador-animado marcador-cielo">comparto</span>
          </h1>
          <p className="text-muted mt-4 max-w-xl">
            Noticias y notas de campo sobre tecnología, soberanía digital y
            organizaciones sociales.
          </p>
        </div>
      </section>

      <section className="w-full bg-white text-ink">
        <div className="max-w-5xl mx-auto px-6 py-14">
          {posts.length === 0 && (
            <p className="text-muted">Próximamente los primeros artículos.</p>
          )}
          <ul className="max-w-3xl">
            {posts.map((post, indice) => (
              <li key={post.slug} className="border-b border-ink/10 last:border-b-0">
                <Revelar retraso={indice * 0.08}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block py-8 hover:opacity-60 transition-opacity"
                  >
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <p className="font-mono text-xs text-muted font-medium">
                        {post.date}
                      </p>
                      <span className="text-xs text-muted bg-white border border-ink/10 px-2.5 py-1 rounded-md whitespace-nowrap">
                        {post.minutos} min
                      </span>
                    </div>
                    <h2 className="font-display text-xl font-semibold leading-snug mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
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
    </div>
  );
}