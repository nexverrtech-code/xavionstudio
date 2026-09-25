import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, MessageCircle, Phone, ArrowRight, RotateCcw } from 'lucide-react'
import { site, telLink, whatsappLink } from '../../data/site'
import { goals } from '../../data/goals'
import { tiers } from '../../data/membership'

/**
 * ============================================================
 * ENQUIRY FORM — HOW SUBMISSION ACTUALLY WORKS
 * ============================================================
 * There is no backend on this site yet, so this form does NOT pretend to
 * "send" anything. Instead it composes the enquiry into a WhatsApp message
 * and opens it in the visitor's own WhatsApp, where they press send. The
 * enquiry genuinely reaches the studio, and nothing is claimed that is not
 * true.
 *
 * TO SWITCH TO A REAL BACKEND later, replace the body of `submit()` with a
 * POST to your endpoint (Formspree, Resend, a serverless function, …) and
 * set `DELIVERY` to 'server'. The success panel already handles both.
 * ============================================================
 */
const DELIVERY = 'whatsapp' // 'whatsapp' | 'server'

const emptyForm = { name: '', phone: '', email: '', goal: '', plan: '', message: '' }

function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Please tell us your name.'
  else if (values.name.trim().length < 2) errors.name = 'That name looks a little short.'

  const digits = values.phone.replace(/\D/g, '')
  if (!digits) errors.phone = 'We need a phone number to reach you.'
  else if (digits.length < 10) errors.phone = 'Please enter a 10-digit mobile number.'

  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'That email address does not look right.'

  return errors
}

/**
 * Builds a readable, structured enquiry rather than a wall of text.
 * Blank separator lines are added after filtering, since `filter(Boolean)`
 * would otherwise strip them along with the omitted optional fields.
 */
function composeMessage(values) {
  const rows = [
    `Name: ${values.name.trim()}`,
    `Phone: ${values.phone.trim()}`,
    values.email.trim() && `Email: ${values.email.trim()}`,
    values.goal && `Goal: ${values.goal}`,
    values.plan && `Preferred membership: ${values.plan}`,
  ].filter(Boolean)

  const parts = [`New enquiry — ${site.name}`, '', ...rows]
  if (values.message.trim()) parts.push('', values.message.trim())

  return parts.join('\n')
}

const fieldClass =
  'w-full rounded-xl border bg-white/80 px-4 py-3.5 text-[0.9375rem] text-ink placeholder:text-muted/50 ' +
  'transition-colors duration-300 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20'

function Field({ label, id, error, required, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.8125rem] font-medium text-ink/80">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="ml-0.5 text-gold">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>

      {children}

      {hint && !error && <p className="mt-1.5 text-[0.75rem] text-muted">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.75rem] font-medium text-[#9a3f2f]">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm({ initialPlan = '' }) {
  const [values, setValues] = useState({ ...emptyForm, plan: initialPlan })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const reduce = useReducedMotion()

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()

    const found = validate(values)
    if (Object.keys(found).length) {
      setErrors(found)
      // Move focus to the first problem so keyboard users are not stranded.
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }

    if (DELIVERY === 'whatsapp') {
      window.open(whatsappLink(composeMessage(values)), '_blank', 'noopener,noreferrer')
    }

    setSent(true)
  }

  const reset = () => {
    setValues({ ...emptyForm, plan: initialPlan })
    setErrors({})
    setSent(false)
  }

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-cream/60 p-7 sm:p-9">
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.form
            key="form"
            onSubmit={submit}
            noValidate
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? {} : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="eyebrow text-gold">Enquiry</p>
            <h2 className="mt-4 font-display text-[1.625rem] leading-tight font-bold tracking-[-0.025em] text-night">
              Book your first session
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              Tell us what you are training for and our team will get back to you.
            </p>

            <div className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" id="name" error={errors.name} required>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={update('name')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    placeholder="Your full name"
                    className={`${fieldClass} ${errors.name ? 'border-[#c98b7d]' : 'border-line'}`}
                  />
                </Field>

                <Field label="Phone" id="phone" error={errors.phone} required>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={update('phone')}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    placeholder="10-digit mobile number"
                    className={`${fieldClass} ${errors.phone ? 'border-[#c98b7d]' : 'border-line'}`}
                  />
                </Field>
              </div>

              <Field label="Email" id="email" error={errors.email} hint="Optional">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  placeholder="you@example.com"
                  className={`${fieldClass} ${errors.email ? 'border-[#c98b7d]' : 'border-line'}`}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your goal" id="goal">
                  <select
                    id="goal"
                    name="goal"
                    value={values.goal}
                    onChange={update('goal')}
                    className={`${fieldClass} border-line appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2372736C%22 stroke-width=%221.75%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-11`}
                  >
                    <option value="">Select a goal</option>
                    {goals.map((goal) => (
                      <option key={goal.id} value={goal.label}>
                        {goal.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Preferred membership" id="plan">
                  <select
                    id="plan"
                    name="plan"
                    value={values.plan}
                    onChange={update('plan')}
                    className={`${fieldClass} border-line appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2372736C%22 stroke-width=%221.75%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-11`}
                  >
                    <option value="">Not sure yet</option>
                    {tiers.map((tier) => (
                      <option key={tier.id} value={tier.name}>
                        {tier.name}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Message" id="message" hint="Optional — anything we should know?">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={update('message')}
                  placeholder="Training experience, preferred timings, questions…"
                  className={`${fieldClass} border-line resize-none`}
                />
              </Field>
            </div>

            <button
              type="submit"
              className="group mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-8 py-4
                         text-[0.9375rem] font-semibold tracking-[0.01em] text-night transition-all duration-300
                         hover:bg-gold-soft hover:shadow-[0_8px_24px_-8px_rgb(199_167_106/0.55)]"
            >
              Book Free Trial
              <ArrowRight className="btn-arrow size-4" strokeWidth={2} aria-hidden="true" />
            </button>

            {/* Said plainly, because it changes what happens next. */}
            <p className="mt-4 text-center text-[0.75rem] leading-relaxed text-muted">
              Your details open as a WhatsApp message to the studio — you press send.
            </p>
          </motion.form>
        ) : (
          /* ---- Success ---- */
          <motion.div
            key="sent"
            initial={reduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center py-10 text-center"
          >
            <motion.span
              initial={reduce ? {} : { scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex size-16 items-center justify-center rounded-full bg-olive text-ivory"
            >
              <Check className="size-7" strokeWidth={2.5} aria-hidden="true" />
            </motion.span>

            <h2 className="mt-7 font-display text-[1.75rem] font-bold tracking-[-0.03em] text-night">
              Thank you
            </h2>

            <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-muted" role="status">
              Your enquiry has opened in WhatsApp. Press send there and our team will come back to you. If
              WhatsApp did not open, use either option below.
            </p>

            <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
              <a
                href={whatsappLink(composeMessage(values))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-night px-6 py-3.5 text-[0.875rem] font-medium text-ivory transition-colors hover:bg-charcoal"
              >
                <MessageCircle className="size-4" strokeWidth={1.75} aria-hidden="true" />
                Open WhatsApp again
              </a>

              <a
                href={telLink}
                className="flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-[0.875rem] font-medium text-ink transition-colors hover:border-gold hover:text-night"
              >
                <Phone className="size-4" strokeWidth={1.75} aria-hidden="true" />
                Call {site.contact.phoneDisplay}
              </a>

              <button
                type="button"
                onClick={reset}
                className="mt-1 inline-flex items-center justify-center gap-2 text-[0.8125rem] font-medium text-muted transition-colors hover:text-gold"
              >
                <RotateCcw className="size-3.5" strokeWidth={2} aria-hidden="true" />
                Send another enquiry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
