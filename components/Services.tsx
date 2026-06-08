'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SERVICES = [
  {
    id: 1,
    title: 'Full Interior Design',
    description: 'End-to-end design from concept to completion, tailored to your lifestyle and aesthetic.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="36" height="36" rx="1" />
        <path d="M6 18h36M18 18v24M6 30h12" />
        <path d="M24 30h18M24 42V30" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Space Planning',
    description: 'Strategic layout optimisation that maximises flow, function, and natural light.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="40" height="40" rx="1" />
        <path d="M4 16h40M4 32h40M16 4v40M32 4v40" />
        <circle cx="24" cy="24" r="3" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Furniture Curation',
    description: 'Handpicked pieces from global artisans and heritage brands, composed with intention.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 28h32v6H8zM10 28V20a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v8" />
        <path d="M8 34v4M40 34v4M14 24h20" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Renovation Consulting',
    description: 'Expert guidance through structural changes, contractor coordination, and material selection.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 36l4-4 14-14 4 4L20 36l-4 4z" />
        <path d="M26 18l4-8 8 8-8 4z" />
        <path d="M8 40l4-4" />
        <circle cx="34" cy="14" r="3" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Lighting Design',
    description: 'Layered lighting schemes that set the mood, define zones, and enhance architecture.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 8v4M8 24H4M44 24h-4M12.7 12.7 15.5 15.5M35.3 12.7 32.5 15.5" />
        <circle cx="24" cy="24" r="8" />
        <path d="M18 36h12M20 40h8" />
        <path d="M24 32v8" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Virtual Staging',
    description: 'Photorealistic renders and digital staging to visualise your space before a single nail is driven.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="40" height="28" rx="2" />
        <path d="M16 36v4M32 36v4M10 40h28" />
        <path d="M12 16l8 8 6-6 10 10" />
        <circle cx="30" cy="18" r="3" />
      </svg>
    ),
  },
]

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative p-8 bg-offwhite/60 border border-charcoal/8 hover:border-terracotta/40 transition-all duration-400 hover:shadow-lg hover:shadow-terracotta/5"
    >
      {/* Terracotta left border accent */}
      <span className="absolute left-0 top-6 bottom-6 w-[2px] bg-terracotta scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-top rounded-r-full" />

      {/* Icon */}
      <div className="text-charcoal/70 group-hover:text-terracotta transition-colors duration-300 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        >
          {service.icon}
        </motion.div>
      </div>

      <h3 className="font-serif text-xl text-charcoal mb-3 group-hover:text-charcoal transition-colors">
        {service.title}
      </h3>

      <p className="text-charcoal/60 text-sm leading-relaxed mb-5">
        {service.description}
      </p>

      <a
        href="/services"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-terracotta opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0"
      >
        Learn More
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section className="noise-bg bg-offwhite py-24 md:py-32 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="mb-16">
        <motion.p
          className="text-terracotta text-sm tracking-[0.25em] uppercase mb-3 font-medium"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Services
        </motion.p>
        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal max-w-lg leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          What We Do
        </motion.h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/8">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}
