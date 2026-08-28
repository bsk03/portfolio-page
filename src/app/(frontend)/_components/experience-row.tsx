'use client'

import React from 'react'
import Link from 'next/link'
import {
  Briefcase,
  ChevronRight,
  Code2,
  GraduationCap,
  Globe,
  Rocket,
  Terminal,
  Trophy,
} from 'lucide-react'
import type { ExperienceEntry } from '@/data/experience'
import { Reveal } from '@/components/motion/reveal'

const ICONS = {
  code: Code2,
  briefcase: Briefcase,
  rocket: Rocket,
  trophy: Trophy,
  graduation: GraduationCap,
  terminal: Terminal,
} as const

const WORKPLACE_LABEL = {
  remote: 'Remote',
  hybrid: 'Hybrid',
  onsite: 'On-site',
} as const

function formatMonth(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))
}

export function ExperienceRow({ entry }: { entry: ExperienceEntry }) {
  const Icon = ICONS[entry.icon as keyof typeof ICONS] ?? Code2
  const period = `${formatMonth(entry.startDate)} — ${
    entry.current ? 'Present' : entry.endDate ? formatMonth(entry.endDate) : 'Present'
  }`

  const body = (
    <div className="flex gap-4 border-b border-border py-4 last:border-b-0">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-brand/10 text-brand">
        <Icon className="size-4" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold tracking-tight">{entry.role}</h3>
          <span className="flex shrink-0 items-center gap-1 pt-0.5 font-mono text-[11px] text-ink-muted">
            {period}
            {entry.companyUrl && (
              <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            )}
          </span>
        </div>

        <p className="text-[13px] text-ink-2">@{entry.company}</p>

        <p className="flex items-center gap-1 font-mono text-[11px] text-ink-muted">
          <Globe className="size-3" />
          {WORKPLACE_LABEL[entry.workplace as keyof typeof WORKPLACE_LABEL]}
          {entry.location && ` · ${entry.location}`}
        </p>

        <p className="pt-1 text-[13px] leading-relaxed text-ink-2">{entry.description}</p>

        {entry.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {entry.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[11px] text-ink-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <Reveal amount={0.15}>
      {entry.companyUrl ? (
        <Link
          href={entry.companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block transition-colors hover:text-foreground"
        >
          {body}
        </Link>
      ) : (
        body
      )}
    </Reveal>
  )
}
