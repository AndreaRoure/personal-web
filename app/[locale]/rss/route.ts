import { routing } from "../../../i18n/routing";
import { getPosts } from "../../posts";
import { SITE, rutaLocale } from "../../seo";

// RSS por idioma: /rss (es) y /en/rss. Se genera en el build. Sin
// extension a proposito: el middleware de next-intl ignora las rutas con
// punto, y /feed.xml no llegaria a reescribirse a /es/...
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = getPosts(locale);
  const home = `${SITE}${rutaLocale(locale)}`;

  const items = posts
    .map((p) => {
      const url = `${SITE}${rutaLocale(locale, `/blog/${p.slug}`)}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description ?? "")}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Andrea Robles</title>
    <link>${home}</link>
    <description>Andrea Robles</description>
    <language>${locale}</language>
    <atom:link href="${SITE}${rutaLocale(locale, "/rss")}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
