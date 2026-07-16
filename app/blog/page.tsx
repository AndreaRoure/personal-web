import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Marcador from "../Marcador";

const postsDirectory = path.join(process.cwd(), "content/posts");

function getPosts() {
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    const slug = filename.replace(".mdx", "");

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function Blog() {
  const posts = getPosts();

  return (
    <div>
      <h1 className="font-display text-4xl font-semibold mb-10">
        Cosas que voy <Marcador color="lima">aprendiendo</Marcador>
      </h1>
      {posts.length === 0 && (
        <p className="text-muted">Próximamente los primeros artículos.</p>
      )}
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="py-5 border-b border-ink/10">
            <p className="text-sm text-muted mb-1">{post.date}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="font-display text-xl font-semibold hover:bg-sky/40 px-1 -mx-1 rounded-md transition-colors"
            >
              {post.title}
            </Link>
            <p className="text-muted text-sm mt-1">{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}