import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import SmartImage from '../ui/SmartImage'

/**
 * Cinematic hero for the inner pages. Dark by design so the header can stay
 * transparent over it, matching the homepage behaviour on every route.
 *
 * `crumbs` renders a visible breadcrumb trail that mirrors the BreadcrumbList
 * in structured data — the two should never disagree.
 */
export default function PageHero({ eyebrow, title, lead, image, imageAlt, crumbs = [] }) {
  const reduce = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden bg-night">
      <div className="absolute inset-0">
        <SmartImage src={image} alt={imageAlt} priority aspect="h-full" sizes="100vw" className="size-full" quiet />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-night via-night/80 to-night/45"
        aria-hidden="true"
      />
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative shell pt-32 pb-16 sm:pt-36 lg:pt-44 lg:pb-20">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.75rem] text-ivory/45">
              {crumbs.map((crumb, i) => {
                const isLast = i === crumbs.length - 1

                return (
                  <li key={crumb.path} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="size-3 text-ivory/25" strokeWidth={2} aria-hidden="true" />}
                    {isLast ? (
                      <span aria-current="page" className="text-ivory/70">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link to={crumb.path} className="transition-colors hover:text-gold">
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}

        <motion.p
          initial={reduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="eyebrow flex items-center gap-3 text-gold"
        >
          <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
          {eyebrow}
        </motion.p>

        <h1 className="mt-6 max-w-3xl overflow-hidden text-ivory">
          <motion.span
            initial={reduce ? {} : { opacity: 0, y: '30%' }}
            animate={{ opacity: 1, y: '0%' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="block text-display-sm sm:text-display lg:text-display-lg"
          >
            {title}
          </motion.span>
        </h1>

        {lead && (
          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-ivory/65 sm:text-lg"
          >
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  )
}
