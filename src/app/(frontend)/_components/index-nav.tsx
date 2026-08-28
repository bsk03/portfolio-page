'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'

const ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

/** Fixed side index with scroll-spy. Desktop only — it sits outside the reading column. */
export function IndexNav() {
  const [active, setActive] = useState(ITEMS[0].id)
  // Sections render nothing when their CMS collection is empty, so only list
  // the ones actually on the page.
  const [items, setItems] = useState(ITEMS)

  useEffect(() => {
    setItems(ITEMS.filter((item) => document.getElementById(item.id)))
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const anchor = window.innerHeight * 0.35
      let current = ITEMS[0].id

      for (const item of ITEMS) {
        const el = document.getElementById(item.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= anchor) current = item.id
      }

      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const goTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <aside className="fixed left-[calc(50%+420px)] top-1/2 z-[99] hidden -translate-y-1/2 flex-col items-start gap-2 text-left xl:flex">
      <span className="eyebrow mb-2 text-ink-muted">Index</span>

      {items.map((item) => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(item.id)}
            className={cn(
              'flex w-full items-center gap-2 border-none bg-transparent p-0 text-left text-base transition-colors duration-200',
              isActive ? 'font-semibold text-foreground' : 'text-ink-muted hover:text-foreground',
            )}
          >
            <span
              className={cn(
                'h-px w-3 bg-brand transition-opacity duration-200',
                isActive ? 'opacity-100' : 'opacity-0',
              )}
            />
            {item.label}
          </button>
        )
      })}
    </aside>
  )
}
