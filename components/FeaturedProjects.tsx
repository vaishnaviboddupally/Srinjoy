'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const PROJECTS = [
  {
    id: 1,
    title: 'The Oslo Loft',
    category: 'Residential',
    slug: 'the-oslo-loft',
    images: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=900&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?w=900&q=80',
    ],
  },
  {
    id: 2,
    title: 'Casa Meridian',
    category: 'Residential',
    slug: 'casa-meridian',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=900&q=80',
    ],
  },
  {
    id: 3,
    title: 'Studio Eleven',
    category: 'Commercial',
    slug: 'studio-eleven',
    images: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=900&q=80',
    ],
  },
  {
    id: 4,
    title: 'The Marble House',
    category: 'Residential',
    slug: 'the-marble-house',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
      'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=900&q=80',
      'https://images.unsplash.com/photo-1664711942326-2c3351e215e6?w=900&q=80',
    ],
  },
  {
    id: 5,
    title: 'Verdant Retreat',
    category: 'Hospitality',
    slug: 'verdant-retreat',
    images: [
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?w=900&q=80',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=900&q=80',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=900&q=80',
    ],
  },
  {
    id: 6,
    title: 'Park Avenue Penthouse',
    category: 'Residential',
    slug: 'park-avenue-penthouse',
    images: [
      'https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?w=900&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80',
      'https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=900&q=80',
    ],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0]
  index: number
}) {
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = back

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > current ? 1 : -1)
      setCurrent(next)
    },
    [current]
  )

  const next = useCallback(() => {
    goTo((current + 1) % project.images.length)
  }, [current, goTo, project.images.length])

  // Auto-advance every 3 s, pause on hover
  useEffect(() => {
    if (hovered) return
    const id = setInterval(next, 3000)
    return () => clearInterval(id)
  }, [hovered, next])

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <Link href={`/work/${project.slug}`} className="block group">
        {/* Image area */}
        <div
          className="relative overflow-hidden aspect-[4/5] bg-charcoal/10"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Category tag */}
          <span className="absolute top-4 left-4 z-20 text-xs font-medium tracking-widest text-white/90 uppercase bg-charcoal/40 backdrop-blur-sm px-3 py-1 rounded-full">
            {project.category}
          </span>

          {/* Slideshow */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={project.images[current]}
                alt={`${project.title} — ${current + 1}`}
                fill
                className={`object-cover transition-transform duration-700 ${
                  hovered ? 'scale-105' : 'scale-100'
                }`}
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index < 3 && current === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent z-10" />

          {/* Project info — always visible at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
            <h3 className="font-serif text-lg text-white leading-snug">
              {project.title}
            </h3>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5 mt-3">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault()
                    goTo(i)
                  }}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-px transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-6 bg-white'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}

              {/* Arrow on hover */}
              <span
                className={`ml-auto flex items-center gap-1 text-white/70 text-xs transition-all duration-300 ${
                  hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                }`}
              >
                View
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>

          {/* Left / right manual arrows — shown on hover */}
          <button
            className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-200 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={(e) => {
              e.preventDefault()
              goTo((current - 1 + project.images.length) % project.images.length)
            }}
            aria-label="Previous image"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6l4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-200 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={(e) => {
              e.preventDefault()
              goTo((current + 1) % project.images.length)
            }}
            aria-label="Next image"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Card footer */}
        <div className="pt-4 pb-2 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg text-charcoal group-hover:text-terracotta transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-charcoal/45 text-sm mt-0.5">{project.category}</p>
          </div>
          {/* Slide counter */}
          <span className="text-charcoal/30 text-xs tabular-nums">
            {String(current + 1).padStart(2, '0')} /{' '}
            {String(project.images.length).padStart(2, '0')}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function FeaturedProjects() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-cream">
      {/* Header */}
      <div className="flex items-end justify-between mb-14">
        <div>
          <motion.p
            className="text-terracotta text-sm tracking-[0.25em] uppercase mb-3 font-medium"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Portfolio
          </motion.p>
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Selected Work
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="hidden md:block"
        >
          <Link
            href="/work"
            className="text-sm font-medium text-charcoal/60 hover:text-terracotta transition-colors duration-200 flex items-center gap-2 group"
          >
            View All Projects
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path
                d="M1 8h14M9 2l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Mobile view-all */}
      <div className="mt-12 text-center md:hidden">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-medium text-charcoal/60 hover:text-terracotta transition-colors"
        >
          View All Projects
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 8h14M9 2l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  )
}
