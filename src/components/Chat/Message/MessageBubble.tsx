'use client'

import { clsx } from 'clsx'

interface MessageBubbleProps {
  content: string
  isOutbound?: boolean
  isAI?: boolean
  className?: string
}

export function MessageBubble({ content, isOutbound, isAI, className }: MessageBubbleProps) {
  return (
    <div 
      className={clsx(
        "p-3 rounded-lg max-w-[80%] whitespace-pre-wrap text-sm",
        isOutbound ? "ml-auto" : "mr-auto",
        isOutbound && isAI ? "bg-purple-600 text-white" : 
        isOutbound ? "bg-blue-600 text-white" : 
        "bg-white border shadow-sm",
        className
      )}
    >
      {content}
    </div>
  )
}