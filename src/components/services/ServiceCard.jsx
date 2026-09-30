import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ServiceIcon from '../ui/ServiceIcon'

/**
 * Programme card for the /services grid. Icon, name, one line.
 *
 * No photograph: the only imagery kept on the site is the hero slideshow and
 * the equipment page, where the pictures answer a question somebody asked.
 */
export default function ServiceCard({ service, index }) {
  return (
    <article
      id={service.slug}
      className="group relative flex h-full scroll-mt-32 flex-col card card-hover p-6"
    >
      <div className="flex items-start justify-between">
        <span
          className="flex size-11 items-center justify-center rounded-xl bg-cream text-olive
                     transition-colors duration-500 group-hover:bg-gold/12 group-hover:text-gold"
        >
          <ServiceIcon name={service.icon} />
        </span>

        <span className="font-display text-[0.6875rem] font-semibold tracking-[0.18em] text-muted/45">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="mt-5 font-display text-[1.0625rem] leading-snug font-bold tracking-[-0.02em] text-night">
        {service.title}
      </h3>

      <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-muted">{service.short}</p>


    </article>
  )
}
