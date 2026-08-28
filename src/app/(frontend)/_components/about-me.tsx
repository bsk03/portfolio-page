'use client'

import React from 'react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from './section-heading'

const FACTS = [
  { label: 'Focus', value: 'Frontend / Fullstack' },
  { label: 'Based in', value: 'Poland' },
  { label: 'Stack', value: 'Next.js · React Native · Node.js' },
]

export default function AboutMe() {
  return (
    <section
      id="about"
      className="page relative overflow-hidden py-8 sm:py-10"
    >
      <Reveal className="flex flex-col gap-5">
        <SectionHeading>About</SectionHeading>

        <div className="flex flex-col gap-3 text-ink-2">
          <p>
            I&apos;m <span className="font-semibold text-foreground">Błażej Kowalczyk</span> — a
            Full-Stack Developer focused on building clean, performant and user-friendly{' '}
            <span className="underline">web &amp; mobile applications</span>.
          </p>
          <p>
            I enjoy working across the stack, creating modern interfaces and reliable backend
            solutions with attention to performance, scalability and maintainability. I value clean
            code, good UX and thoughtful architecture that stands the test of time.
          </p>
          <p>
            Outside of work I stay active through gym training and playing football — both keep me
            disciplined, focused and consistent, qualities I bring into my work as a developer.
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {FACTS.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1 bg-card px-4 py-3">
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                {fact.label}
              </dt>
              <dd className="text-sm font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
