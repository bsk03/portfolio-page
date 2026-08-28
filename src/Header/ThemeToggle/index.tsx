'use client'

import { Moon, Sun } from 'lucide-react'
import React from 'react'

import type { Theme } from '@/providers/Theme/types'

import { useTheme } from '@/providers/Theme'

/**
 * Plain button on purpose — a Radix Select here locks body scroll on open,
 * which removes the scrollbar and shifts every `fixed` element by half its width.
 */
export const ThemeToggle: React.FC = () => {
  const { setTheme } = useTheme()

  const toggle = () => {
    const current = document.documentElement.getAttribute('data-theme') as Theme | null
    setTheme(current === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
      className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-card text-ink-muted transition-colors hover:border-brand hover:text-brand"
    >
      {/* Both are rendered and swapped in CSS, so the first paint can't mismatch the server. */}
      <Sun className="hidden size-4 dark:block" />
      <Moon className="size-4 dark:hidden" />
    </button>
  )
}
