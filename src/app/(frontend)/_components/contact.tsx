'use client'

import Link from 'next/link'
import React from 'react'
import { Reveal, StaggerContainer, StaggerItem } from '@/components/motion/reveal'

const links = [
  {
    label: 'github',
    href: 'https://github.com/bsk03',
    display: 'github.com/bsk03',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/blazejkowalczyk',
    display: 'linkedin.com/in/blazejkowalczyk',
  },
  {
    label: 'email',
    href: 'mailto:blazej.kowalczyk@example.com',
    display: 'blazej2k3@gmail.com',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-4 lg:py-16 pt-0">
      <div className="page w-full flex flex-col gap-6 lg:gap-16">
        <Reveal>
          <p className="text-5xl">Reach Out</p>
        </Reveal>
        <StaggerContainer className="flex flex-col gap-6 lg:gap-16" stagger={0.12}>
          {links.map((link) => (
            <StaggerItem key={link.label} direction="left">
              <div className="font-bold flex flex-col gap-2 text-4xl">
                <p>{link.label}</p>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex flex-col"
                >
                  <span className="text-gray-500 text-2xl lg:text-3xl leading-tight">
                    {link.display}
                  </span>
                  <span className="mt-1 h-px w-0 bg-current opacity-60 transition-all duration-200 ease-out group-hover:w-full" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
