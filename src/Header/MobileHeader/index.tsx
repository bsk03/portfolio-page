'use client'

import React from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { useMobileHeaderStore } from '@/store/mobile-header-store'
import { useScrollLock } from '@/hooks/useScrollLock'
import { ThemeToggle } from '../ThemeToggle'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const MobileHeader: React.FC = () => {
  const isMenuOpen = useMobileHeaderStore((state) => state.isMenuOpen)
  const setIsMenuOpen = useMobileHeaderStore((state) => state.setIsMenuOpen)

  useScrollLock(isMenuOpen)

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  // Unmounted while closed, on purpose. Parking the panel off-screen with
  // `translate-x-full` left a full-viewport-wide box to the right of the page.
  // Being `fixed`, it ignored `overflow-x: hidden` on body — it is positioned
  // against the viewport, not against body — so mobile Safari let you pan
  // sideways into empty space. AnimatePresence keeps the slide-out animation.
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 top-[3.75rem] z-30 flex flex-col bg-background lg:hidden"
          style={{
            height: 'calc(100dvh - 3.75rem)',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <nav
            className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="py-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="shrink-0 border-t border-border bg-background p-6">
            <ThemeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
