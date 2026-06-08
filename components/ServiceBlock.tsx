'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ServiceBlockProps {
  title: string
  description: string
  deliverables: string[]
  imageSrc: string
  imageAlt: string
  reverse?: boolean
  index: number
}

export default function ServiceBlock({
  title,
  description,
  deliverables,
  imageSrc,
  imageAlt,
  reverse = false,
  index,
}: ServiceBlockProps) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${
        reverse ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
    >
      {/* Image */}
      <motion.div
        className="relative aspect-[4/3] lg:aspect-auto overflow-hidden"
        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>

      {/* Text */}
      <motion.div
        className="flex flex-col justify-center px-10 py-16 lg:px-16 lg:py-20 bg-offwhite"
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className="text-terracotta text-xs tracking-[0.3em] uppercase font-medium mb-4 block">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-5">{title}</h3>
        <p className="text-charcoal/65 leading-relaxed mb-8 text-[0.9375rem]">{description}</p>

        <ul className="space-y-2.5 mb-10">
          {deliverables.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-charcoal/70">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:gap-3 transition-all duration-200 group"
        >
          Get a Quote
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.div>
    </div>
  )
}
