import { Link } from 'react-router-dom'
import { Backpack, ClipboardCheck, Handshake, ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { checklists } from '../../data/requirements'

const icons = { Backpack, ClipboardCheck, Handshake }

/**
 * Requirements preview. Shows the first few items of each list and the count
 * of the rest — enough to remove the "what do I even need?" hesitation
 * without reproducing the whole page.
 */
export default function RequirementsPreview() {
  return (
    <section className="bg-cream">
      <div className="shell section-y">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Before you start"
            title="Everything you need to get started."
            lead="No guesswork before your first visit — here is exactly what to bring and what to expect."
            maxWidth="max-w-xl"
          />

          <Reveal delay={0.1}>
            <Button to="/requirements" variant="outline" size="md" arrow>
              Full first-visit guide
            </Button>
          </Reveal>
        </div>

        <div className="section-gap grid gap-5 lg:grid-cols-3">
          {checklists.map((list, i) => {
            const Icon = icons[list.icon] ?? ClipboardCheck
            const preview = list.items.slice(0, 3)
            const remaining = list.items.length - preview.length

            return (
              <Reveal key={list.id} delay={i * 0.09} className="h-full">
                <Link
                  to="/requirements#checklists"
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white/60 p-7
                             transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                             hover:-translate-y-1 hover:border-gold/40 hover:bg-white hover:shadow-[var(--shadow-soft)]"
                >
                  <span
                    className="flex size-11 items-center justify-center rounded-xl bg-cream text-olive
                               transition-colors duration-500 group-hover:bg-gold/12 group-hover:text-gold"
                  >
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>

                  <h3 className="mt-7 font-display text-[1.1875rem] font-bold tracking-[-0.02em] text-night">
                    {list.title}
                  </h3>

                  <ul className="mt-5 space-y-2.5">
                    {preview.map((item) => (
                      <li key={item.label} className="flex items-start gap-2.5 text-[0.9375rem] text-ink/75">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                        {item.label}
                      </li>
                    ))}
                  </ul>

                  {remaining > 0 && (
                    <p className="mt-4 text-[0.8125rem] text-muted">
                      + {remaining} more {remaining === 1 ? 'item' : 'items'}
                    </p>
                  )}

                  <span
                    className="mt-auto flex items-center gap-1.5 pt-8 text-[0.8125rem] font-medium text-ink/60
                               transition-colors duration-300 group-hover:text-gold"
                  >
                    Read the guide
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
