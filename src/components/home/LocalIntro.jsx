import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import SmartImage from '../ui/SmartImage'
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
    body: 'Every member trains to a plan with a target. You should always know what today’s session is for.',
  },
  {
    title: 'Coached on the floor',
    body: 'Trainers are out among the equipment where the coaching actually happens, not behind a desk.',
  },
  {
    title: 'Built for every starting point',
    body: 'From a first-ever session to years of training, the programme meets you where you are.',
  },
]

export default function LocalIntro() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      <div className="shell section-y">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---- Copy ---- */}
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="About the studio" title="A Better Way To Train" />

            <Reveal delay={0.1}>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-ink/80">
                <strong className="font-semibold text-night">{site.name}</strong> is a premium fitness and
                training centre {site.isPreLaunch ? 'opening soon' : 'located'} in {localeFull}, offering
                structured fitness programmes, personal training, strength training, cardio, functional
                fitness and membership options designed around different fitness goals.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                The studio is being built around one idea: that a good gym is defined by how well it coaches,
                not by how much equipment it can fit on the floor. Space to move, programmes that progress,
                and trainers who know your name.
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

          {/* ---- Editorial image pair ---- */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-5 gap-4">
              <Reveal className="col-span-3" delay={0.12}>
                <div className="group">
                  <SmartImage
                    src="/images/gym-facilities-erode.webp"
                    alt={`Resistance machines and free weights on the floor at ${site.name}, ${localeShort}`}
                    aspect="aspect-[3/4]"
                    className="rounded-2xl"
                    imgClassName="img-zoom"
                    sizes="(min-width: 1024px) 28vw, 55vw"
                  />
                </div>
              </Reveal>

              <div className="col-span-2 flex flex-col gap-4">
                <Reveal delay={0.22}>
                  <div className="group">
                    <SmartImage
                      src="/images/fitness-trainer-erode.webp"
                      alt={`Trainer coaching a member through a machine set at ${site.name}`}
                      aspect="aspect-square"
                      className="rounded-2xl"
                      imgClassName="img-zoom"
                      sizes="(min-width: 1024px) 18vw, 38vw"
                    />
                  </div>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="flex flex-1 flex-col justify-between rounded-2xl bg-olive p-6 text-ivory">
                    <p className="eyebrow text-gold-soft">Our approach</p>
                    <p className="mt-6 font-display text-xl leading-snug font-bold tracking-[-0.02em]">
                      Train with purpose, progress with proof.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
