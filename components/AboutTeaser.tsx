'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'

const STATS = [
  { value: 12, suffix: ' Years', label: 'of practice' },
  { value: 340, suffix: '+', label: 'projects completed' },
  { value: 8, suffix: '', label: 'countries served' },
  { value: 24, suffix: '', label: 'design awards' },
]

function StatItem({ stat }: { stat: typeof STATS[0] }) {
  const { count, ref } = useCountUp(stat.value)
  return (
    <div ref={ref} className="text-center md:text-left">
      <p className="font-serif text-4xl md:text-5xl text-terracotta font-medium">
        {count}
        {stat.suffix}
      </p>
      <p className="text-charcoal/50 text-sm mt-1 capitalize">{stat.label}</p>
    </div>
  )
}

export default function AboutTeaser() {
  return (
    <section className="py-24 md:py-32 bg-cream overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            className="relative aspect-[4/5] overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=85"
              alt="Srinjoy Interiors interior"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Floating tag */}
            <div className="absolute bottom-8 right-8 bg-cream/95 backdrop-blur-sm px-6 py-4 shadow-lg">
              <p className="font-serif text-2xl text-charcoal font-medium">Est. 2012</p>
              <p className="text-charcoal/50 text-xs tracking-widest uppercase mt-0.5">Milan & New York</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-terracotta text-sm tracking-[0.25em] uppercase mb-5 font-medium">
              The Studio
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-7">
              Spaces designed around your story
            </h2>
            <p className="text-charcoal/65 leading-relaxed text-base mb-5">
              Srinjoy Interiors was founded on a single conviction: the spaces we inhabit shape the lives we live. We work closely with each client — understanding how they move through their days, what brings them ease, what sparks their creativity — then translate those truths into rooms that feel undeniably theirs.
            </p>
            <p className="text-charcoal/65 leading-relaxed text-base mb-10">
              Our process is rooted in rigorous craft, sustainable material choices, and a deep respect for architectural context. Whether we're transforming a Milan penthouse or a Brooklyn brownstone, the result is always the same: a space that feels lived-in from the first moment you step inside.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-y-8 gap-x-6 mb-10">
              {STATS.map((stat) => (
                <StatItem key={stat.label} stat={stat} />
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 text-sm font-medium text-charcoal hover:text-terracotta transition-colors duration-200 group"
            >
              Meet the Studio
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-1.5"
              >
                <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
