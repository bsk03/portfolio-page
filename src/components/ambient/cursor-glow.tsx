'use client'

import React, { useEffect, useRef } from 'react'

const HOVER_TARGETS = 'a, button, [role="button"], input, textarea, select, [data-cursor-grow]'
const SIZE = 64
const EASE = 0.15

/**
 * Blue glow that trails the pointer and swells over interactive elements.
 * Driven by rAF (no CSS transition) so it lags behind the real cursor.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reducedMotion.matches) return

    const target = { x: -200, y: -200 }
    const pos = { x: -200, y: -200 }
    let scale = 1
    let targetScale = 1
    let raf = 0

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      const node = e.target as Element | null
      targetScale = node?.closest?.(HOVER_TARGETS) ? 1.5 : 1
    }

    const onLeave = () => {
      target.x = -200
      target.y = -200
    }

    const tick = () => {
      pos.x += (target.x - pos.x) * EASE
      pos.y += (target.y - pos.y) * EASE
      scale += (targetScale - scale) * EASE
      el.style.transform = `translate(${pos.x - SIZE / 2}px, ${pos.y - SIZE / 2}px) scale(${scale})`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9998] h-16 w-16 rounded-full bg-brand/20 blur-[20px] will-change-transform"
      style={{ transform: 'translate(-200px, -200px)' }}
    />
  )
}
