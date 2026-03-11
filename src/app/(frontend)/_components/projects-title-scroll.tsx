'use client'

import React, { useEffect, useRef, useState } from 'react'

export const ProjectsTitleScroll: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [translateX, setTranslateX] = useState(-30)

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const rect = wrapper.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight

      // Gdy sekcja wjeżdża od dołu: progress 0 (napis po lewej).
      // Gdy sekcja wyjeżdża do góry: progress 1 (napis po prawej).
      const scrollRange = viewportHeight + rect.height
      const scrolled = viewportHeight - rect.top
      const progress = Math.min(1, Math.max(0, scrolled / scrollRange))

      // Od lewej (-40vw) do prawej (+40vw) w miarę scrollowania
      const offset = -40 + progress * 80
      setTranslateX(offset)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div ref={wrapperRef} className="relative mb-6 lg:mb-12 h-[40vh] lg:h-[60vh]">
      <div
        className="pointer-events-none absolute top-1/2 left-[50%] whitespace-nowrap text-[26vw] sm:text-[22vw] lg:text-[20rem] font-bold tracking-tight text-foreground/5 leading-none transition-transform duration-75 will-change-transform"
        style={{
          transform: `translateX(calc(-50% + ${translateX}vw)) translateY(-50%)`,
          marginLeft: 'calc(-50vw + 50%)',
          width: '100vw',
          textAlign: 'center',
        }}
        aria-hidden="true"
      >
        PROJECTS
      </div>
    </div>
  )
}
