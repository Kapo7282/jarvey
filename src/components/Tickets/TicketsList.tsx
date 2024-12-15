import React, { useState, useEffect } from 'react';
import { TicketRow } from './TicketRow';
import { TicketSkeleton } from './TicketSkeleton';
import { ScrollArea } from '../ui/scroll-area';
import { EmptyTickets } from '../EmptyState/EmptyTickets';
import { clsx } from 'clsx';

interface TicketsListProps {
  tickets: Array<{
    id: string;
    customer: {
      name: string;
      email: string;
    };
    subject: string;
    status: 'open' | 'resolved' | 'waiting' | 'closed';
    priority: 'low' | 'medium' | 'high';
    lastUpdate: Date;
    orderNumber?: string;
  }>;
  isLoading?: boolean;
}

export const TicketsList: React.FC<TicketsListProps> = ({ tickets, isLoading }) => {
  const [isShuffling, setIsShuffling] = useState(false);
  const [prevTickets, setPrevTickets] = useState(tickets);

  useEffect(() => {
    // If tickets array changes (e.g., due to sorting)
    if (JSON.stringify(tickets) !== JSON.stringify(prevTickets)) {
      setIsShuffling(true);
      setPrevTickets(tickets);

      // Simulate API delay
      const timer = setTimeout(() => {
        setIsShuffling(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [tickets]);

  if (tickets.length === 0) {
    return <EmptyTickets />;
  }

  return (
    <ScrollArea className="flex-1">
      <div className={clsx(
        "divide-y transition-all duration-300",
        isShuffling && "opacity-50 scale-[0.98]"
      )}>
        {isLoading || isShuffling ? (
          // Show skeletons while loading or shuffling
          Array.from({ length: 5 }).map((_, index) => (
            <TicketSkeleton key={index} index={index} />
          ))
        ) : (
          tickets.map((ticket) => (
            <TicketRow 
              key={ticket.id} 
              ticket={ticket}
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
};