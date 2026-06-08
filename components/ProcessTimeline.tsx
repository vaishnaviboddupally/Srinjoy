'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We begin with deep listening. Site visits, lifestyle interviews, and vision-board sessions reveal the unique DNA of each project.',
  },
  {
    number: '02',
    title: 'Concept',
    description:
      'Spatial layouts, material palettes, and mood boards take shape. We present a cohesive design direction for your review and refinement.',
  },
  {
    number: '03',
    title: 'Execution',
    description:
      'With your approval, we source every element, coordinate artisans and contractors, and supervise the build to exacting standards.',
  },
  {
    number: '04',
    title: 'Reveal',
    description:
      'The final unveiling. Your space is fully styled and photographed before handover — ready to live in from the very first day.',
  },
]

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.3'],
  })

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 lg:px-20 bg-cream"
    >
      <div className="max-w-3xl mx-auto">
        <motion.p
          className="text-terracotta text-sm tracking-[0.25em] uppercase mb-3 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          How We Work
        </motion.p>
        <motion.h2
          className="font-serif text-4xl md:text-5xl text-charcoal mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Process
        </motion.h2>

        <div className="relative">
          {/* Track */}
          <div className="absolute left-[19px] top-2 bottom-0 w-px bg-charcoal/10">
            <motion.div
              className="w-full bg-terracotta origin-top"
              style={{ scaleY: lineScaleY, height: '100%' }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-14">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                className="flex gap-8 pl-12 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                {/* Dot */}
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full border-2 border-terracotta bg-cream flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-terracotta" />
                </div>

                <div>
                  <span className="font-serif text-5xl font-bold text-terracotta/15 leading-none block mb-1">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-2xl text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-charcoal/60 leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
