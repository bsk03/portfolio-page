'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { MenuIcon, X } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { useMobileHeaderStore } from '@/store/mobile-header-store'
import { MobileHeader } from './MobileHeader'

export const HeaderClient: React.FC = () => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const { isMenuOpen, setIsMenuOpen } = useMobileHeaderStore()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <>
      <header
        className=" z-20 mx-auto absolute top-0 left-0 w-full  "
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className={cn('page  flex justify-between py-6')}>
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
