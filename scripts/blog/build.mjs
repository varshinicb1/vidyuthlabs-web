/**
 * Generates the static blog (public/blog), its RSS feed and public/sitemap.xml from posts.mjs.
 * Static HTML, not part of the React app, so search engines read every post without running JS.
 * Run with `npm run blog`, then commit the generated files.
 */
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { POSTS } from './posts.mjs';

const SITE = 'https://vidyuthlabs.co.in';
const ORG_ID = `${SITE}/#org`;
const DEFAULT_IMAGE = '/og-image.png';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const PUBLIC = join(ROOT, 'public');
const BLOG = join(PUBLIC, 'blog');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const humanDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const words = (html) => html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

function page({ title, description, path, image, imageAlt, ogType, keywords, jsonLd, body, current }) {
  const url = `${SITE}${path}`;
  const img = `${SITE}${image || DEFAULT_IMAGE}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#07090b" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
${keywords ? `  <meta name="keywords" content="${esc(keywords)}" />\n` : ''}  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${url}" />
  <link rel="alternate" type="application/rss+xml" title="VidyuthLabs Blog" href="/blog/feed.xml" />
  <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="VidyuthLabs" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${img}" />
  <meta property="og:image:alt" content="${esc(imageAlt || 'VidyuthLabs portable potentiostat with a gold screen-printed electrode sensor')}" />
  <meta property="og:locale" content="en_IN" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${img}" />
  <link rel="stylesheet" href="/blog.css" />
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
  <header>
    <a class="brand" href="/"><img src="/logo.png" alt="" width="36" height="36" />VidyuthLabs</a>
    <nav aria-label="Site">
      <a href="/">Home</a>
      <a href="/blog/"${current === 'blog' ? ' aria-current="page"' : ''}>Blog</a>
    </nav>
  </header>

  <main>
${body}
  </main>

  <footer>
    <p>VidyuthLabs Technologies Private Limited · Portable potentiostats and screen-printed electrode sensors, Bengaluru, India.</p>
    <p><a href="/">Home</a> · <a href="/blog/">Blog</a> · <a href="mailto:info@vidyuthlabs.com">info@vidyuthlabs.com</a> · <a href="/privacy/">Privacy Policy</a> · <a href="/terms/">Terms of Use</a></p>
  </footer>
</body>
</html>
`;
}

const breadcrumb = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE}${path}` })),
});

function postPage(post) {
  const path = `/blog/${post.slug}/`;
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const body = `
    <p class="crumbs"><a href="/">Home</a> / <a href="/blog/">Blog</a></p>
    <article>
      <p class="eyebrow">${esc(post.tag)}</p>
      <h1>${esc(post.title)}</h1>
      <p class="meta">VidyuthLabs · <time datetime="${post.date}">${humanDate(post.date)}</time></p>
${post.body}
    </article>
    <nav class="related" aria-label="More from the blog">
      <h2>More from the blog</h2>
      <ul>
${related.map((p) => `        <li><a href="/blog/${p.slug}/">${esc(p.title)}</a></li>`).join('\n')}
      </ul>
    </nav>`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${SITE}${path}#article`,
        headline: post.title,
        description: post.description,
        image: `${SITE}${post.image || DEFAULT_IMAGE}`,
        datePublished: post.date,
        dateModified: post.updated || post.date,
        wordCount: words(post.body),
        keywords: post.keywords,
        inLanguage: 'en-IN',
        mainEntityOfPage: `${SITE}${path}`,
        author: { '@id': ORG_ID },
        publisher: { '@type': 'Organization', '@id': ORG_ID, name: 'VidyuthLabs', logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` } },
        isPartOf: { '@id': `${SITE}/blog/#blog` },
      },
      breadcrumb([['Home', '/'], ['Blog', '/blog/'], [post.title, path]]),
    ],
  };
  return page({
    title: `${post.title} | VidyuthLabs`,
    description: post.description,
    path,
    image: post.image,
    imageAlt: post.imageAlt,
    ogType: 'article',
    keywords: post.keywords,
    jsonLd,
    body,
    current: 'blog',
  });
}

function indexPage() {
  const body = `
    <p class="eyebrow">VidyuthLabs Blog</p>
    <h1>Field electrochemistry, sensors and safe water, food and soil</h1>
    <p class="lede">Guides and news from VidyuthLabs on portable potentiostats, screen-printed electrode sensors, and testing for heavy metals and other contaminants.</p>
    <ul class="posts">
${POSTS.map(
  (p) => `      <li>
        <a class="post-card" href="/blog/${p.slug}/">
${p.image ? `          <img src="${p.image}" alt="" width="1200" height="630" loading="lazy" decoding="async" />\n` : ''}          <span class="tag">${esc(p.tag)}</span>
          <h2>${esc(p.title)}</h2>
          <p>${esc(p.description)}</p>
        </a>
      </li>`,
).join('\n')}
    </ul>`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${SITE}/blog/#blog`,
        name: 'VidyuthLabs Blog',
        url: `${SITE}/blog/`,
        publisher: { '@id': ORG_ID },
        blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE}/blog/${p.slug}/`, datePublished: p.date })),
      },
      breadcrumb([['Home', '/'], ['Blog', '/blog/']]),
    ],
  };
  return page({
    title: 'Blog — Portable Potentiostats, Heavy-Metal Sensors & Field Testing | VidyuthLabs',
    description:
      'Guides and news on portable potentiostats, screen-printed electrode sensors, heavy-metal testing of water, food and soil, and formalin detection in fish, from VidyuthLabs.',
    path: '/blog/',
    ogType: 'website',
    jsonLd,
    body,
    current: 'blog',
  });
}

function feed() {
  const items = POSTS.map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/blog/${p.slug}/</link>
      <guid>${SITE}/blog/${p.slug}/</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`,
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>VidyuthLabs Blog</title>
    <link>${SITE}/blog/</link>
    <description>Portable potentiostats, screen-printed electrode sensors and field testing of water, food and soil.</description>
    <language>en-in</language>
${items}
  </channel>
</rss>
`;
}

function sitemap() {
  const newest = POSTS.map((p) => p.updated || p.date).sort().at(-1);
  const urls = [
    ['/', newest, 'weekly', '1.0'],
    ['/blog/', newest, 'weekly', '0.8'],
    ...POSTS.map((p) => [`/blog/${p.slug}/`, p.updated || p.date, 'monthly', '0.7']),
    ['/privacy/', null, 'yearly', '0.3'],
    ['/terms/', null, 'yearly', '0.3'],
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ([path, lastmod, freq, prio]) => `  <url>
    <loc>${SITE}${path}</loc>
${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
}

if (existsSync(BLOG)) rmSync(BLOG, { recursive: true });
mkdirSync(BLOG, { recursive: true });
writeFileSync(join(BLOG, 'index.html'), indexPage());
for (const post of POSTS) {
  mkdirSync(join(BLOG, post.slug), { recursive: true });
  writeFileSync(join(BLOG, post.slug, 'index.html'), postPage(post));
}
writeFileSync(join(BLOG, 'feed.xml'), feed());
writeFileSync(join(PUBLIC, 'sitemap.xml'), sitemap());
console.log(`Blog: ${POSTS.length} posts written to public/blog, plus feed.xml and sitemap.xml`);
