'use client'

import React from 'react'
import { StaggerContainer, StaggerItem } from '@/components/motion/reveal'

export function AnimatedProjects({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children)

  return (
    <StaggerContainer className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2" stagger={0.08}>
      {items.map((child, i) => (
        <StaggerItem key={i} className="flex h-full">
          {child}
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}
