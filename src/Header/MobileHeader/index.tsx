'use client'

import React from 'react'
import Link from 'next/link'
import { useMobileHeaderStore } from '@/store/mobile-header-store'
import { useScrollLock } from '@/hooks/useScrollLock'
import { ThemeToggle } from '../ThemeToggle'
import { cn } from '@/utilities/ui'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const MobileHeader: React.FC = () => {
  const isMenuOpen = useMobileHeaderStore((state) => state.isMenuOpen)
  const setIsMenuOpen = useMobileHeaderStore((state) => state.setIsMenuOpen)

  useScrollLock(isMenuOpen)

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <div
      className={cn(
        'lg:hidden fixed inset-0 top-[4.75rem] z-30 flex flex-col bg-background transition-transform duration-300 ease-in-out',
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      )}
      style={{
        height: 'calc(100dvh - 4.75rem)',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Scrollowalna sekcja z linkami */}
      <nav 
        className="flex-1 overflow-y-auto flex flex-col p-6 gap-4 min-h-0"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleLinkClick}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      
      {/* Footer z Theme Toggle */}
      <div className="flex-shrink-0 bg-background border-t border-border p-6">
        <ThemeToggle />
      </div>
    </div>
  )
}

