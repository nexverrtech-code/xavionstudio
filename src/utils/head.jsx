import { createContext, useContext } from 'react'

/**
 * Tiny, dependency-free document-head manager.
 *
 * During prerender a collector object is passed down and the <SEO>
 * component writes into it synchronously while rendering. In the browser
 * there is no collector, so <SEO> mutates document.head in an effect.
 *
 * This keeps us off react-helmet entirely — one less runtime dependency
 * on a site where payload size is a stated requirement.
 */

export const HeadContext = createContext(null)

export const useHeadCollector = () => useContext(HeadContext)

export function createHeadCollector() {
  return { title: '', meta: [], links: [], jsonLd: [] }
}

export function HeadProvider({ collector, children }) {
  return <HeadContext.Provider value={collector}>{children}</HeadContext.Provider>
}

/** Escapes a string for safe interpolation into an HTML attribute. */
export function escapeAttr(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

/** Serialises a collector into the HTML that gets injected into <head>. */
export function renderHeadToString(collector) {
  const parts = []

  if (collector.title) parts.push(`<title>${escapeAttr(collector.title)}</title>`)

  for (const tag of collector.meta) {
    const key = tag.property ? 'property' : 'name'
    const keyValue = tag.property ?? tag.name
    parts.push(`<meta ${key}="${escapeAttr(keyValue)}" content="${escapeAttr(tag.content)}" />`)
  }

  for (const link of collector.links) {
    parts.push(`<link rel="${escapeAttr(link.rel)}" href="${escapeAttr(link.href)}" />`)
  }

  for (const block of collector.jsonLd) {
    // JSON.stringify output is placed inside a script element, so the only
    // sequence that can break out is "</script" — neutralise it.
    const json = JSON.stringify(block).replaceAll('<', '\\u003c')
    parts.push(`<script type="application/ld+json">${json}</script>`)
  }

  return parts.join('\n    ')
}
