import React from 'react';
import { TicketIcon } from '@heroicons/react/24/outline';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface SearchResultsProps {
  query: string;
  type: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query, type }) => {
  // Mock results - replace with actual search logic
  const results = [
    {
      type: 'ticket',
      title: 'Change shipping address request',
      customer: 'Marco D',
      time: '2 hours ago',
      status: 'Open',
    },
    {
      type: 'customer',
      name: 'Marco Dicaprio',
      email: 'marcodicaprio1111@gmail.com',
      orders: 5,
    },
  ].filter(result => {
    if (type === 'all') return true;
    if (type === 'tickets') return result.type === 'ticket';
    if (type === 'customers') return result.type === 'customer';
    return false;
  });

  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No results found for "{query}"
      </div>
    );
  }

  return (
    <div className="py-2">
      {results.map((result, index) => (
        <button
          key={index}
          className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50"
        >
          {result.type === 'ticket' ? (
            <>
              <TicketIcon className="w-5 h-5 text-gray-400" />
              <div className="flex-1 text-left">
                <div className="font-medium">{result.title}</div>
                <div className="text-sm text-gray-500">
                  {result.customer} • {result.time} • {result.status}
                </div>
              </div>
            </>
          ) : (
            <>
              <Avatar>
                <AvatarFallback>
                  {result.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <div className="font-medium">{result.name}</div>
                <div className="text-sm text-gray-500">
                  {result.email} • {result.orders} orders
                </div>
              </div>
            </>
          )}
        </button>
      ))}
    </div>
  );
};