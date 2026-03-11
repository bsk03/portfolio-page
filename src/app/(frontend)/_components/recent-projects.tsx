import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProjectsTitleScroll } from './projects-title-scroll'
import { getProjects } from '@/data/projects'
import { Button } from '@/components/ui/button'
import { AnimatedProjects } from './animated-projects'
import { ProjectRow } from './project-row'

export default async function RecentProjects() {
  const projects = await getProjects()
  const displayedProjects = projects.slice(0, 3)

  return (
    <section
      id="projects"
      className="page w-full flex flex-col gap-8 lg:gap-12 py-4 lg:py-16 pt-0 relative"
    >
      <AnimatedProjects>
        {displayedProjects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} />
        ))}
      </AnimatedProjects>

      <div className="flex justify-center z-10">
        <Button variant="outline" size="lg" asChild>
          <Link href="/projects" className="gap-2">
            View all projects <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="absolute top-[-150px] left-0 w-full h-full pointer-events-none z-[1]">
        <ProjectsTitleScroll />
      </div>
    </section>
  )
}
