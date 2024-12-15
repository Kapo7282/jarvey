'use client'

import { clsx } from 'clsx'

interface MessageWrapperProps {
  isOutbound?: boolean
  children: React.ReactNode
}

export function MessageWrapper({ isOutbound, children }: MessageWrapperProps) {
  return (
    <div 
      className={clsx(
        "flex gap-2 animate__animated animate__fadeIn animate__faster",
        isOutbound ? "flex-row-reverse" : "flex-row"
      )}
    >
      {children}
    </div>
  )
}