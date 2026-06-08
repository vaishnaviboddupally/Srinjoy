'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedText from '@/components/AnimatedText'

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Hospitality'] as const
type Category = (typeof CATEGORIES)[number]

const PROJECTS = [
  { id: 1, title: 'The Oslo Loft', category: 'Residential', slug: 'the-oslo-loft', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80', year: 2023, video: 'https://videos.pexels.com/video-files/29466021/12684208_1920_1080_60fps.mp4' },
  { id: 2, title: 'Casa Meridian', category: 'Residential', slug: 'casa-meridian', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', year: 2023, video: 'https://videos.pexels.com/video-files/29466038/12684293_1920_1080_60fps.mp4' },
  { id: 3, title: 'Studio Eleven', category: 'Commercial', slug: 'studio-eleven', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80', year: 2022, video: 'https://videos.pexels.com/video-files/29466021/12684208_1920_1080_60fps.mp4' },
  { id: 4, title: 'The Marble House', category: 'Residential', slug: 'the-marble-house', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', year: 2023, video: 'https://videos.pexels.com/video-files/29466038/12684293_1920_1080_60fps.mp4' },
  { id: 5, title: 'Verdant Retreat', category: 'Hospitality', slug: 'verdant-retreat', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80', year: 2022, video: 'https://videos.pexels.com/video-files/29466021/12684208_1920_1080_60fps.mp4' },
  { id: 6, title: 'Park Avenue Penthouse', category: 'Residential', slug: 'park-avenue-penthouse', image: 'https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?w=800&q=80', year: 2024, video: 'https://videos.pexels.com/video-files/29466038/12684293_1920_1080_60fps.mp4' },
  { id: 7, title: 'The Grange Hotel', category: 'Hospitality', slug: 'the-grange-hotel', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80', year: 2022, video: 'https://videos.pexels.com/video-files/29466021/12684208_1920_1080_60fps.mp4' },
  { id: 8, title: 'Atelier Nord', category: 'Commercial', slug: 'atelier-nord', image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', year: 2023, video: 'https://videos.pexels.com/video-files/29466038/12684293_1920_1080_60fps.mp4' },
  { id: 9, title: 'Villa Serenata', category: 'Residential', slug: 'villa-serenata', image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=800&q=80', year: 2024, video: 'https://videos.pexels.com/video-files/29466021/12684208_1920_1080_60fps.mp4' },
]

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="break-inside-avoid mb-6"
    >
      <Link href={`/work/${project.slug}`} className="block group">
        <div
          className="relative overflow-hidden bg-charcoal/5"
          onMouseEnter={() => { setHovered(true); videoRef.current?.play().catch(() => {}) }}
          onMouseLeave={() => { setHovered(false); if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0 } }}
        >
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={800}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}>
            <p className="font-serif text-lg text-white">{project.title}</p>
            <p className="text-white/60 text-xs mt-1">{project.year}</p>
          </div>
          <span className="absolute top-4 left-4 text-xs font-medium tracking-widest uppercase text-white bg-charcoal/40 backdrop-blur-sm px-3 py-1 rounded-full">
            {project.category}
          </span>
        </div>
        <div className="pt-3">
          <p className="font-serif text-base text-charcoal group-hover:text-terracotta transition-colors">{project.title}</p>
          <p className="text-charcoal/40 text-xs mt-0.5">{project.year}</p>
        </div>
      </Link>
    </motion.div>
  )
}

export default function WorkPage() {
  const [active, setActive] = useState<Category>('All')

  const filtered = active === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active)

  return (
    <main className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden flex items-center justify-center mb-16">
        <video
          src="https://videos.pexels.com/video-files/29466021/12684208_1920_1080_60fps.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="relative z-10 text-center px-6">
          <AnimatedText
            text="Our Work"
            className="font-serif text-5xl md:text-7xl text-white justify-center text-center"
            delay={0.2}
          />
          <motion.p
            className="text-white/60 mt-4 text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            340+ projects across 8 countries
          </motion.p>
        </div>
      </section>

      <div className="px-6 md:px-12 lg:px-20">
        {/* Filter */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-250 ${
                active === cat
                  ? 'bg-charcoal text-cream border-charcoal'
                  : 'border-charcoal/20 text-charcoal/60 hover:border-charcoal/50 hover:text-charcoal'
              }`}
            >
              {cat}
              {active !== 'All' && cat !== 'All' && cat === active && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({filtered.length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Masonry */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
