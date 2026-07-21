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
      <section className="bg-dark text-crema">
       <div className="max-w-5xl mx-auto px-6 pt-14 pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-dark mb-4">
            Blog
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold">
            Lo que te{" "}
            <span className="marcador-animado marcador-cielo">comparto</span>
          </h1>
          <p className="text-crema-muted mt-4 max-w-xl">
            Noticias y notas de campo sobre tecnología, soberanía digital y
            organizaciones sociales.
          </p>
        </div>
      </section>

      <section className="bg-bg text-ink">
        <div className="max-w-5xl mx-auto px-6 py-14">
          {posts.length === 0 && (
            <p className="text-muted">Próximamente los primeros artículos.</p>
          )}
          <ul className="max-w-3xl">
            {posts.map((post, indice) => (
              <li key={post.slug}>
                <Revelar retraso={indice * 0.08}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block py-7 border-b border-ink/10 hover:bg-lima/60 px-4 -mx-4 rounded-xl transition-colors"
                  >
                    <p className="font-mono text-xs text-muted mb-2">
                      {post.date} · {post.minutos} min de lectura
                    </p>
                    <h2 className="font-display text-2xl font-semibold group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted mt-2 max-w-xl">
                      {post.description}
                    </p>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs border border-ink/20 rounded-full px-3 py-0.5 text-muted"
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