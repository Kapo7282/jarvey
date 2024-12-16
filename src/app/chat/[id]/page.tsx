'use client'

import { ChatHeader } from '@/components/Chat/ChatHeader'
import { ChatMessage } from '@/components/Chat/Message'
import { MessageComposer } from '@/components/Chat/MessageComposer'
import { MessageList } from '@/components/Chat/MessageList'
import { CustomerInfo } from '@/components/CustomerInfo/CustomerInfo'
import { useChat } from '@/lib/hooks/useChat'
import { useScrollToBottom } from '@/lib/hooks/useScrollToBottom'

interface ChatPageProps {
  params: {
    id: string
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  const { chatData, messages, sendMessage } = useChat(params.id)
  const scrollRef = useScrollToBottom([messages])

  const initialTags = [
    { id: 'active-subscriber', text: 'Active Subscriber', color: 'blue' },
    { id: 'ai-responded', text: 'AI Responded', color: 'green' },
    { id: 'high-priority', text: 'High Priority', color: 'red' }
  ]

  return (
    <div className="flex h-full bg-gray-50">
      <div className="w-[280px] flex-shrink-0">
        <MessageList messages={messages} activeId={params.id} />
      </div>
      
      <div className="flex-1 flex flex-col min-w-[500px] mr-[320px]">
        <ChatHeader
          title={chatData.title}
          orderNumber={chatData.orderNumber}
          initialTags={initialTags}
        />
        
        <div className="flex-1 min-h-0 relative">
          <div 
            ref={scrollRef}
            className="absolute inset-0 overflow-y-auto scroll-smooth"
          >
            <div className="max-w-3xl mx-auto py-3 px-4">
              <div className="space-y-3">
                <div className="text-center">
                  <span className="inline-block px-2 py-0.5 text-xs font-medium text-gray-500 bg-white rounded-full border">
                    FRI, OCT 18
                  </span>
                </div>
                
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    sender={message.sender.name}
                    timestamp={message.timestamp.toLocaleTimeString()}
                    content={message.content}
                    isAI={message.isAI}
                    isSelf={message.sender.name === 'You'}
                    attachments={message.attachments}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="max-w-3xl mx-auto">
            <MessageComposer onSend={sendMessage} />
          </div>
        </div>
      </div>

      <div className="fixed top-0 right-0 h-full w-[320px] border-l">
        <CustomerInfo />
      </div>
    </div>
  )
}