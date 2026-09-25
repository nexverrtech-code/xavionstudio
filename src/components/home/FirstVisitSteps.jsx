import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import FirstVisitTimeline from '../requirements/FirstVisitTimeline'

/**
 * Dark section that frames the first-visit timeline. Kept on the homepage
 * because "what actually happens when I turn up?" is one of the last
 * questions standing between interest and an enquiry.
 */
export default function FirstVisitSteps() {
  return (
    <section className="relative overflow-hidden bg-night">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative shell section-y">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Your first visit"
            title="Five steps, start to first session."
            lead="Nothing complicated, and nobody left standing in a corner wondering what to do next."
            tone="light"
            maxWidth="max-w-xl"
          />

          <Reveal delay={0.1}>
            <Button to="/contact" variant="gold" size="md" arrow>
              Book Free Trial
            </Button>
          </Reveal>
        </div>

        <div className="section-gap">
          <FirstVisitTimeline />
        </div>
      </div>
    </section>
  )
}
