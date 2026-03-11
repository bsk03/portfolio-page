import { Github, Play, Zap } from 'lucide-react'
import React from 'react'
import { TProject } from './recent-projects'
import Link from 'next/link'

function Badge({ label }: { label: string }) {
  return (
    <div className="flex gap-2 items-center px-2 py-1 rounded-lg  bg-white w-fit text-slate-800">
      <p className="text-xs">{label}</p>
    </div>
  )
}

export default function ProjectCard({
  title,
  description,
  image,
  demo,
  source,
  technologies,
}: TProject) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="size-16 rounded-lg bg-gray-400" />
        <div className="flex flex-col gap-2 justify-between">
          <p className="text-2xl ">{title}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <Badge key={technology} label={technology} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-500 text-sm">{description}</p>
      <div className="flex gap-6">
        {demo && (
          <Link href={demo} className="flex gap-2 items-center text-xs">
            <Zap className="size-4" /> Live Demo
          </Link>
        )}
        {source && (
          <Link href={source} className="flex gap-2 items-center text-xs">
            <Github className="size-4" /> View Source
          </Link>
        )}
      </div>
    </div>
  )
}
