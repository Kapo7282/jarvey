'use client'

import { useState } from 'react'
import type { Message, ChatData } from '../types/chat'

const MOCK_CHAT_DATA: ChatData = {
  title: "Change my shipping address",
  orderNumber: "Order #2631",
  messages: [
    {
      id: '1',
      title: 'Address Change Request',
      preview: 'Hey support, I was traveling this...',
      time: '2h ago',
      sender: { name: "Marco D" },
      timestamp: new Date(),
      content: `Hey support,
I as traveling this weekend to my parent's house in San Francisco.
Their address is:`,
      attachments: [
        {
          id: '1',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8',
          name: 'document.jpg',
          size: 1024 * 1024 * 2.5 // 2.5MB
        }
      ]
    },
    {
      id: '2', 
      title: 'AI Response',
      preview: 'Hello, thank you for letting us know...',
      time: '2h ago',
      sender: { name: "AI Agent" },
      timestamp: new Date(),
      isAI: true,
      content: `Hello,
Thank you for letting us know about the change needed for your shipping address. From what I understand, you'd like to update the shipping address for your order #1503 to the new San Francisco location before your travel this weekend.

To ensure I've got everything correct, you would like to change the address to:
Gorgias Street 123,
San Francisco, USA

Before we go ahead and update the address, please confirm that all the details provided are accurate and that you authorize this change. Once you confirm, we'll proceed to edit the shipping address on your order and provide you with an update.

Looking forward to your confirmation.`
    }
  ]
}

export function useChat(chatId: string) {
  const [messages, setMessages] = useState<Message[]>(MOCK_CHAT_DATA.messages)
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (content: string, attachments: File[] = []) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newMessage: Message = {
        id: Math.random().toString(),
        title: 'New Message',
        preview: content.slice(0, 50) + '...',
        time: 'Just now',
        content,
        sender: { name: 'You' },
        timestamp: new Date(),
        attachments: attachments.map(file => ({
          id: Math.random().toString(),
          type: file.type.startsWith('image/') ? 'image' : 
                file.type.startsWith('video/') ? 'video' :
                file.type.startsWith('audio/') ? 'audio' : 'document',
          url: URL.createObjectURL(file),
          name: file.name,
          size: file.size
        }))
      }
      
      setMessages(prev => [...prev, newMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return {
    chatData: MOCK_CHAT_DATA,
    messages,
    isLoading,
    sendMessage
  }
}