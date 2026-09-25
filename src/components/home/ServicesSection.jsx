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
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Training"
            title="Train with purpose."
            lead="Programmes designed for different goals, experience levels and fitness needs — each one coached, structured and progressed."
            maxWidth="max-w-xl"
          />

          <Reveal delay={0.1}>
            <Button to="/services" variant="outline" size="md" arrow>
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
