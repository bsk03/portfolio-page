import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getProjectsPaginated } from '@/data/projects'
import { ProjectsInfiniteScroll } from '../_components/projects-infinite-scroll'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects – Błażej Kowalczyk',
  description: 'All projects by Błażej Kowalczyk.',
}

export default async function ProjectsPage() {
  const { projects, hasNextPage } = await getProjectsPaginated(1, 6)

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

      <ProjectsInfiniteScroll
        initialProjects={projects}
        initialHasNextPage={hasNextPage}
      />
    </div>
  )
}
