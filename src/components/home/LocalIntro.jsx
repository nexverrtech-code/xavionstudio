import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { site, localeFull, localeShort } from '../../data/site'

/**
 * Local-SEO introduction. The location appears naturally twice — once in the
 * opening sentence, once in the closing line — and nowhere else. That is
 * enough for relevance without reading like keyword filler.
 */
const principles = [
  {
    title: 'Programmed, not improvised',
    body: 'Every member trains to a plan. You always know what today is for.',
  },
  {
    title: 'Coached on the floor',
    body: 'Out among the equipment, where coaching actually happens.',
  },
  {
    title: 'Built for any starting point',
    body: 'First session or tenth year — the programme meets you there.',
  },
]

export default function LocalIntro() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      <div className="shell section-y">
        <div className="max-w-3xl">
          {/* ---- Copy ---- */}
          <div>
            <SectionHeading eyebrow="About the studio" title="A better way" accent="to train." />

            <Reveal delay={0.1}>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-ink/80">
                <strong className="font-semibold text-night">{site.name}</strong> is a premium fitness and
                training centre {site.isPreLaunch ? 'opening soon' : 'located'} in {localeFull}, offering
                structured fitness programmes, personal training, strength training, cardio, functional
                fitness and structured training designed around different goals.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                Built around one idea: a gym is defined by how well it coaches, not by how much it can fit
                on the floor.
              </p>
            </Reveal>

            <ul className="mt-10 space-y-7">
              {principles.map((item, i) => (
                <Reveal key={item.title} delay={0.2 + i * 0.07}>
                  <li className="border-l border-line pl-6">
                    <h3 className="font-display text-[1.0625rem] font-bold tracking-[-0.01em] text-night">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.42}>
              <Link
                to="/services"
                className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-night transition-colors hover:text-gold"
              >
                See how we train
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
