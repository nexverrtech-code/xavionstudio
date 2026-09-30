import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import ServiceExplorer from '../services/ServiceExplorer'
import { featuredServices, services } from '../../data/services'

/**
 * Homepage services block. Shows the four core programmes in the interactive
 * explorer rather than all eight — the homepage's job is to prove there is
 * real programming behind the offer, and /services carries the full list.
 */
export default function ServicesSection() {
  return (
    <section className="bg-cream">
      <div className="shell section-y">
        <div className="flex flex-col items-center gap-7 text-center">
          <SectionHeading
            eyebrow="Training"
            title="Train with" accent="purpose."
            lead="Coached. Structured. Progressed."
            align="center"
            maxWidth="max-w-2xl"
          />

          <Reveal delay={0.1}>
            <Button to="/services" variant="link" size="md" arrow>
              All {services.length} programmes
            </Button>
          </Reveal>
        </div>

        <div className="section-gap">
          <ServiceExplorer items={featuredServices} />
        </div>
      </div>
    </section>
  )
}
