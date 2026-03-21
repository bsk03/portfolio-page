'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Github, Zap } from 'lucide-react'
import type { Project } from '@/data/projects'

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, '0')
  const router = useRouter()

  console.log(project)
  return (
    <article
      onClick={() => router.push(`/projects/${project.slug}`)}
      className="cursor-pointer group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 py-8 lg:py-12 border-b border-border last:border-b-0 transition-colors hover:bg-muted/30 -mx-4 px-4 lg:-mx-8 lg:px-8 rounded-xl"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-baseline gap-4">
          <span className="text-sm font-mono text-muted-foreground">{number}</span>
          <h3 className="text-2xl lg:text-3xl font-semibold">{project.title}</h3>
        </div>
        <p className="text-muted-foreground text-sm lg:text-base max-w-lg">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-4 pt-2">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Zap className="size-4" /> Live Demo
            </a>
          )}
          {project.source && (
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Github className="size-4" /> Source
            </a>
          )}
        </div>
      </div>

      <div className="aspect-video rounded-xl bg-muted overflow-hidden relative">
        {typeof project.image === 'object' && project.image?.url && (
          <Image
            src={project.image.url}
            alt={project.image.alt ?? project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
          />
        )}
      </div>
    </article>
  )
}
