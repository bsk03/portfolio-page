import { getPayload } from 'payload'
import config from '@payload-config'
import type { Project as PayloadProject } from '@/payload-types'

export type Project = {
  slug: string
  title: string
  tagline: string
  description: string
  image: PayloadProject['image']
  screenshots: PayloadProject['screenshots']
  demo: string | null
  source: string | null
  technologies: string[]
}

function mapProject(doc: PayloadProject): Project {
  return {
    slug: doc.slug ?? '',
    title: doc.title,
    tagline: doc.tagline,
    description: doc.description,
    image: doc.image,
    screenshots: doc.screenshots ?? [],
    demo: doc.demo ?? null,
    source: doc.source ?? null,
    technologies: (doc.technologies ?? []).map((t) => t.name),
  }
}

export async function getProjects(): Promise<Project[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'projects',
    sort: 'order',
    limit: 100,
  })
  return result.docs.map(mapProject)
}

export async function getProjectsPaginated(page: number = 1, limit: number = 6) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'projects',
    sort: 'order',
    page,
    limit,
  })
  return {
    projects: result.docs.map(mapProject),
    hasNextPage: result.hasNextPage,
    nextPage: result.nextPage,
    totalDocs: result.totalDocs,
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const doc = result.docs[0]
  return doc ? mapProject(doc) : undefined
}

export async function getAdjacentProjects(
  slug: string,
): Promise<{ prev: Project | null; next: Project | null }> {
  const all = await getProjects()
  const index = all.findIndex((p) => p.slug === slug)
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  }
}
