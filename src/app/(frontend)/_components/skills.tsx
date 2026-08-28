'use client'

import 'devicon/devicon.min.css'
import React from 'react'
import { Reveal, StaggerContainer, StaggerItem } from '@/components/motion/reveal'
import { SectionHeading } from './section-heading'

const SKILLS = [
  { label: 'TypeScript', icon: 'devicon-typescript-plain' },
  { label: 'JavaScript', icon: 'devicon-javascript-plain' },
  { label: 'React', icon: 'devicon-react-original' },
  { label: 'Next.js', icon: 'devicon-nextjs-plain' },
  { label: 'React Native', icon: 'devicon-reactnative-original' },
  { label: 'Expo', icon: 'devicon-expo-original' },
  { label: 'Tailwind CSS', icon: 'devicon-tailwindcss-original' },
  { label: 'Node.js', icon: 'devicon-nodejs-plain' },
  { label: 'Express', icon: 'devicon-express-original' },
  { label: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
  { label: 'MongoDB', icon: 'devicon-mongodb-plain' },
  { label: 'Docker', icon: 'devicon-docker-plain' },
  { label: 'Git', icon: 'devicon-git-plain' },
  { label: 'Figma', icon: 'devicon-figma-plain' },
]

export default function Skills() {
  return (
    <section id="skills" className="page relative flex flex-col gap-5 py-8 sm:py-10">
      <SectionHeading>Skills and Technologies</SectionHeading>

      <StaggerContainer className="flex flex-wrap gap-2" stagger={0.03}>
        {SKILLS.map((skill) => (
          <StaggerItem key={skill.label} direction="up">
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1 font-mono text-xs text-ink-2 transition-colors hover:border-brand hover:text-foreground">
              <i className={`${skill.icon} text-sm`} aria-hidden="true" />
              {skill.label}
            </span>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <Reveal delay={0.15}>
        <p className="text-[13px] text-ink-muted">
          Day-to-day tooling for building responsive web and mobile apps, reliable backends and
          scalable deployments.
        </p>
      </Reveal>
    </section>
  )
}
