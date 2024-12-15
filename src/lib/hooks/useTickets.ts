'use client'

import { useState, useMemo } from 'react'
import { usePathname } from 'next/navigation'

// Mock data - replace with real API call
const mockTickets = [
  {
    id: '1',
    customer: {
      name: 'Marco D',
      email: 'marcodicaprio1111@gmail.com'
    },
    subject: 'Change my shipping address',
    status: 'open' as const,
    priority: 'high' as const,
    lastUpdate: new Date(),
    orderNumber: '2631'
  },
  // ... other tickets
]

export function useTickets() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const currentPath = pathname.split('/').pop()

  const filteredTickets = useMemo(() => {
    if (['wait', 'processing', 'snoozed', 'ignored'].includes(currentPath || '')) {
      return []
    }

    let tickets = [...mockTickets]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      tickets = tickets.filter(ticket => 
        ticket.customer.name.toLowerCase().includes(query) ||
        ticket.customer.email.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query) ||
        ticket.orderNumber?.toLowerCase().includes(query)
      )
    }

    tickets.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return a.lastUpdate.getTime() - b.lastUpdate.getTime()
        case 'waiting':
          return b.lastUpdate.getTime() - a.lastUpdate.getTime()
        case 'priority':
          return b.priority === 'high' ? 1 : -1
        case 'updated':
        case 'newest':
        default:
          return b.lastUpdate.getTime() - a.lastUpdate.getTime()
      }
    })

    return tickets
  }, [searchQuery, sortBy, currentPath])

  const handleSortChange = (newSort: string) => {
    setIsLoading(true)
    setSortBy(newSort)
    setTimeout(() => setIsLoading(false), 500)
  }

  return {
    tickets: filteredTickets,
    isLoading,
    searchQuery,
    sortBy,
    setSearchQuery,
    handleSortChange
  }
}