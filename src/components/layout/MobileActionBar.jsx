import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { whatsappLink } from '../../data/site'
import { usePastHero } from '../../hooks/useScrollAnimation'

/**
 * Sticky mobile action bar. Appears only after the visitor has scrolled past
 * the hero, so it never competes with the hero's own calls to action.
 */
export default function MobileActionBar() {
  const visible = usePastHero(420)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
        >
          <div className="grid grid-cols-2 gap-px border-t border-ivory/10 bg-night/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 text-[0.8125rem] font-medium tracking-[0.02em] text-ivory/85 transition-colors active:bg-charcoal"
            >
              <MessageCircle className="size-4 text-sage" strokeWidth={1.75} aria-hidden="true" />
              WhatsApp
            </a>

            <Link
              to="/contact"
              className="group flex items-center justify-center gap-2 bg-gold py-4 text-[0.8125rem] font-semibold tracking-[0.02em] text-night"
            >
              Book Free Trial
              <ArrowRight className="btn-arrow size-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
