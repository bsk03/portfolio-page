'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export type GalleryItem = {
  url: string
  alt: string
  caption: string | null
  width: number
  height: number
}

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [openAt, setOpenAt] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<Element | null>(null)

  const close = useCallback(() => setOpenAt(null), [])
  const step = useCallback(
    (delta: number) => setOpenAt((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (openAt === null) return

    lastFocused.current = document.activeElement
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }

    // Block scrolling by swallowing the events rather than setting
    // `body { overflow: hidden }`. That would remove the scrollbar, widen the
    // viewport by its width, and shift every `fixed` element — the same jitter
    // the Radix theme dropdown used to cause. `scrollbar-gutter: stable` does
    // not help here: the gutter is only reserved while overflow is auto/scroll.
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
  }, [openAt, close, step])

  if (items.length === 0) return null

  const current = openAt === null ? null : items[openAt]

  return (
    <>
      <div className="flex flex-col gap-6">
        {items.map((item, i) => (
          <figure key={`${item.url}-${i}`} className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setOpenAt(i)}
              aria-label={`Open image ${i + 1} of ${items.length} full screen`}
              className="group block w-full overflow-hidden rounded-xl border border-border bg-muted transition-colors hover:border-brand/40"
            >
              <Image
                src={item.url}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 768px) 100vw, 728px"
                className="h-auto w-full"
                unoptimized
              />
            </button>
            {item.caption && (
              <figcaption className="font-mono text-[11px] text-ink-muted">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3 bg-black/90 p-4 backdrop-blur-sm"
        >
          <div className="flex w-full max-w-5xl items-center justify-between">
            <span className="font-mono text-[11px] tracking-[0.12em] text-white/60">
              {String((openAt ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
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
              disabled={items.length < 2}
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
              disabled={items.length < 2}
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
