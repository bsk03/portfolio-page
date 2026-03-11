'use client'

import React from 'react'
import { NavItem } from './NavItem'
import { cn } from '@/utilities/ui'

interface NavSectionProps {
  order: number
  title: string
  items: Array<{ label: string; href: string }>
}

export const NavSection: React.FC<NavSectionProps> = ({
  order,
  title,
  items,
}) => {
  const orderFormatted = String(order).padStart(2, '0')

  return (
    <div>
      {/* Nagłówek sekcji */}
      <div className="pt-6 pb-1 pl-4">
        <span className="text-xs">
          <span className="text-muted-foreground">{orderFormatted}</span>{' '}
          <span className="text-foreground">{title}</span>
        </span>
      </div>

      {/* Lista itemów */}
      <div className="flex flex-col">
        {items.map((item) => (
          <NavItem
            key={item.href}
            label={item.label}
            href={item.href}
          />
        ))}
      </div>
    </div>
  )
}

