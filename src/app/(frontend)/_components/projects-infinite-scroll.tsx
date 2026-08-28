'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import type { Project } from '@/data/projects'
import { ProjectCard } from './project-card'

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {hasNextPage && (
        <div ref={sentinelRef} className="flex justify-center py-6">
          {loading && <Loader2 className="size-5 animate-spin text-ink-muted" />}
        </div>
      )}
    </>
  )
}
