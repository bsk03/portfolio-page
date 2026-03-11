import React from 'react'

export async function Footer() {
  return (
    <footer className="relative z-10 bg-background">
      <div className="border-t border-border bg-black dark:bg-card text-white rounded-tl-[100px] flex items-center justify-center py-4">
        <p className="text-sm text-center">
          © {new Date().getFullYear()} Błażej Kowalczyk. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
