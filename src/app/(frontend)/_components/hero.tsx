import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/payload-types'
import { HeroClient } from './hero-client'

export default async function Hero() {
  const payload = await getPayload({ config })
  const about = await payload.findGlobal({ slug: 'about' })

  const photo = about.photo as Media | null | undefined
  const cv = about.cv as Media | null | undefined

  return (
    <HeroClient
      photoUrl={photo?.url ?? null}
      photoAlt={photo?.alt ?? 'Błażej Kowalczyk'}
      cvUrl={cv?.url ?? null}
    />
  )
}
