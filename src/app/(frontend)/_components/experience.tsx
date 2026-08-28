import React from 'react'
import { getExperience } from '@/data/experience'
import { SectionHeading } from './section-heading'
import { ExperienceRow } from './experience-row'

export default async function Experience() {
  const entries = await getExperience()

  if (entries.length === 0) return null

  return (
    <section id="experience" className="page relative flex flex-col gap-5 py-8 sm:py-10">
      <SectionHeading>Experience</SectionHeading>

      <div className="flex flex-col">
        {entries.map((entry) => (
          <ExperienceRow key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  )
}
