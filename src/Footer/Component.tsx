import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer
      className="mt-auto border-t border-border bg-black dark:bg-card text-white rounded-l-[100px] rounded-b-0 flex items-center justify-center py-4"
      style={{ borderBottomLeftRadius: '0px' }}
    >
      <p className="text-sm text-center">
        © {new Date().getFullYear()} Błażej Kowalczyk. All rights reserved.
      </p>
    </footer>
  )
}
