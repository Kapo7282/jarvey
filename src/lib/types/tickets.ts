export type TicketStatus = 'open' | 'resolved' | 'waiting' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high'

export interface Ticket {
  id: string
  customer: {
    name: string
    email: string
  }
  subject: string
  status: TicketStatus
  priority: TicketPriority
  lastUpdate: Date
  orderNumber?: string
}

export interface SortOption {
  id: string
  label: string
  description: string
}