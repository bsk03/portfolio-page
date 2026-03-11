'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '../ThemeToggle'

export const HeaderNav: React.FC = () => {
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ]

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)
  const [isActive, setIsActive] = useState(false)

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const container = containerRef.current
    if (!container) return

    const linkRect = e.currentTarget.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    const left = linkRect.left - containerRect.left
    const width = linkRect.width

    setIndicator({ left, width })
    setIsActive(true)
  }

  const handleLeave = () => {
    setIsActive(false)
  }

  return (
    <nav className="flex items-center gap-6">
      <div
        ref={containerRef}
        className="relative flex items-center gap-6"
        onMouseLeave={handleLeave}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onMouseEnter={handleEnter}
            className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            {item.label}
          </Link>
        ))}
        {/* Sliding underline indicator */}
        {indicator && (
          <span
            className="pointer-events-none absolute bottom-[-0.35rem] h-[2px] rounded-full bg-primary transition-all duration-200 ease-out"
            style={{
              opacity: isActive ? 1 : 0,
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
            }}
          />
        )}
      </div>
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </nav>
  )
}
