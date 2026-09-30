import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import ServiceIcon from '../ui/ServiceIcon'
import { equipmentZones, equipmentCount } from '../../data/equipment'

/**
 * Equipment preview — four zones, the first few machines in each.
 * Text only by design: the photographs live on /equipment, where somebody has
 * actually asked to see them.
 */
export default function EquipmentPreview() {
  return (
    <section className="bg-cream">
      <div className="shell section-y">
        <div className="flex flex-col items-center gap-7 text-center">
          <SectionHeading
            eyebrow="Equipment"
            title="What's on the"
            accent="floor."
            lead={`${equipmentCount} machines across ${equipmentZones.length} zones.`}
            align="center"
            maxWidth="max-w-2xl"
          />

          <Reveal delay={0.1}>
            <Button to="/equipment" variant="link" size="md" arrow>
              See the full list
            </Button>
          </Reveal>
        </div>

        <div className="section-gap grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {equipmentZones.map((zone, i) => (
            <Reveal key={zone.id} delay={i * 0.07} className="h-full">
              <Link to="/equipment" className="group flex h-full flex-col card card-hover p-6">
                <span
                  className="flex size-11 items-center justify-center rounded-xl bg-cream text-olive
                             transition-colors duration-500 group-hover:bg-gold/12 group-hover:text-gold"
                >
                  <ServiceIcon name={zone.icon} />
                </span>

                <h3 className="mt-5 font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-night">
                  {zone.title}
                </h3>

                <ul className="mt-3 space-y-1.5">
                  {zone.items.slice(0, 3).map((item) => (
                    <li key={item.name} className="flex items-start gap-2 text-[0.875rem] text-muted">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                      {item.name}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto flex items-center gap-1.5 pt-5 text-[0.8125rem] font-medium text-ink/55 transition-colors duration-300 group-hover:text-gold">
                  +{zone.items.length - 3} more
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
