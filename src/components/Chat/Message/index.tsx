'use client'

import { MessageAvatar } from './MessageAvatar'
import { MessageBubble } from './MessageBubble'
import { MessageHeader } from './MessageHeader'
import { MessageWrapper } from './MessageWrapper'
import { MessageAttachments } from './MessageAttachments'

interface ChatMessageProps {
  content: string
  timestamp: string
  sender: string
  isAI?: boolean
  isSelf?: boolean
  attachments?: Array<{
    id: string
    type: 'image' | 'document' | 'video' | 'audio'
    url: string
    name: string
    size?: number
    previewUrl?: string
  }>
}

export function ChatMessage({ 
  content, 
  timestamp, 
  sender, 
  isAI, 
  isSelf,
  attachments = []
}: ChatMessageProps) {
  const isOutbound = isAI || isSelf

  return (
    <div className="mb-3">
      <MessageHeader 
        sender={sender}
        timestamp={timestamp}
        isOutbound={isOutbound}
      />
      <MessageWrapper isOutbound={isOutbound}>
        <MessageAvatar 
          name={sender} 
          className="h-8 w-8 flex-shrink-0"
        />
        <div className="flex-1">
          <MessageAttachments 
            attachments={attachments}
            isOutbound={isOutbound}
          />
          <MessageBubble 
            content={content}
            isOutbound={isOutbound}
            isAI={isAI}
          />
        </div>
      </MessageWrapper>
    </div>
  )
}