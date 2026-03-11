'use client'

import React from 'react'
import Link from 'next/link'
import { CornerDownRight } from 'lucide-react'
import { useMobileHeaderStore } from '@/store/mobile-header-store'
import { cn } from '@/utilities/ui'

interface NavItemProps {
  label: string
  href: string
}

export const NavItem: React.FC<NavItemProps> = ({ label, href }) => {
  const setIsMenuOpen = useMobileHeaderStore((state) => state.setIsMenuOpen)

  const handleClick = () => {
    setIsMenuOpen(false)
    // Nawigacja będzie obsługiwana przez Link
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        'flex items-center gap-2 py-2.5 pl-8 transition-colors duration-200',
        'hover:bg-muted text-sm text-muted-foreground'
      )}
    >
      <CornerDownRight className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )
}

