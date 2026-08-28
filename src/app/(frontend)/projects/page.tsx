import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getProjectsPaginated } from '@/data/projects'
import { ProjectsInfiniteScroll } from '../_components/projects-infinite-scroll'
import type { Metadata } from 'next'

// These routes read from Payload at build time. Without a revalidate window they
// stay frozen on the HTML produced by the last deploy, so anything added in the
// CMS afterwards never appears in production.
export const revalidate = 60


export const metadata: Metadata = {
  title: 'Projects – Błażej Kowalczyk',
  description: 'All projects by Błażej Kowalczyk.',
}

export default async function ProjectsPage() {
  const { projects, hasNextPage } = await getProjectsPaginated(1, 6)

  return (
    <div className="page flex flex-col gap-6 py-8 sm:py-10">
      <div className="flex flex-col gap-4">
        <Link
          href="/#projects"
          className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-3.5" />
          Back home
        </Link>
        <h1 className="text-2xl font-extrabold tracking-tight">All Projects</h1>
        <p className="text-[13px] text-ink-muted">
          A collection of things I&apos;ve built.
        </p>
      </div>

      <ProjectsInfiniteScroll
        initialProjects={projects}
        initialHasNextPage={hasNextPage}
      />
    </div>
  )
}
