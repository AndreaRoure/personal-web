import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

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
      <p className="text-sm text-muted mb-2">Blog</p>
      <h1 className="font-display text-3xl font-semibold mb-10">
        Últimas entradas
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
              className="font-display text-xl font-semibold hover:text-accent transition-colors block mb-1"
            >
              {post.title}
            </Link>
            <p className="text-muted text-sm">{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}