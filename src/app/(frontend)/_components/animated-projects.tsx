'use client'

import React from 'react'
import { Reveal, StaggerContainer, StaggerItem } from '@/components/motion/reveal'

export function AnimatedProjects({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children)

  return (
    <>
      <Reveal className="z-10">
        <h2 className="text-4xl lg:text-5xl font-semibold">Recent Projects</h2>
      </Reveal>

      <StaggerContainer className="flex flex-col z-10" stagger={0.15}>
        {items.map((child, i) => (
          <StaggerItem key={i}>
            {child}
          </StaggerItem>
        ))}
      </StaggerContainer>
    </>
  )
}
