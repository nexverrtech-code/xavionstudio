import { useEffect } from 'react'
import { useHeadCollector } from '../../utils/head'
import { absoluteUrl } from '../../utils/seo'
import { site } from '../../data/site'

/**
 * Per-page metadata. Works in two modes:
 *   • prerender — writes into the head collector while rendering
 *   • browser   — patches document.head in an effect
 */
export default function SEO({
  title,
  description,
  canonical = '/',
  image = '/images/premium-gym-erode-wide.webp',
  noindex = false,
  jsonLd = [],
}) {
  const collector = useHeadCollector()
  const url = absoluteUrl(canonical)
  const imageUrl = absoluteUrl(image)

  const meta = [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: imageUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: site.name },
    { property: 'og:locale', content: 'en_IN' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
    ...(noindex ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
  ]

  // Prerender path — synchronous, so the HTML ships with correct metadata.
  if (collector) {
    collector.title = title
    collector.meta = meta
    collector.links = [{ rel: 'canonical', href: url }]
    collector.jsonLd = jsonLd
  }

  useEffect(() => {
    document.title = title

    for (const tag of meta) {
      const key = tag.property ? 'property' : 'name'
      const value = tag.property ?? tag.name
      let el = document.head.querySelector(`meta[${key}="${value}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(key, value)
        document.head.appendChild(el)
      }
      el.setAttribute('content', tag.content)
    }

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', url)

    // Replace only the blocks this component owns, so prerendered
    // JSON-LD does not end up duplicated after hydration.
    const owned = document.head.querySelectorAll('script[type="application/ld+json"]')
    owned.forEach((node) => node.remove())
    for (const block of jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(block)
      document.head.appendChild(script)
    }
  })

  return null
}
