import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { MagnifyingGlassIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

interface ContactReasonDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const CONTACT_REASONS = [
  { category: 'Pre-sale', items: ['Product Info', 'Availability', 'Pricing'] },
  { category: 'Order', items: ['Status', 'Modification', 'Cancellation'] },
  { category: 'Shipping', items: ['Tracking', 'Delays', 'Address Change'] },
  { category: 'Feedback', items: ['Product Review', 'Service Review'] },
  { category: 'Subscription', items: ['New', 'Cancel', 'Modify'] },
  { category: 'Other', items: ['Spam', 'Warranty', 'Exchange', 'Return'] },
];

export const ContactReasonDropdown: React.FC<ContactReasonDropdownProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReasons = CONTACT_REASONS.map(category => ({
    category: category.category,
    items: category.items.filter(item =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.items.length > 0);

  const handleSelect = (reason: string) => {
    onChange(reason);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange('');
    setIsOpen(false);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500 hover:text-gray-700"
        >
          {value || 'Select reason'}
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="w-[300px] bg-white rounded-lg shadow-lg border border-gray-200 p-2"
          align="start"
          sideOffset={5}
        >
          <div className="relative mb-2">
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {filteredReasons.map((category) => (
                <div key={category.category}>
                  {!searchQuery && (
                    <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase">
                      {category.category}
                    </div>
                  )}
                  <div className="space-y-1">
                    {category.items.map((item) => (
                      <button
                        key={item}
                        className="w-full flex items-center justify-between px-2 py-1.5 text-sm rounded hover:bg-gray-50"
                        onClick={() => handleSelect(item)}
                      >
                        {item}
                        {value === item && (
                          <CheckIcon className="w-4 h-4 text-purple-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {value && (
            <div className="mt-2 pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center text-blue-600"
                onClick={handleClear}
              >
                Clear Selection
              </Button>
            </div>
          )}

          <Popover.Close className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
            <XMarkIcon className="w-4 h-4" />
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};