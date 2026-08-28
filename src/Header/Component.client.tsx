'use client'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

import { HeaderNav } from './Nav'
import { ThemeToggle } from './ThemeToggle'
import { MenuIcon, X } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { useMobileHeaderStore } from '@/store/mobile-header-store'
import { MobileHeader } from './MobileHeader'

export const HeaderClient: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useMobileHeaderStore()

  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 50) {
        setVisible(true)
      } else if (currentScrollY < lastScrollY.current) {
        setVisible(true)
      } else {
        setVisible(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* No data-theme here on purpose — the header inherits the theme from <html>. */}
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-20 bg-background/70 backdrop-blur-md transition-transform duration-300',
          visible ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <div className="page flex items-center justify-between py-3">
          <Link href="/" className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">Błażej Kowalczyk</p>
            <p className="font-mono text-[11px] tracking-[0.08em] text-ink-muted">
              Full-Stack Developer
            </p>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block xl:hidden">
              <HeaderNav />
            </div>
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <button
              className="flex items-center justify-center lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="size-5" /> : <MenuIcon className="size-5" />}
            </button>
          </div>
        </div>
      </header>
      <MobileHeader />
    </>
  )
}
