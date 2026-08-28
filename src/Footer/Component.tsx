import React from 'react'

export async function Footer() {
  return (
    <footer className="relative z-10 mt-8 border-t border-border bg-background">
      <div className="page flex flex-col items-center gap-2 py-10">
        <p className="text-4xl font-black tracking-tighter">
          bsk<span className="text-brand">.</span>
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
          © {new Date().getFullYear()} Błażej Kowalczyk
        </p>
      </div>
    </footer>
  )
}
