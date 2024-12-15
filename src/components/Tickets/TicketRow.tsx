'use client'

import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import type { Ticket } from '@/lib/types/tickets'

interface TicketRowProps {
  ticket: Ticket
}

export function TicketRow({ ticket }: TicketRowProps) {
  const router = useRouter()

  const statusColors = {
    open: 'warning',
    resolved: 'success',
    waiting: 'default',
    closed: 'secondary'
  } as const

  const priorityColors = {
    low: 'default',
    medium: 'warning',
    high: 'error'
  } as const

  return (
    <div 
      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b animate__animated animate__fadeIn animate__faster"
      onClick={() => router.push(`/chat/${ticket.id}`)}
    >
      <div className="flex-shrink-0">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-sm">
            {ticket.customer.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm truncate">{ticket.customer.name}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-500 text-xs truncate">{ticket.customer.email}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm truncate">{ticket.subject}</span>
          {ticket.orderNumber && (
            <>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500 text-xs">Order #{ticket.orderNumber}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant={statusColors[ticket.status]}>
          {ticket.status}
        </Badge>
        <Badge variant={priorityColors[ticket.priority]}>
          {ticket.priority}
        </Badge>
      </div>

      <div className="text-xs text-gray-500 whitespace-nowrap">
        {format(ticket.lastUpdate, 'MMM d, h:mm a')}
      </div>
    </div>
  )
}