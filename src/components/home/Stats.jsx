import AnimatedNumber from '../ui/AnimatedNumber'
import Reveal from '../ui/Reveal'
import { services } from '../../data/services'
import { tiers } from '../../data/membership'
import { site, localeShort } from '../../data/site'

/**
 * ⚠️  HONEST-NUMBERS POLICY
 *
 * The studio is pre-launch, so it has no members, no training history and no
 * verified trainer count. Rather than print "500+ Active Members" — which
 * would be fabricated, and is exactly the kind of claim that damages trust
 * and local ranking when it turns out to be false — this strip shows only
 * facts that are true today, two of them counted directly from the data files.
 *
 * ONCE THE STUDIO OPENS, replace entries below with the verified figures:
 *   { value: 500, suffix: '+', label: 'Members' }
 *   { value: 15,  suffix: '+', label: 'Expert Trainers' }
 *   { value: 10,  suffix: 'K+ Sq. Ft.', label: 'Training Space' }
 */
const stats = [
  { value: services.length, suffix: '', label: 'Training Programmes' },
  { value: tiers.length, suffix: '', label: 'Membership Tiers' },
  { text: '1:1', label: 'Personal Coaching' },
  { text: site.isPreLaunch ? 'Opening Soon' : 'Now Open', label: localeShort, small: true },
]

export default function Stats() {
  return (
    <section
      aria-label="Studio at a glance"
      className="relative border-b border-line/60 bg-cream"
    >
      <div className="shell py-12 lg:py-14">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <dd
                  className={`font-display font-extrabold tracking-[-0.03em] text-night ${
                    stat.small ? 'text-2xl sm:text-[1.75rem]' : 'text-4xl sm:text-5xl'
                  }`}
                >
                  {typeof stat.value === 'number' ? (
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  ) : (
                    stat.text
                  )}
                </dd>
                <dt className="mt-3 text-[0.75rem] font-medium tracking-[0.14em] text-muted uppercase">
                  {stat.label}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
