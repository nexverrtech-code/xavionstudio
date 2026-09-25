import { Target, UserCheck, LayoutGrid, ShieldCheck } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'

/**
 * ⚠️  Every claim here describes how the studio operates, not achievements it
 * has not had time to earn. No awards, certifications, ratings or member
 * numbers — the studio is pre-launch and inventing those would be dishonest
 * as well as a liability.
 */
const reasons = [
  {
    Icon: Target,
    title: 'A programme, not a guess',
    body: 'You get a plan with a target and a way to measure it, so progress is something you can see rather than hope for.',
  },
  {
    Icon: UserCheck,
    title: 'Coaching on the floor',
    body: 'Trainers work among the equipment, correcting technique as it happens instead of handing over a printout.',
  },
  {
    Icon: LayoutGrid,
    title: 'Room to train properly',
    body: 'Space planned around movement — clear floor for functional work, and equipment laid out so you are not queuing.',
  },
  {
    Icon: ShieldCheck,
    title: 'Straight answers on pricing',
    body: 'Memberships explained in full before you commit. No hidden add-ons, no pressure to upgrade on the spot.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-night text-ivory">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative shell section-y">
        <SectionHeading
          eyebrow="Why Xavion"
          title="Built around how people actually train."
          lead="Four things we have decided to be strict about, because they are what separates a studio that works from a room full of machines."
          tone="light"
        />

        <div className="section-gap grid gap-px overflow-hidden rounded-2xl border border-ivory/10 bg-ivory/10 sm:grid-cols-2">
          {reasons.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08} className="h-full">
              <div className="group h-full bg-night p-7 transition-colors duration-500 hover:bg-charcoal lg:p-9">
                <span
                  className="flex size-11 items-center justify-center rounded-xl border border-ivory/12 text-gold
                             transition-colors duration-500 group-hover:border-gold/40"
                >
                  <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                </span>

                <h3 className="mt-7 font-display text-[1.1875rem] leading-snug font-bold tracking-[-0.02em] text-ivory">
                  {title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ivory/55">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
