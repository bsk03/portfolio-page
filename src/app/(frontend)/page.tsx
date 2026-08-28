import type { Metadata } from 'next'
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
