import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import FeaturedProjects from '@/components/FeaturedProjects'
import Services from '@/components/Services'
import VideoShowcase from '@/components/VideoShowcase'
import AboutTeaser from '@/components/AboutTeaser'
import Testimonials from '@/components/Testimonials'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Marquee />
      <FeaturedProjects />
      <VideoShowcase />
      <Services />
      <AboutTeaser />
      <Testimonials />
    </main>
  )
}
