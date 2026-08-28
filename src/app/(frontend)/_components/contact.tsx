'use client'

import Link from 'next/link'
import React from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/bsk03', Icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/blazejkowalczyk', Icon: Linkedin },
  { label: 'Email', href: 'mailto:blazej2k3@gmail.com', Icon: Mail },
]

export default function Contact() {
  return (
    <section id="contact" className="page relative py-8 sm:py-10">
      <Reveal className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <p className="eyebrow">Current status</p>
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                Open to work
              </span>
            </div>
            <p className="text-[13px] text-ink-2">
              Available for full-stack and mobile projects. Usually replying within a day.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="eyebrow">Find me here</p>

          <Link
            href="mailto:blazej2k3@gmail.com"
            className="group flex items-center gap-2 border-b border-border py-2 text-sm transition-colors hover:text-brand"
          >
            <Mail className="size-4 text-ink-muted transition-colors group-hover:text-brand" />
            blazej2k3@gmail.com
          </Link>

          <div className="flex gap-2 pt-1">
            {SOCIALS.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-card text-ink-muted transition-colors hover:border-brand hover:text-brand"
              >
                <Icon className="size-4" />
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
