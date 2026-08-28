import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { CursorGlow } from '@/components/ambient/cursor-glow'
import { NoiseOverlay } from '@/components/ambient/noise-overlay'

import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <NoiseOverlay />
          <CursorGlow />

          <Header />
          <main className="relative z-10 flex-1 pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
