'use client'

import { useTickets } from '@/lib/hooks/useTickets'
import { TicketsHeader } from '../Tickets/TicketsHeader'
import { TicketsList } from '../Tickets/TicketsList'

export function Tickets() {
  const {
    tickets,
    isLoading,
    searchQuery,
    sortBy,
    setSearchQuery,
    handleSortChange
  } = useTickets()

  return (
    <div className="flex-1 flex flex-col bg-white">
      <TicketsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
      <TicketsList 
        tickets={tickets} 
        isLoading={isLoading}
      />
    </div>
  )
}