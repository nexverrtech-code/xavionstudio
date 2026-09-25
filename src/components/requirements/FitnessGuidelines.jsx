import { Info } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { guidelines } from '../../data/requirements'

/**
 * General training guidance, followed by a plainly worded disclaimer.
 * Nothing here is phrased as a medical claim, and the disclaimer is given
 * real visual weight rather than being buried in small print.
 */
export default function FitnessGuidelines() {
  return (
    <section className="bg-cream">
      <div className="shell section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Guidelines" title={guidelines.title} lead={guidelines.lead} />
          </div>

          <div className="lg:col-span-8">
            <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {guidelines.points.map((point, i) => (
                <Reveal key={point.title} delay={i * 0.07}>
                  <div className="border-t border-line pt-6">
                    <dt className="font-display text-[1.0625rem] font-bold tracking-[-0.015em] text-night">
                      {point.title}
                    </dt>
                    <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{point.body}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={0.3}>
              <div className="mt-12 flex gap-4 rounded-2xl border border-sage/40 bg-sage/12 p-6 sm:p-7">
                <Info className="mt-0.5 size-5 shrink-0 text-olive" strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <p className="font-display text-[0.8125rem] font-bold tracking-[0.14em] text-olive uppercase">
                    Please note
                  </p>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink/80">{guidelines.disclaimer}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
