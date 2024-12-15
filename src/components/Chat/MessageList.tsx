'use client'

import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { clsx } from 'clsx'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/button'
import { Message } from '@/lib/types/chat'

interface MessageListProps {
  messages: Message[]
  activeId?: string
}

export function MessageList({ messages, activeId }: MessageListProps) {
  const router = useRouter()

  return (
    <div className="w-full border-r bg-white overflow-hidden flex flex-col h-full">
      <div className="p-2 border-b">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-xs mb-1.5 -ml-1"
          onClick={() => router.push('/tickets/all')}
        >
          <ChevronLeftIcon className="w-3.5 h-3.5 mr-1" />
          ALL
        </Button>
        <input
          type="text"
          placeholder="Search messages..."
          className="w-full px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <button
            key={message.id}
            onClick={() => router.push(`/chat/${message.id}`)}
            className={clsx(
              "w-full text-left p-2 hover:bg-gray-50 border-b transition-colors",
              activeId === message.id && "bg-purple-50 hover:bg-purple-50",
              "animate__animated animate__fadeIn animate__faster"
            )}
          >
            <div className="flex items-start gap-2">
              <Avatar className="w-6 h-6 flex-shrink-0">
                <AvatarFallback className="text-xs">
                  {message.sender.name[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-sm font-medium truncate">
                    {message.title}
                  </span>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {message.time}
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500 truncate">
                    {message.sender.name}:
                  </span>
                  <span className="text-xs text-gray-500 truncate">
                    {message.preview}
                  </span>
                </div>
              </div>
              
              {message.unread && (
                <div className="w-1 h-1 rounded-full bg-blue-600 flex-shrink-0 mt-1.5" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}