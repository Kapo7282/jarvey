import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { MagnifyingGlassIcon, XMarkIcon, CheckIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

interface ResolutionDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const RESOLUTIONS = [
  {
    category: 'Subscription',
    items: ['New Subscription', 'Cancel Subscription', 'Modify Subscription']
  },
  {
    category: 'Order',
    items: ['Order Status', 'Order Modification', 'Order Cancellation']
  },
  {
    category: 'No action',
    items: ['No Action Required', 'Information Only']
  },
  {
    category: 'Refund',
    items: ['Full Refund', 'Partial Refund', 'Refund Denied']
  },
  {
    category: 'Discount',
    items: ['Coupon Applied', 'Store Credit', 'Price Adjustment']
  },
  {
    category: 'Replacement',
    items: ['Replacement Sent', 'Exchange Processed']
  },
  {
    category: 'Account',
    items: ['Updated Account Information', 'Password Reset', 'Account Merged']
  },
  {
    category: 'Information',
    items: ['Information Given', 'Documentation Sent']
  },
  {
    category: 'Other',
    items: ['Other Resolution']
  }
];

export const ResolutionDropdown: React.FC<ResolutionDropdownProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const filteredResolutions = RESOLUTIONS.map(category => ({
    category: category.category,
    items: category.items.filter(item =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.items.length > 0);

  const handleSelect = (resolution: string) => {
    onChange(resolution);
    setIsOpen(false);
    setExpandedCategory(null);
  };

  const handleClear = () => {
    onChange('');
    setIsOpen(false);
    setExpandedCategory(null);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500 hover:text-gray-700"
        >
          {value || '+ Add'}
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
            <div className="space-y-1">
              {filteredResolutions.map((category) => (
                <div key={category.category}>
                  {!searchQuery ? (
                    <button
                      className="w-full flex items-center justify-between px-2 py-1.5 text-sm rounded hover:bg-gray-50"
                      onClick={() => setExpandedCategory(
                        expandedCategory === category.category ? null : category.category
                      )}
                    >
                      {category.category}
                      <ChevronRightIcon 
                        className={`w-4 h-4 transition-transform ${
                          expandedCategory === category.category ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                  ) : null}
                  
                  {(searchQuery || expandedCategory === category.category) && (
                    <div className="pl-2 space-y-1">
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
                  )}
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