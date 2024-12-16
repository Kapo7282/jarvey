import React, { useState, useMemo } from 'react';
import { TicketsHeader } from '../components/Tickets/TicketsHeader';
import { TicketsList } from '../components/Tickets/TicketsList';
import { useLocation } from 'react-router-dom';

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
  {
    id: '2',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com'
    },
    subject: 'Refund request',
    status: 'waiting' as const,
    priority: 'medium' as const,
    lastUpdate: new Date(Date.now() - 3600000),
    orderNumber: '2632'
  },
  {
    id: '3',
    customer: {
      name: 'Tom Wilson',
      email: 'tom.w@example.com'
    },
    subject: 'Product damaged during shipping',
    status: 'resolved' as const,
    priority: 'high' as const,
    lastUpdate: new Date(Date.now() - 7200000),
    orderNumber: '2633'
  }
];

export const Tickets: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const currentPath = location.pathname.split('/').pop();

  const filteredTickets = useMemo(() => {
    // Always return empty array for these specific paths
    if (['wait', 'processing', 'snoozed', 'ignored'].includes(currentPath || '')) {
      return [];
    }

    let tickets = [...mockTickets];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      tickets = tickets.filter(ticket => 
        ticket.customer.name.toLowerCase().includes(query) ||
        ticket.customer.email.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query) ||
        ticket.orderNumber?.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    tickets.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return a.lastUpdate.getTime() - b.lastUpdate.getTime();
        case 'waiting':
          return b.lastUpdate.getTime() - a.lastUpdate.getTime();
        case 'priority':
          return b.priority === 'high' ? 1 : -1;
        case 'updated':
        case 'newest':
        default:
          return b.lastUpdate.getTime() - a.lastUpdate.getTime();
      }
    });

    return tickets;
  }, [searchQuery, sortBy, currentPath]);

  const handleSortChange = (newSort: string) => {
    setIsLoading(true);
    setSortBy(newSort);
    
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <TicketsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
      <TicketsList 
        tickets={filteredTickets} 
        isLoading={isLoading}
      />
    </div>
  );
};