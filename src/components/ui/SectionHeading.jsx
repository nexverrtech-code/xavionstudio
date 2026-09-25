import Reveal from './Reveal'

/**
 * The typographic unit that opens every section: small gold eyebrow,
 * editorial display heading, optional lead paragraph.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'dark', // 'dark' text on light bg | 'light' text on dark bg
  as: Heading = 'h2',
  className = '',
  maxWidth = 'max-w-2xl',
}) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'
  const titleColor = tone === 'light' ? 'text-ivory' : 'text-night'
  const leadColor = tone === 'light' ? 'text-ivory/65' : 'text-muted'

  return (
    <div className={`flex flex-col ${alignment} ${maxWidth} ${className}`}>
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-5 flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <Heading
          className={`text-display-sm sm:text-display ${titleColor} ${align === 'center' ? 'text-balance' : ''}`}
        >
          {title}
        </Heading>
      </Reveal>

      {lead && (
        <Reveal delay={0.12}>
          <p className={`mt-6 max-w-xl text-[1.0625rem] leading-relaxed ${leadColor}`}>{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
