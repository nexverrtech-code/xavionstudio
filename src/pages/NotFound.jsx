import SEO from '../components/ui/SEO'
import Button from '../components/ui/Button'
import { navLinks, site } from '../data/site'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <SEO
        title={`Page not found | ${site.name}`}
        description="The page you were looking for could not be found."
        canonical="/404"
        noindex
      />

      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-night">
        <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative shell w-full py-28">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
            404
          </p>

          <h1 className="mt-6 max-w-2xl text-display-sm text-ivory sm:text-display">
            This page isn’t here.
          </h1>

          <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-ivory/60">
            The link may be out of date. Everything on the site is one step away below.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/" variant="gold" size="lg" arrow>
              Back to home
            </Button>
            <Button to="/contact" variant="ghostLight" size="lg">
              Contact the studio
            </Button>
          </div>

          <nav aria-label="All pages" className="mt-12 border-t border-ivory/12 pt-8">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ivory/55 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  )
}
