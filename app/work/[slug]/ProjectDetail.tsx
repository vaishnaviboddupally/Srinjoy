'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import ProcessTimeline from '@/components/ProcessTimeline'

interface Project {
  title: string
  category: string
  year: number
  location: string
  area: string
  style: string
  description: string
  heroImage: string
  gallery: string[]
  beforeImage: string
  afterImage: string
  nextSlug: string
  nextTitle: string
  nextImage: string
}

export default function ProjectDetail({ project }: { project: Project }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <main>
      {/* Parallax hero */}
      <section ref={heroRef} className="relative h-[90vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            className="object-cover scale-110"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-16">
          <motion.span
            className="text-terracotta text-xs tracking-[0.3em] uppercase mb-4 block font-medium"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {project.category}
          </motion.span>
          <motion.h1
            className="font-serif text-5xl md:text-7xl text-white max-w-3xl leading-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {project.title}
          </motion.h1>
        </div>
      </section>

      {/* Metadata bar */}
      <section className="bg-charcoal px-6 md:px-12 lg:px-20 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Location', value: project.location },
            { label: 'Year', value: String(project.year) },
            { label: 'Area', value: project.area },
            { label: 'Style', value: project.style },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-cream/40 text-xs tracking-[0.25em] uppercase mb-1">{item.label}</p>
              <p className="text-cream font-medium text-sm">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Description */}
      <section className="px-6 md:px-12 lg:px-20 py-20 max-w-4xl">
        <motion.p
          className="text-charcoal/75 text-lg leading-[1.8]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {project.description}
        </motion.p>
      </section>

      {/* Horizontal gallery */}
      <section className="py-4 px-6 md:px-12 lg:px-20">
        <p className="text-xs tracking-[0.25em] uppercase text-charcoal/40 mb-6 font-medium">Gallery — drag to explore</p>
        <div className="snap-gallery gap-4 hide-scrollbar pb-4" style={{ cursor: 'grab' }}>
          {project.gallery.map((src, i) => (
            <div
              key={i}
              className="relative w-[min(480px,80vw)] aspect-[4/3] shrink-0 overflow-hidden"
            >
              <Image
                src={src}
                alt={`${project.title} — image ${i + 1}`}
                fill
                className="object-cover"
                sizes="480px"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Before/After slider */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="font-serif text-3xl md:text-4xl text-charcoal mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Transformation
          </motion.h2>
          <BeforeAfterSlider
            beforeSrc={project.beforeImage}
            afterSrc={project.afterImage}
          />
        </div>
      </section>

      {/* Process timeline */}
      <ProcessTimeline />

      {/* Next project */}
      <section className="relative h-[60vh] overflow-hidden group">
        <Link href={`/work/${project.nextSlug}`} className="block h-full">
          <Image
            src={project.nextImage}
            alt={project.nextTitle}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal/55 group-hover:bg-charcoal/45 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-cream/50 text-xs tracking-[0.3em] uppercase mb-4">Next Project</p>
            <h3 className="font-serif text-4xl md:text-6xl text-white group-hover:text-cream/80 transition-colors">
              {project.nextTitle}
            </h3>
            <motion.div
              className="mt-6 w-10 h-10 rounded-full border border-white/40 flex items-center justify-center"
              whileHover={{ scale: 1.15 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8h14M9 2l6 6-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </Link>
      </section>
    </main>
  )
}
