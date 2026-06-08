import type { Metadata } from 'next'
import ProjectDetail from './ProjectDetail'

const PROJECTS: Record<string, {
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
}> = {
  'the-oslo-loft': {
    title: 'The Oslo Loft',
    category: 'Residential',
    year: 2023,
    location: 'Oslo, Norway',
    area: '280 m²',
    style: 'Scandinavian Minimalist',
    description: "The Oslo Loft began as a raw industrial space in a former printworks and became one of our most celebrated projects. The brief was clear: warmth without clutter, grandeur without ego. We stripped the space back to its structural bones — the original cast-iron columns, the north-facing sawtooth skylights — and built the design around what we found. Muted linen walls, handmade ceramics, and furniture chosen for their quiet confidence rather than their brand name. The result is a home that breathes.",
    heroImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1567767292278-a702e8b420c1?w=1200&q=80',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&q=80',
    ],
    beforeImage: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
    nextSlug: 'casa-meridian',
    nextTitle: 'Casa Meridian',
    nextImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
  },
  'casa-meridian': {
    title: 'Casa Meridian',
    category: 'Residential',
    year: 2023,
    location: 'Mallorca, Spain',
    area: '420 m²',
    style: 'Mediterranean Modern',
    description: "Casa Meridian sits at the edge of an olive grove on the island of Mallorca. The owners — a family split between London and Dubai — wanted a home that felt unmistakably local while meeting the standards of contemporary living. We worked with local stone masons to source travertine from a quarry on the island, commissioned a textile artist from Barcelona for the soft furnishings, and designed the open-plan living space to draw the eye toward an infinity pool and the sea beyond.",
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
    ],
    beforeImage: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    nextSlug: 'studio-eleven',
    nextTitle: 'Studio Eleven',
    nextImage: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
  },
}

// Fallback for any slug not explicitly defined
function getProject(slug: string) {
  return PROJECTS[slug] ?? PROJECTS['the-oslo-loft']
}

export async function generateStaticParams() {
  return [
    { slug: 'the-oslo-loft' },
    { slug: 'casa-meridian' },
    { slug: 'studio-eleven' },
    { slug: 'the-marble-house' },
    { slug: 'verdant-retreat' },
    { slug: 'park-avenue-penthouse' },
    { slug: 'the-grange-hotel' },
    { slug: 'atelier-nord' },
    { slug: 'villa-serenata' },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = getProject(params.slug)
  return {
    title: project.title,
    description: project.description.slice(0, 160),
  }
}

export default function WorkSlugPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)
  return <ProjectDetail project={project} />
}
