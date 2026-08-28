import type { Metadata } from 'next'

// These routes read from Payload at build time. Without a revalidate window they
// stay frozen on the HTML produced by the last deploy, so anything added in the
// CMS afterwards never appears in production.
export const revalidate = 60

import React from 'react'
import Hero from './_components/hero'
import AboutMe from './_components/about-me'
import Contact from './_components/contact'
import Experience from './_components/experience'
import RecentProjects from './_components/recent-projects'
import Skills from './_components/skills'
import { IndexNav } from './_components/index-nav'

export default function HomePage() {
  return (
    <>
      <IndexNav />
      <Hero />
      <AboutMe />
      <Experience />
      <RecentProjects />
      <Skills />
      <Contact />
    </>
  )
}

export const metadata: Metadata = {
  title: 'Błażej Kowalczyk – Full‑Stack Developer',
  description: 'Portfolio Błażeja Kowalczyka – Full‑Stack Developera.',
}
