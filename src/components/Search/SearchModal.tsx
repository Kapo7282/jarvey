import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { SearchTabs } from './SearchTabs';
import { RecentSearches } from './RecentSearches';
import { SearchResults } from './SearchResults';

interface SearchModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSearch?: (query: string) => void;
  showTab?: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen: controlledIsOpen, 
  onClose,
  onSearch,
  showTab = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const effectiveIsOpen = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;

  const handleOpenChange = (open: boolean) => {
    if (controlledIsOpen === undefined) {
      setIsOpen(open);
    }
    if (!open && onClose) {
      onClose();
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <Dialog.Root open={effectiveIsOpen} onOpenChange={handleOpenChange}>
      {!controlledIsOpen && showTab && (
        <Dialog.Trigger asChild>
          <div className="px-4 py-2">
            <Button variant="ghost" className="w-full">
              <MagnifyingGlassIcon className="w-5 h-5 mr-3" />
              Search
            </Button>
          </div>
        </Dialog.Trigger>
      )}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-lg shadow-xl z-50">
          <Dialog.Title className="sr-only">Search</Dialog.Title>
          <div className="p-4">
            <div className="relative mb-4">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-lg border-0 focus:outline-none focus:ring-0"
                value={searchQuery}
                onChange={handleSearch}
                autoFocus
              />
              <Dialog.Close className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <XMarkIcon className="w-5 h-5" />
              </Dialog.Close>
            </div>

            <SearchTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {searchQuery ? (
              <SearchResults query={searchQuery} type={activeTab} />
            ) : (
              <RecentSearches />
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};