import React from 'react'
import { cn } from '@/utilities/ui'

export type ProjectStatus = 'live' | 'in-progress' | 'archived' | 'concept'

const STATUS = {
  live: { label: 'Live', dot: 'bg-emerald-500' },
  'in-progress': { label: 'In progress', dot: 'bg-amber-500' },
  archived: { label: 'Archived', dot: 'bg-ink-muted' },
  concept: { label: 'Concept', dot: 'bg-brand' },
} as const

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const meta = STATUS[status] ?? STATUS.live

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-ink-muted',
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', meta.dot)} />
      {meta.label}
    </span>
  )
}
