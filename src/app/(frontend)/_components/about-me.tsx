import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { AboutMeClient } from './about-me-client'
import type { Media } from '@/payload-types'

export default async function AboutMe() {
  const payload = await getPayload({ config })
  const about = await payload.findGlobal({ slug: 'about' })

  const photo = about.photo as Media | null | undefined
  const photoUrl = photo?.url ?? null

  return <AboutMeClient photoUrl={photoUrl} />
}
