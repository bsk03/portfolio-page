'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { motion } from 'motion/react'
import { HeroBanner } from './hero-banner'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/bsk03', Icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/blazejkowalczyk', Icon: Linkedin },
  { label: 'Email', href: 'mailto:blazej2k3@gmail.com', Icon: Mail },
]

const fadeUp = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export function HeroClient({
  photoUrl,
  photoAlt,
  cvUrl,
}: {
  photoUrl: string | null
  photoAlt: string
  cvUrl: string | null
}) {
  // `overflow-x-clip` rather than `hidden`: setting one axis to hidden forces the
  // other to `auto`, which would trap the glow vertically. `clip` keeps the
  // vertical bleed while stopping the blob from widening the page on mobile.
  return (
    <section id="home" className="relative w-full overflow-x-clip pt-8 sm:pt-12">
      <div className="glow-blob left-1/4 top-1/3 -translate-x-1/2" aria-hidden="true" />
      <div className="glow-blob right-0 top-1/2 translate-x-1/3" aria-hidden="true" />

      {/* banner */}
      <HeroBanner />

      {/* identity */}
      <div className="page relative py-8 md:py-10">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.08 }}
          className="flex flex-col-reverse items-center gap-6 md:flex-row md:items-start md:justify-between"
        >
          <div className="w-full flex-1 space-y-2.5 text-left">
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl tracking-tight">Błażej Kowalczyk</h1>
              <span className="rounded-md bg-brand/10 px-1.5 py-0.5 font-mono text-xs text-brand">
                @bsk03
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink-muted sm:text-xs"
            >
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3 text-brand" />
                Poland
              </span>
              <span className="rounded-md border border-border px-1.5 py-0.5">
                Full-Stack Developer
              </span>
            </motion.div>

            <motion.p variants={fadeUp} className="pt-1 text-base font-medium">
              Turning ideas into interfaces.
            </motion.p>

            <motion.ul variants={fadeUp} className="space-y-1.5 pt-1 text-ink-2">
              <li className="flex gap-2">
                <span className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-brand" />
                <span>
                  Building clean, performant{' '}
                  <span className="font-semibold text-foreground">web &amp; mobile apps</span> across
                  the whole stack.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-brand" />
                <span>
                  Currently working with <span className="underline">Next.js</span>,{' '}
                  <span className="underline">React Native</span> and{' '}
                  <span className="underline">Node.js</span>.
                </span>
              </li>
            </motion.ul>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 pt-4">
              <Link
                href="mailto:blazej2k3@gmail.com"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-brand hover:text-brand"
              >
                <Mail className="size-3.5" />
                Get in touch
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-brand hover:text-brand"
              >
                View projects
                <ArrowRight className="size-3.5" />
              </Link>
              {cvUrl && (
                <span className="cta-ring">
                  <a
                    href={cvUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-[7px] bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:text-brand"
                  >
                    <Download className="size-3.5 text-brand" />
                    Download CV
                  </a>
                </span>
              )}
            </motion.div>

            <motion.div variants={fadeUp} className="pt-4">
              <p className="eyebrow mb-2">Connect me on</p>
              <div className="flex flex-wrap gap-2">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-brand hover:text-brand"
                  >
                    <Icon className="size-3.5" />
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {photoUrl && (
            <motion.div
              variants={fadeUp}
              className="group relative size-28 shrink-0 overflow-hidden rounded-xl border border-border md:size-32"
            >
              <Image
                src={photoUrl}
                alt={photoAlt}
                fill
                sizes="128px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
