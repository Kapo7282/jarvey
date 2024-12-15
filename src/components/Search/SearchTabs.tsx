import React from 'react';
import { clsx } from 'clsx';

interface SearchTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SearchTabs: React.FC<SearchTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'tickets', label: 'Tickets' },
    { id: 'customers', label: 'Customers' },
  ];

  return (
    <div className="border-b">
      <div className="px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={clsx(
              'px-4 py-2 text-sm font-medium border-b-2 -mb-px',
              activeTab === tab.id
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};