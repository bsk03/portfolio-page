'use client'

import React, { useEffect, useState } from 'react'

const CODE_LINES = [
  'const stack = ["next", "react-native", "node"]',
  'export async function getProjects() {',
  '  const payload = await getPayload({ config })',
  '  return payload.find({ collection: "projects" })',
  '}',
  'git commit -m "feat: hero banner"',
  'pnpm build --turbopack',
  '✓ compiled successfully in 1.9s',
  'type Project = { slug: string; title: string }',
  'docker compose up -d postgres',
]

function LocalClock() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat('pl-PL', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Europe/Warsaw',
        }).format(new Date()),
      )

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center gap-2 font-mono text-xs text-white/60">
      <span className="tracking-[0.2em]">CET</span>
      <span className="tabular-nums tracking-[0.15em] text-white">{time ?? '--:--:--'}</span>
    </div>
  )
}

export function HeroBanner() {
  // Two identical copies: the track scrolls up by exactly one copy, then snaps
  // back to an identical frame, so the seam is invisible.
  const lines = [...CODE_LINES, ...CODE_LINES]

  return (
    <div className="banner-base banner-terminal mx-auto h-28 w-full max-w-3xl sm:h-32 md:h-36">
      <div
        className="banner-terminal-mask absolute inset-0 overflow-hidden px-4 pt-8"
        aria-hidden="true"
      >
        <div className="banner-terminal-track font-mono text-[11px] leading-5 opacity-60">
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre">
              <span className="opacity-40">
                {String((i % CODE_LINES.length) + 1).padStart(2, '0')}{' '}
              </span>
              {line}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-start justify-between p-3">
        <span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 font-mono text-[11px] text-white/80 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          bsk03
        </span>
      </div>

      <div className="absolute bottom-3 right-3">
        <LocalClock />
      </div>
    </div>
  )
}
