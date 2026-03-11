import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getProjects } from '@/data/projects'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects – Błażej Kowalczyk',
  description: 'All projects by Błażej Kowalczyk.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="page w-full py-12 lg:py-24 flex flex-col gap-12 lg:gap-16">
      <div className="flex flex-col gap-4">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="size-4" />
          Back home
        </Link>
        <h1 className="text-4xl lg:text-6xl font-semibold">All Projects</h1>
        <p className="text-lg text-muted-foreground">
          A collection of things I&apos;ve built.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((project, i) => {
          const number = String(i + 1).padStart(2, '0')
          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col gap-4 rounded-2xl border border-border p-6 transition-colors hover:bg-muted/30"
            >
              <div className="aspect-video w-full rounded-xl bg-muted overflow-hidden" />
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-mono text-muted-foreground">{number}</span>
                <h2 className="text-xl lg:text-2xl font-semibold group-hover:underline">
                  {project.title}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{project.tagline}</p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.technologies.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="px-2 py-0.5 text-muted-foreground text-xs">
                    +{project.technologies.length - 5}
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
