'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    question: 'How long does a typical interior design project take?',
    answer:
      'Project timelines vary based on scope and complexity. A single-room redesign typically takes 6–10 weeks from concept to completion. A full home renovation can span 6–12 months. During our initial consultation we map out a realistic, detailed timeline specific to your project.',
  },
  {
    question: 'What is included in the Full Interior Design service?',
    answer:
      'Our Full Interior Design service covers everything: initial brief and site analysis, concept development, space planning, material and finish selection, furniture specification, lighting design, contractor coordination, and project management through to final styling and handover.',
  },
  {
    question: 'Do you work with clients outside of Milan and New York?',
    answer:
      'Yes — we have completed projects in 8 countries to date. For international projects we structure a hybrid process combining remote consultations, trusted local contractors, and strategic site visits at key project milestones. Travel costs are quoted separately.',
  },
  {
    question: 'What is your minimum project budget?',
    answer:
      'Our Full Interior Design services typically begin at $50,000 for a single room. Full-home projects start from $250,000. We also offer a Consultation service for clients who are not yet ready to commit to a full design engagement, starting at $1,500 for a two-hour session.',
  },
  {
    question: 'Can I see my space before any work begins?',
    answer:
      'Absolutely. Photorealistic 3D renders and virtual staging are included in our Full Service and Turnkey packages. You will have a complete, accurate visual of every room before a single decision is finalised — including material samples and furniture mock-ups in situ.',
  },
]

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="divide-y divide-charcoal/10">
      {FAQS.map((faq, i) => (
        <div key={i}>
          <button
            className="w-full flex items-start justify-between gap-6 py-7 text-left"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-medium text-charcoal text-base leading-snug">
              {faq.question}
            </span>
            <motion.span
              className="shrink-0 mt-0.5 text-terracotta text-xl font-light leading-none"
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.25 }}
            >
              +
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-7 text-charcoal/65 leading-relaxed text-[0.9375rem]">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
