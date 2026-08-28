'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react'
import type { Project } from '@/data/projects'
import { StatusBadge } from './status-badge'

export function ProjectCard({ project }: { project: Project }) {
  const image = typeof project.image === 'object' ? project.image : null

  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-brand/40">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-muted">
          {image?.url && (
            <Image
              src={image.url}
              alt={image.alt ?? project.title}
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/projects/${project.slug}`} className="flex min-w-0 items-center gap-2">
            <h3 className="truncate text-base font-bold tracking-tight">{project.title}</h3>
            <StatusBadge status={project.status} />
          </Link>
          <div className="flex shrink-0 items-center gap-2 text-ink-muted">
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source`}
                className="transition-colors hover:text-brand"
              >
                <Github className="size-4" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="transition-colors hover:text-brand"
              >
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-brand">
          {project.tagline}
        </p>

        <p className="line-clamp-4 text-[13px] leading-relaxed text-ink-2">{project.description}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border pt-3">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[11px] text-ink-muted"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-1 py-0.5 font-mono text-[11px] text-ink-muted">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
