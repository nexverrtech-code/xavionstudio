import { renderToString } from 'react-dom/server'
// React Router 7 merged the server entry into the core package — there is no
// longer a `react-router-dom/server` specifier.
import { StaticRouter } from 'react-router'
import App from './App'
import { HeadProvider, createHeadCollector, renderHeadToString } from './utils/head'

/**
 * Renders one route to static HTML plus the <head> tags that belong with it.
 * Called by scripts/prerender.mjs once per route at build time.
 */
export function render(url) {
  const collector = createHeadCollector()

  const html = renderToString(
    <HeadProvider collector={collector}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HeadProvider>,
  )

  return { html, head: renderHeadToString(collector) }
}
