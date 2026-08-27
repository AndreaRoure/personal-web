import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";

const dirDePosts = (locale: string) =>
  path.join(process.cwd(), "content/posts", locale);

export function calcularMinutos(texto: string) {
  const palabras = texto.trim().split(/\s+/).length;
  return Math.max(1, Math.round(palabras / 200));
}

export interface Post {
  slug: string;
  // El "id" enlaza el mismo articulo entre idiomas (los slugs son distintos
  // porque estan traducidos). Sin id no hay contraparte, y no pasa nada.
  id: string | null;
  title: string;
  date: string;
  description: string;
  tags: string[];
  imagen: string | null;
  categoria: string;
  minutos: number;
}

function normaliza(slug: string, data: Record<string, unknown>, contenido: string): Post {
  return {
    slug,
    id: (data.id as string) ?? null,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    tags: (data.tags as string[]) ?? [],
    imagen: (data.imagen as string) ?? null,
    categoria: (data.categoria as string) ?? "articulos",
    minutos: calcularMinutos(contenido),
  };
}

export function getPosts(locale: string): Post[] {
  const dir = dirDePosts(locale);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(dir, filename), "utf8");
    const { data, content } = matter(fileContent);
    return normaliza(filename.replace(/\.mdx$/, ""), data, content);
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// cache(): generateMetadata y el propio componente de la pagina piden el
// mismo post en la misma peticion; sin esto se leeria el .mdx del disco dos
// veces por visita.
export const getPost = cache((locale: string, slug: string) => {
  const filePath = path.join(dirDePosts(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  return { ...normaliza(slug, data, content), content };
});

/** Slug del mismo articulo (mismo "id" de frontmatter) en el otro idioma,
 *  para el enlace "leer en ingles / read in spanish" del articulo. */
export function slugAlterno(
  locale: string,
  slug: string,
  otroLocale: string
): string | null {
  const post = getPost(locale, slug);
  if (!post?.id) return null;
  return getPosts(otroLocale).find((p) => p.id === post.id)?.slug ?? null;
}
