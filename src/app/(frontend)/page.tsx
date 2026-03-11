import type { Metadata } from 'next'
import React from 'react'
import AboutMe from './_components/about-me'
import Contact from './_components/contact'
import RecentProjects from './_components/recent-projects'
import Skills from './_components/skills'

export default function HomePage() {
  return (
    <>
      <section className="min-h-screen flex items-center justify-center">
        <div className="page w-full">
          <div className="text-center lg:text-left">
            <p className="text-lg md:text-4xl mb-2 lg:mb-4">Hi, I&apos;m</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 lg:mb-4">
              Błażej Kowalczyk
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground">
              Full-Stack Developer
            </p>
          </div>
        </div>
      </section>
      <AboutMe />
      <RecentProjects />
      <Skills />
      <Contact />
    </>
  )
}

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to my portfolio',
}
