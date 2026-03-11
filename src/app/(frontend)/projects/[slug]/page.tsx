import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Github, Zap } from 'lucide-react'
import { getProjects, getProjectBySlug, getAdjacentProjects } from '@/data/projects'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} – Błażej Kowalczyk`,
    description: project.tagline,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const all = await getProjects()
  const index = all.findIndex((p) => p.slug === slug)
  const number = String(index + 1).padStart(2, '0')
  const { prev, next } = await getAdjacentProjects(slug)

  return (
    <article className="page w-full py-12 lg:py-24 flex flex-col gap-12 lg:gap-20">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="size-4" />
        Back to projects
      </Link>

      <header className="flex flex-col gap-4">
        <span className="text-sm font-mono text-muted-foreground">{number}</span>
        <h1 className="text-4xl lg:text-6xl font-semibold">{project.title}</h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">{project.tagline}</p>
      </header>

      <div className="h-px bg-border" />

      <div className="aspect-video w-full rounded-2xl bg-muted overflow-hidden" />

      <div className="h-px bg-border" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
            Overview
          </h2>
          <p className="text-base lg:text-lg leading-relaxed">{project.description}</p>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
              Links
            </h2>
            <div className="flex flex-col gap-3">
              {project.demo && (
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline w-fit"
                >
                  <Zap className="size-4" /> Live Demo
                </Link>
              )}
              {project.source && (
                <Link
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline w-fit"
                >
                  <Github className="size-4" /> Source Code
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {project.screenshots && project.screenshots.length > 0 && (
        <>
          <div className="h-px bg-border" />
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {project.screenshots.slice(0, 2).map((s, i) => (
                <div key={i} className="aspect-video rounded-xl bg-muted overflow-hidden" />
              ))}
            </div>
            {project.screenshots.length > 2 && (
              <div className="aspect-video w-full rounded-xl bg-muted overflow-hidden" />
            )}
          </div>
        </>
      )}

      <div className="h-px bg-border" />
      <nav className="flex items-center justify-between">
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Previous</span>
              <span className="text-sm font-medium">{prev.title}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center gap-3 text-right text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Next</span>
              <span className="text-sm font-medium">{next.title}</span>
            </div>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  )
}
