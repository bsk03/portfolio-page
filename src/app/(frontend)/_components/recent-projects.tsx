import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getProjects } from '@/data/projects'
import { AnimatedProjects } from './animated-projects'
import { ProjectCard } from './project-card'
import { SectionHeading } from './section-heading'

export default async function RecentProjects() {
  const projects = await getProjects()
  const displayedProjects = projects.slice(0, 4)

  return (
    <section id="projects" className="page relative flex flex-col gap-5 py-8 sm:py-10">
      <SectionHeading>Projects</SectionHeading>

      <AnimatedProjects>
        {displayedProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </AnimatedProjects>

      {projects.length > displayedProjects.length && (
        <div className="flex justify-center pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-brand hover:text-brand"
          >
            View all {projects.length} projects
            <ArrowRight className="size-3.5 text-brand" />
          </Link>
        </div>
      )}
    </section>
  )
}
