import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Github, Zap } from 'lucide-react'
import { getProjects, getProjectBySlug, getAdjacentProjects } from '@/data/projects'
import type { Metadata } from 'next'

// These routes read from Payload at build time. Without a revalidate window they
// stay frozen on the HTML produced by the last deploy, so anything added in the
// CMS afterwards never appears in production.
export const revalidate = 60

import type { Media } from '@/payload-types'
import { StatusBadge } from '../../_components/status-badge'
import { Gallery, type GalleryItem } from './gallery'

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

/** Payload returns either the populated doc or just its id, depending on depth. */
function mediaOf(value: unknown): Media | null {
  return value && typeof value === 'object' ? (value as Media) : null
}

function ProjectImage({
  media,
  alt,
  sizes,
  priority,
}: {
  media: Media | null
  alt: string
  sizes: string
  priority?: boolean
}) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
      {media?.url && (
        <Image
          src={media.url}
          alt={media.alt ?? alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          unoptimized
        />
      )}
    </div>
  )
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const all = await getProjects()
  const index = all.findIndex((p) => p.slug === slug)
  const number = String(index + 1).padStart(2, '0')
  const { prev, next } = await getAdjacentProjects(slug)

  const mainImage = mediaOf(project.image)
  const demoVideo = mediaOf(project.demoVideo)

  const galleryItems: GalleryItem[] = (project.screenshots ?? []).flatMap((shot, i) => {
    const media = mediaOf(shot.image)
    if (!media?.url) return []
    return [
      {
        url: media.url,
        alt: media.alt ?? `${project.title} screenshot ${i + 1}`,
        caption: shot.caption ?? null,
        width: media.width ?? 1600,
        height: media.height ?? 900,
      },
    ]
  })

  return (
    <article className="page flex flex-col gap-8 py-8 sm:py-10">
      <Link
        href="/#projects"
        className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-brand"
      >
        <ArrowLeft className="size-4" />
        Back to projects
      </Link>

      <header className="flex flex-col gap-4">
        <span className="font-mono text-[11px] tracking-[0.12em] text-brand">{number}</span>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight">{project.title}</h1>
          <StatusBadge status={project.status} />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-brand">{project.tagline}</p>
      </header>

      <div className="h-px bg-border" />

      <ProjectImage
        media={mainImage}
        alt={project.title}
        sizes="(max-width: 768px) 100vw, 768px"
        priority
      />

      <div className="h-px bg-border" />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-5">
        <div className="flex flex-col gap-3 sm:col-span-3">
          <h2 className="eyebrow">
            Overview
          </h2>
          <p className="text-[13px] leading-relaxed text-ink-2">{project.description}</p>
        </div>

        <div className="flex flex-col gap-6 sm:col-span-2">
          <div className="flex flex-col gap-4">
            <h2 className="eyebrow">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[11px] text-ink-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="eyebrow">
              Links
            </h2>
            <div className="flex flex-col gap-3">
              {project.demo && (
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 text-[13px] font-medium text-brand hover:underline"
                >
                  <Zap className="size-4" /> Live Demo
                </Link>
              )}
              {project.source && (
                <Link
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 text-[13px] font-medium text-brand hover:underline"
                >
                  <Github className="size-4" /> Source Code
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {demoVideo?.url && (
        <>
          <div className="h-px bg-border" />
          <div className="flex flex-col gap-3">
            <h2 className="eyebrow">Demo</h2>
            <video
              controls
              playsInline
              preload="metadata"
              poster={mainImage?.url ?? undefined}
              className="w-full rounded-xl border border-border bg-muted"
            >
              <source src={demoVideo.url} type={demoVideo.mimeType ?? 'video/mp4'} />
              Your browser cannot play this video.
            </video>
          </div>
        </>
      )}

      {galleryItems.length > 0 && (
        <>
          <div className="h-px bg-border" />
          <div className="flex flex-col gap-3">
            <h2 className="eyebrow">Gallery</h2>
            <Gallery items={galleryItems} />
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
