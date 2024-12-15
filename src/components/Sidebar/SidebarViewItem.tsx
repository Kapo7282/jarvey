'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { GripVertical } from 'lucide-react'

interface SidebarViewItemProps {
  icon: React.ReactNode
  label: string
  count?: number
  to?: string
  onFavorite?: () => void
  isFavorite?: boolean
  dragHandleProps?: any
  isDragging?: boolean
}

export function SidebarViewItem({
  icon,
  label,
  count,
  to,
  onFavorite,
  isFavorite = false,
  dragHandleProps,
  isDragging = false
}: SidebarViewItemProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)
  const isActive = to && pathname === to

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={clsx(
          "flex items-center justify-between px-2 py-1 rounded-md cursor-pointer transition-all duration-200",
          isActive ? "bg-purple-50 text-purple-600" : "hover:bg-gray-50"
        )}
        onClick={() => to && router.push(to)}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          {/* Drag handle */}
          <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing">
            <GripVertical className={clsx(
              "w-3 h-3 text-gray-400 transition-opacity",
              isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )} />
          </div>
          <span className="text-sm">{icon}</span>
          <span className="text-xs truncate">{label}</span>
          {typeof count !== 'undefined' && (
            <span className="text-[10px] text-gray-500 flex-shrink-0">{count}</span>
          )}
        </div>

        {(isHovered || isFavorite) && (
          <div className="flex items-center gap-1 animate__animated animate__fadeIn animate__faster">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onFavorite?.()
              }}
              className="p-0.5 hover:bg-gray-100 rounded transition-colors"
            >
              {isFavorite ? (
                <StarIconSolid className="w-3 h-3 text-yellow-400" />
              ) : (
                <StarIcon className="w-3 h-3 text-gray-400" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}