import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ─── GROQ queries ──────────────────────────────────────────────────────────

export const allProjectsQuery = `
  *[_type == "project"] | order(order asc, year desc) {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    videoUrl,
    category,
    year,
    location,
    areaSqft,
    style,
    featured
  }
`

export const featuredProjectsQuery = `
  *[_type == "project" && featured == true] | order(order asc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    videoUrl,
    category,
    year,
    location
  }
`

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    videoUrl,
    category,
    year,
    location,
    areaSqft,
    style,
    description,
    gallery[]{
      asset,
      alt,
      caption
    },
    beforeImage,
    afterImage,
    "nextProject": nextProject->{
      title,
      "slug": slug.current,
      coverImage
    }
  }
`

export const allProjectSlugsQuery = `
  *[_type == "project"] {
    "slug": slug.current
  }
`

export const teamMembersQuery = `
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    photo,
    linkedIn
  }
`

export const servicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    deliverables,
    image,
    startingPrice
  }
`

export const featuredTestimonialsQuery = `
  *[_type == "testimonial" && featured == true] | order(order asc)[0...6] {
    _id,
    clientName,
    location,
    quote,
    rating
  }
`

export const allTestimonialsQuery = `
  *[_type == "testimonial"] | order(order asc) {
    _id,
    clientName,
    location,
    quote,
    rating
  }
`

// ─── Typed fetch helpers ───────────────────────────────────────────────────

export interface SanityProject {
  _id: string
  title: string
  slug: string
  coverImage: SanityImageSource
  videoUrl?: string
  category: 'residential' | 'commercial' | 'hospitality'
  year: number
  location: string
  areaSqft?: number
  style?: string
  featured?: boolean
}

export interface SanityProjectDetail extends SanityProject {
  description: unknown[]
  gallery: Array<{ asset: SanityImageSource; alt?: string; caption?: string }>
  beforeImage?: SanityImageSource
  afterImage?: SanityImageSource
  nextProject?: {
    title: string
    slug: string
    coverImage: SanityImageSource
  }
}

export interface SanityTeamMember {
  _id: string
  name: string
  role: string
  bio: string
  photo: SanityImageSource
  linkedIn?: string
}

export interface SanityService {
  _id: string
  title: string
  slug: string
  description: string
  icon?: string
  deliverables: string[]
  image?: SanityImageSource
  startingPrice?: string
}

export interface SanityTestimonial {
  _id: string
  clientName: string
  location: string
  quote: string
  rating: number
}

export async function getProjects(): Promise<SanityProject[]> {
  return client.fetch(allProjectsQuery, {}, { next: { revalidate: 60 } })
}

export async function getFeaturedProjects(): Promise<SanityProject[]> {
  return client.fetch(featuredProjectsQuery, {}, { next: { revalidate: 60 } })
}

export async function getProjectBySlug(slug: string): Promise<SanityProjectDetail | null> {
  return client.fetch(projectBySlugQuery, { slug }, { next: { revalidate: 60 } })
}

export async function getAllProjectSlugs(): Promise<Array<{ slug: string }>> {
  return client.fetch(allProjectSlugsQuery, {}, { next: { revalidate: 3600 } })
}

export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  return client.fetch(teamMembersQuery, {}, { next: { revalidate: 3600 } })
}

export async function getServices(): Promise<SanityService[]> {
  return client.fetch(servicesQuery, {}, { next: { revalidate: 3600 } })
}

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  return client.fetch(allTestimonialsQuery, {}, { next: { revalidate: 60 } })
}
