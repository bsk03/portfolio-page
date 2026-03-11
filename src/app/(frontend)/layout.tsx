import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'

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
          {/* Overscroll easter egg — behind everything */}
          <div
            className="fixed bottom-0 left-0 w-full z-0 flex items-center justify-center py-2 pointer-events-none select-none bg-black"
            aria-hidden="true"
          >
            <p className="text-[8vw] lg:text-[6vw] font-bold tracking-tight text-white/10 dark:text-white/5 whitespace-nowrap">
              BŁAŻEJ KOWALCZYK
            </p>
          </div>

          <Header />
          <main className="relative z-10 bg-background">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
