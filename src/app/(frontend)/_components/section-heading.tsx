import React from 'react'

export function SectionHeading({
  children,
  aside,
}: {
  children: React.ReactNode
  aside?: React.ReactNode
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="text-2xl font-extrabold tracking-tight">{children}</h2>
      {aside}
    </div>
  )
}
