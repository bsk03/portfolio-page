'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { MenuIcon, X } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { useMobileHeaderStore } from '@/store/mobile-header-store'
import { MobileHeader } from './MobileHeader'

export const HeaderClient: React.FC = () => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const { isMenuOpen, setIsMenuOpen } = useMobileHeaderStore()

  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

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
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-20 bg-background/80 backdrop-blur-md transition-transform duration-300',
          visible ? 'translate-y-0' : '-translate-y-full',
        )}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className={cn('page flex justify-between py-6')}>
          <Link href="/">
            <div>
              <p className="text-lg ">Błażej Kowalczyk</p>
              <p className="text-sm text-gray-500">Full Stack Developer</p>
            </div>
          </Link>
          <button
            className="lg:hidden flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
          <div className="hidden lg:block">
            <HeaderNav />
          </div>
        </div>
      </header>
      <MobileHeader />
    </>
  )
}
