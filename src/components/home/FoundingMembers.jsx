import { Quote, Eye, MessagesSquare, BadgeCheck } from 'lucide-react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { site, localeShort, whatsappLink } from '../../data/site'

/**
 * ============================================================
 * THIS SECTION REPLACES "MEMBER TESTIMONIALS"
 * ============================================================
 * The studio is pre-launch: it has no members, so it has no reviews. Writing
 * invented testimonials would be a fabrication, is against Google's policies
 * on deceptive reviews, and is the single fastest way for a new local business
 * to lose trust when somebody notices.
 *
 * So this section says so plainly and turns it into a reason to visit. Once
 * real members have trained here, swap it for their actual words — with their
 * permission, and with their real names.
 * ============================================================
 */
const assurances = [
  {
    Icon: Eye,
    title: 'See the floor first',
    body: 'See the space before you decide.',
  },
  {
    Icon: MessagesSquare,
    title: 'Talk to a trainer',
    body: 'Ask how they would approach your goal.',
  },
  {
    Icon: BadgeCheck,
    title: 'Train a session free',
    body: 'Judge the coaching, not a review.',
  },
]

export default function FoundingMembers() {
  return (
    <section className="bg-ivory">
      <div className="shell section-y">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---- The statement ---- */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="flex size-11 items-center justify-center rounded-xl bg-white/70 text-gold">
                <Quote className="size-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-7 text-display-sm text-night sm:text-display">
                No reviews yet.{' '}
                <span className="block text-muted">And we won’t invent any.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-ink/80">
                {site.name} has not opened yet, so there are no testimonials. When there are, they will be
                real words from real members.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                Until then, judge us on what you can check: the programmes, the coaching, and a
                conversation in {localeShort}.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={whatsappLink()} variant="ink" size="md" arrow>
                  Message on WhatsApp
                </Button>
                <Button to="/services" variant="outline" size="md">
                  See the programmes
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---- What you can judge us on ---- */}
          <div className="lg:col-span-7 lg:pl-8">
            <ul className="space-y-4">
              {assurances.map(({ Icon, title, body }, i) => (
                <Reveal key={title} delay={0.12 + i * 0.09}>
                  <li
                    className="group flex gap-5 card card-hover p-6 sm:gap-6 sm:p-8"
                  >
                    <span
                      className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-cream text-olive
                                 transition-colors duration-500 group-hover:bg-gold/12 group-hover:text-gold"
                    >
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>

                    <div>
                      <h3 className="font-display text-[1.0625rem] font-bold tracking-[-0.015em] text-night">
                        {title}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
