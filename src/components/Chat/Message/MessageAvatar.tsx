'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface MessageAvatarProps {
  name: string
  className?: string
}

export function MessageAvatar({ name, className }: MessageAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarFallback className="text-xs">
        {name.split(' ').map(n => n[0]).join('')}
      </AvatarFallback>
    </Avatar>
  )
}