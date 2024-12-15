'use client'

import { clsx } from 'clsx'
import { usePathname, useRouter } from 'next/navigation'

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  count?: number
  active?: boolean
  to?: string
}

export function SidebarItem({ 
  icon, 
  label, 
  count, 
  active: forcedActive,
  to 
}: SidebarItemProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isActive = forcedActive || (to && pathname === to)

  const handleClick = () => {
    if (to) {
      router.push(to)
    }
  }

  return (
    <div
      className={clsx(
        "flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer",
        isActive ? "bg-purple-100 text-purple-600" : "hover:bg-gray-100"
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {count !== undefined && (
        <span className="text-sm text-gray-500">{count}</span>
      )}
    </div>
  )
}