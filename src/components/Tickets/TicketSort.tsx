import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Button } from '../ui/button';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';

export type SortOption = {
  id: string;
  label: string;
  description: string;
};

interface TicketSortProps {
  value: string;
  onChange: (value: string) => void;
}

const SORT_OPTIONS: SortOption[] = [
  {
    id: 'newest',
    label: 'Newest',
    description: 'Latest conversations will be on top'
  },
  {
    id: 'oldest',
    label: 'Oldest',
    description: 'Oldest conversations will be on top'
  },
  {
    id: 'waiting',
    label: 'Waiting Longest',
    description: 'Conversations with longest wait time will come on top'
  },
  {
    id: 'updated',
    label: 'Last Updated',
    description: 'Latest conversations will be on top'
  },
  {
    id: 'priority',
    label: 'Priority First',
    description: 'Conversation with top priority will come on top'
  }
];

export const TicketSort: React.FC<TicketSortProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = SORT_OPTIONS.find(option => option.id === value);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-1"
        >
          {selectedOption?.label || 'Sort by'}
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="w-[300px] bg-white rounded-lg shadow-lg border border-gray-200 p-1"
          align="end"
          sideOffset={5}
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.id}
              className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-50"
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
            >
              <div className="flex-1 text-left">
                <div className="font-medium">{option.label}</div>
                <div className="text-xs text-gray-500">{option.description}</div>
              </div>
              {value === option.id && (
                <CheckIcon className="w-4 h-4 text-purple-600" />
              )}
            </button>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};