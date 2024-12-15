'use client'

import { Tag, TAG_COLORS } from '@/lib/types/tags'
import { clsx } from 'clsx'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface TagBadgeProps {
  tag: Tag
  onRemove?: () => void
  className?: string
}

export function TagBadge({ tag, onRemove, className }: TagBadgeProps) {
  const colors = TAG_COLORS[tag.color]
  
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border',
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
    >
      {tag.text}
      {onRemove && (
        <button
          onClick={onRemove}
          className="p-0.5 hover:bg-black/5 rounded-full transition-colors"
        >
          <XMarkIcon className="w-3 h-3" />
        </button>
      )}
    </span>
  )
}