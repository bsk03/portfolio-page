'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import type { Project } from '@/data/projects'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-border p-6 transition-colors hover:bg-muted/30"
    >
      <div className="aspect-video w-full rounded-xl bg-muted overflow-hidden relative">
        {typeof project.image === 'object' && project.image?.url && (
          <Image
            src={project.image.url}
            alt={project.image.alt ?? project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        )}
      </div>
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
}

export function ProjectsInfiniteScroll({
  initialProjects,
  initialHasNextPage,
}: {
  initialProjects: Project[]
  initialHasNextPage: boolean
}) {
  const [projects, setProjects] = useState(initialProjects)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(async () => {
    if (loading || !hasNextPage) return
    setLoading(true)
    try {
      const nextPage = page + 1
      const res = await fetch(`/api/projects?page=${nextPage}&limit=6`)
      const data = await res.json()
      setProjects((prev) => [...prev, ...data.projects])
      setPage(nextPage)
      setHasNextPage(data.hasNextPage)
    } finally {
      setLoading(false)
    }
  }, [loading, hasNextPage, page])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {hasNextPage && (
        <div ref={sentinelRef} className="flex justify-center py-8">
          {loading && <Loader2 className="size-6 animate-spin text-muted-foreground" />}
        </div>
      )}
    </>
  )
}
