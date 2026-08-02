import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

/** Colores de categoria para la barra lateral de cada fila del listado. */
export const COLORES_CATEGORIA = ["#7A9201", "#C2492D", "#2A7F94", "#3F4A14"];

export function calcularMinutos(texto: string) {
  const palabras = texto.trim().split(/\s+/).length;
  return Math.max(1, Math.round(palabras / 200));
}

export function getPosts() {
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    const slug = filename.replace(".mdx", "");
    const tags = (data.tags as string[]) ?? [];

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      description: data.description as string,
      tags,
      // Se puede fijar con "categoria" en el frontmatter; si no, manda la primera etiqueta.
      categoria: (data.categoria as string) ?? tags[0] ?? "general",
      minutos: calcularMinutos(content),
    };
  });

  // El color se asigna por indice sobre las categorias ordenadas, no por hash,
  // para que dos categorias distintas nunca caigan en el mismo color.
  const categorias = [...new Set(posts.map((p) => p.categoria))].sort();

  return posts
    .map((p) => ({
      ...p,
      color:
        COLORES_CATEGORIA[
          categorias.indexOf(p.categoria) % COLORES_CATEGORIA.length
        ],
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
