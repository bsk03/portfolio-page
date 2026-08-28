'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { cn } from '@/utilities/ui'

export type GalleryItem = {
  url: string
  alt: string
  caption: string | null
  width: number
  height: number
}

const AUTOPLAY_MS = 5000

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  return reduced
}

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const railRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<Element | null>(null)

  const reducedMotion = useReducedMotion()
  const count = items.length

  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  )

  // Autoplay. Loops back to the first slide, so the rail scrolls home on its own.
  const autoplayOn = count > 1 && !paused && !lightboxOpen && !reducedMotion

  useEffect(() => {
    if (!autoplayOn) return
    const id = setTimeout(() => step(1), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [autoplayOn, index, step])

  // Keep the active thumbnail in view. `nearest` scrolls only when it has to,
  // so the rail stays still while the active thumb is already visible.
  useEffect(() => {
    const thumb = thumbRefs.current[index]
    const rail = railRef.current
    if (!thumb || !rail) return
    if (rail.scrollHeight <= rail.clientHeight && rail.scrollWidth <= rail.clientWidth) return

    thumb.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })
  }, [index, reducedMotion])

  // Lightbox: Escape closes, arrows navigate.
  useEffect(() => {
    if (!lightboxOpen) return

    lastFocused.current = document.activeElement
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }

    // Swallow scroll events instead of setting `overflow: hidden`, which would
    // drop the scrollbar, widen the viewport and shift every fixed element.
    const blockScroll = (e: Event) => e.preventDefault()

    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', blockScroll, { passive: false })
    window.addEventListener('touchmove', blockScroll, { passive: false })

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', blockScroll)
      window.removeEventListener('touchmove', blockScroll)
      ;(lastFocused.current as HTMLElement | null)?.focus?.()
    }
  }, [lightboxOpen, step])

  if (count === 0) return null

  const current = items[index]

  return (
    <>
      <div
        className="flex flex-col gap-3 sm:flex-row"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* stage */}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
            {items.map((item, i) => (
              <div
                key={item.url}
                className={cn(
                  'absolute inset-0 transition-opacity duration-500',
                  i === index ? 'opacity-100' : 'opacity-0',
                )}
              >
                {/* Blurred fill behind the image. Portrait screenshots in a 16:9
                    stage would otherwise sit in two dead bars, and dark ones
                    disappear into the background entirely. */}
                <Image
                  src={item.url}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 640px) 100vw, 640px"
                  className="scale-110 object-cover blur-xl saturate-150"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40" />
                <Image
                  src={item.url}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 640px"
                  priority={i === 0}
                  className="object-contain"
                  unoptimized
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`Open image ${index + 1} of ${count} full screen`}
              className="absolute inset-0 flex items-end justify-end p-3"
            >
              <span className="inline-flex size-8 items-center justify-center rounded-lg border border-white/15 bg-black/60 text-white/80 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                <Expand className="size-4" />
              </span>
            </button>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg border border-white/15 bg-black/60 text-white/80 opacity-0 backdrop-blur-md transition-opacity hover:text-brand group-hover:opacity-100"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg border border-white/15 bg-black/60 text-white/80 opacity-0 backdrop-blur-md transition-opacity hover:text-brand group-hover:opacity-100"
                >
                  <ChevronRight className="size-4" />
                </button>
              </>
            )}
          </div>

          {/* progress + meta */}
          {count > 1 && (
            <div className="h-px w-full overflow-hidden bg-border">
              <div
                key={`${index}-${paused}-${lightboxOpen}`}
                className={cn('carousel-progress h-px bg-brand', !autoplayOn && 'w-0')}
                style={autoplayOn ? { animationDuration: `${AUTOPLAY_MS}ms` } : undefined}
              />
            </div>
          )}

          <div className="flex min-h-4 items-start justify-between gap-4">
            <p className="font-mono text-[11px] text-ink-muted">{current.caption}</p>
            {count > 1 && (
              <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink-muted">
                {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
            )}
          </div>
        </div>

        {/* thumbnail rail — vertical beside the stage, horizontal under it on phones */}
        {count > 1 && (
          <div
            ref={railRef}
            className="carousel-rail flex shrink-0 gap-2 overflow-x-auto overflow-y-hidden sm:w-20 sm:flex-col sm:overflow-x-hidden sm:overflow-y-auto"
          >
            {items.map((item, i) => (
              <button
                key={item.url}
                ref={(el) => {
                  thumbRefs.current[i] = el
                }}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  'relative aspect-video w-20 shrink-0 overflow-hidden rounded-md border bg-muted transition-all',
                  i === index
                    ? 'border-brand opacity-100'
                    : 'border-border opacity-50 hover:opacity-100',
                )}
              >
                <Image
                  src={item.url}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3 bg-black/90 p-4 backdrop-blur-sm"
        >
          <div className="flex w-full max-w-5xl items-center justify-between">
            <span className="font-mono text-[11px] tracking-[0.12em] text-white/60">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
              className="inline-flex size-8 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-brand hover:text-brand"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.url}
            alt={current.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
          />

          <div className="flex w-full max-w-5xl items-center justify-between gap-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              aria-label="Previous image"
              disabled={count < 2}
              className="inline-flex size-8 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-brand hover:text-brand disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </button>

            {current.caption && (
              <p className="flex-1 text-center font-mono text-[11px] text-white/60">
                {current.caption}
              </p>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              aria-label="Next image"
              disabled={count < 2}
              className="inline-flex size-8 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-brand hover:text-brand disabled:opacity-30"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
