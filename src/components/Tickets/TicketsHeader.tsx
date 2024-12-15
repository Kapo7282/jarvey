import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { SearchModal } from '../Search/SearchModal';
import { TicketFilters } from './TicketFilters';
import { TicketSort } from './TicketSort';

interface TicketsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const TicketsHeader: React.FC<TicketsHeaderProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="border-b bg-white p-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Button
            variant="ghost"
            className="w-full cursor-text justify-start pl-10 h-10 text-gray-500 hover:text-gray-700"
            onClick={() => setIsSearchOpen(true)}
          >
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            Search tickets...
          </Button>
          <SearchModal 
            isOpen={isSearchOpen} 
            onClose={() => setIsSearchOpen(false)}
            onSearch={onSearchChange}
            showTab={false}
          />
        </div>
        <TicketSort value={sortBy} onChange={onSortChange} />
        <TicketFilters />
      </div>
    </div>
  );
};