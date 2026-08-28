import { getPayload } from 'payload'
import config from '@payload-config'
import type { Experience as PayloadExperience } from '@/payload-types'

export type ExperienceEntry = {
  id: number
  role: string
  company: string
  companyUrl: string | null
  icon: NonNullable<PayloadExperience['icon']>
  workplace: NonNullable<PayloadExperience['workplace']>
  location: string | null
  startDate: string
  endDate: string | null
  current: boolean
  description: string
  technologies: string[]
}

function mapEntry(doc: PayloadExperience): ExperienceEntry {
  return {
    id: doc.id,
    role: doc.role,
    company: doc.company,
    companyUrl: doc.companyUrl ?? null,
    icon: doc.icon ?? 'code',
    workplace: doc.workplace ?? 'remote',
    location: doc.location ?? null,
    startDate: doc.startDate,
    endDate: doc.endDate ?? null,
    current: doc.current ?? false,
    description: doc.description,
    technologies: (doc.technologies ?? []).map((t) => t.name),
  }
}

export async function getExperience(): Promise<ExperienceEntry[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'experience',
    sort: ['order', '-startDate'],
    limit: 100,
  })
  return result.docs.map(mapEntry)
}
