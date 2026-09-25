/**
 * ============================================================
 * PRERENDER
 * ============================================================
 * Turns the SPA into real static HTML — one file per route, each with its own
 * title, meta description, canonical URL and JSON-LD already in the markup.
 *
 * Why this matters here: Googlebot executes JavaScript, but plenty of the
 * crawlers that feed AI answers and social previews do not. A client-rendered
 * page looks empty to them. Since "GEO / AI-search-friendly" and "strong local
 * SEO" are requirements for this site, the HTML has to be there on arrival.
 *
 * It also generates sitemap.xml from the same route list, so the sitemap can
 * never drift out of sync with what was actually built.
 *
 * Run as part of `npm run build`.
 * ============================================================
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')

const { render } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)

// site.js is plain ESM with no JSX and no imports, so Node can read it directly.
const { siteUrl } = await import(pathToFileURL(join(root, 'src', 'data', 'site.js')).href)

/** Routes to emit. `out` is the file written inside dist/. */
const routes = [
  { url: '/', out: 'index.html', priority: '1.0' },
  { url: '/services', out: 'services/index.html', priority: '0.9' },
  { url: '/membership', out: 'membership/index.html', priority: '0.9' },
  { url: '/requirements', out: 'requirements/index.html', priority: '0.8' },
  { url: '/contact', out: 'contact/index.html', priority: '0.8' },
  // Host fallback for unknown paths. Excluded from the sitemap.
  { url: '/404', out: '404.html', priority: null },
]

const template = readFileSync(join(distDir, 'index.html'), 'utf8')

/**
 * The built template carries fallback metadata for anyone serving the client
 * bundle without prerendering. Those tags are stripped here so the per-route
 * ones injected below are the only copies in the document.
 */
function stripFallbackMeta(html) {
  return html
    .replace(/[ \t]*<title>[\s\S]*?<\/title>\r?\n?/i, '')
    .replace(/[ \t]*<meta\s+name="description"[^>]*>\r?\n?/i, '')
    .replace(/[ \t]*<link\s+rel="canonical"[^>]*>\r?\n?/i, '')
    .replace(/[ \t]*<meta\s+(?:property|name)="(?:og:|twitter:)[^"]*"[^>]*>\r?\n?/gi, '')
}

const base = stripFallbackMeta(template)

if (!base.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find the root container in dist/index.html')
}

let built = 0

for (const route of routes) {
  const { html, head } = render(route.url)

  const page = base
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  const target = join(distDir, route.out)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, page, 'utf8')

  built += 1
  console.log(`  prerendered  ${route.url.padEnd(16)} → dist/${route.out}`)
}

/* ---- sitemap.xml, generated from the same list ---- */
const today = new Date().toISOString().slice(0, 10)

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes
    .filter((r) => r.priority)
    .map((r) =>
      [
        '  <url>',
        `    <loc>${new URL(r.url, siteUrl).href}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <priority>${r.priority}</priority>`,
        '  </url>',
      ].join('\n'),
    ),
  '</urlset>',
  '',
].join('\n')

writeFileSync(join(distDir, 'sitemap.xml'), sitemap, 'utf8')

console.log(`\n  ${built} routes prerendered · sitemap.xml written`)
console.log(`  canonical host: ${siteUrl}\n`)
