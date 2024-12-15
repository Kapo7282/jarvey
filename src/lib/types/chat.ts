export interface Message {
  id: string
  title: string
  preview: string
  time: string
  unread?: boolean
  sender: {
    name: string
    avatar?: string
  }
  timestamp: Date
  content: string
  isAI?: boolean
  attachments?: Array<{
    id: string
    type: 'image' | 'document' | 'video' | 'audio'
    url: string
    name: string
    size?: number
    previewUrl?: string
  }>
}

export interface ChatData {
  title: string
  orderNumber: string
  messages: Message[]
}