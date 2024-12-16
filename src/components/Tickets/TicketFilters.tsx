import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { FunnelIcon, XMarkIcon, PlusIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { SavePresetDialog } from './SavePresetDialog';

interface Filter {
  field: string;
  operator: string;
  value: string | string[];
}

interface FilterPreset {
  id: string;
  name: string;
  emoji: string;
  filters: Filter[];
}

const OPERATORS = {
  is: 'equals',
  isNot: 'does not equal',
  contains: 'contains',
  doesNotContain: 'does not contain',
  greaterThan: 'is greater than',
  lessThan: 'is less than',
  startsWith: 'starts with',
  endsWith: 'ends with',
};

const FIELDS = [
  { id: 'assigneeUser', label: 'Assignee user', type: 'user', description: 'The user assigned to handle the ticket' },
  { id: 'assigneeTeam', label: 'Assignee team', type: 'team', description: 'The team assigned to handle the ticket' },
  { id: 'channel', label: 'Channel', type: 'select', description: 'The communication channel used (email, chat, etc.)' },
  { id: 'closed', label: 'Closed', type: 'boolean', description: 'Whether the ticket is closed or not' },
  { id: 'created', label: 'Created', type: 'date', description: 'When the ticket was created' },
  { id: 'customer', label: 'Customer', type: 'text', description: 'Customer name or email' },
  { id: 'integration', label: 'Integration', type: 'select', description: 'The integrated service (Shopify, etc.)' },
  { id: 'language', label: 'Language', type: 'select', description: 'The language of communication' },
  { id: 'lastMessage', label: 'Last message', type: 'text', description: 'Content of the most recent message' },
  { id: 'lastReceivedMessage', label: 'Last received message', type: 'text', description: 'Content of the last customer message' },
  { id: 'snooze', label: 'Snooze', type: 'boolean', description: 'Whether the ticket is snoozed' },
  { id: 'status', label: 'Status', type: 'select', description: 'Current ticket status' },
  { id: 'tags', label: 'Tags', type: 'tags', description: 'Labels assigned to the ticket' },
  { id: 'updated', label: 'Updated', type: 'date', description: 'When the ticket was last updated' },
];

export const TicketFilters: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [isPresetDialogOpen, setIsPresetDialogOpen] = useState(false);

  const handleAddFilter = (field: string) => {
    const newFilter = {
      field,
      operator: 'is',
      value: '',
    };
    setActiveFilters([...activeFilters, newFilter]);
    setSelectedField(null);
  };

  const handleRemoveFilter = (index: number) => {
    setActiveFilters(activeFilters.filter((_, i) => i !== index));
  };

  const handleSavePreset = (name: string, emoji: string) => {
    const preset: FilterPreset = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      emoji,
      filters: activeFilters,
    };
    
    // Save preset to localStorage
    const existingPresets = JSON.parse(localStorage.getItem('filterPresets') || '[]');
    localStorage.setItem('filterPresets', JSON.stringify([...existingPresets, preset]));
  };

  const handleExportTickets = () => {
    // Create CSV content
    const headers = ['ID', 'Customer', 'Subject', 'Status', 'Priority', 'Last Update'];
    const mockData = [
      ['1', 'John Doe', 'Support Request', 'Open', 'High', '2024-01-20'],
      ['2', 'Jane Smith', 'Refund Request', 'Closed', 'Medium', '2024-01-19'],
    ];

    const csvContent = [
      headers.join(','),
      ...mockData.map(row => row.join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tickets-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getFieldLabel = (fieldId: string) => {
    const field = FIELDS.find(f => f.id === fieldId);
    return field?.label || fieldId;
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Button variant="ghost" size="icon">
          <FunnelIcon className="w-5 h-5" />
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="w-[600px] bg-white rounded-lg shadow-lg border border-gray-200 p-4"
          align="start"
          sideOffset={5}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Advanced Filters</h3>
            <div className="flex items-center gap-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setIsPresetDialogOpen(true)}
              >
                Save as Preset
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleExportTickets}
              >
                <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                Export Tickets
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveFilters([])}
              >
                Clear All
              </Button>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {activeFilters.map((filter, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2">
                  {index > 0 && (
                    <div className="text-sm font-medium text-gray-500">AND</div>
                  )}
                  <div className="flex-1 flex items-center gap-2">
                    <div className="text-sm font-medium min-w-[120px]">
                      {getFieldLabel(filter.field)}
                    </div>
                    <select
                      className="px-3 py-1.5 border rounded-md text-sm"
                      value={filter.operator}
                      onChange={(e) => {
                        const newFilters = [...activeFilters];
                        newFilters[index].operator = e.target.value;
                        setActiveFilters(newFilters);
                      }}
                    >
                      {Object.entries(OPERATORS).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      className="flex-1 px-3 py-1.5 border rounded-md text-sm"
                      value={filter.value}
                      onChange={(e) => {
                        const newFilters = [...activeFilters];
                        newFilters[index].value = e.target.value;
                        setActiveFilters(newFilters);
                      }}
                      placeholder="Enter value..."
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleRemoveFilter(index)}
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => setSelectedField('')}
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add filter
            </Button>

            {selectedField !== null && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-lg p-2">
                <ScrollArea className="h-[200px]">
                  {FIELDS.map((field) => (
                    <button
                      key={field.id}
                      className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-50"
                      onClick={() => handleAddFilter(field.id)}
                    >
                      <div className="font-medium">{field.label}</div>
                      <div className="text-xs text-gray-500">{field.description}</div>
                    </button>
                  ))}
                </ScrollArea>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </Popover.Content>
      </Popover.Portal>

      <SavePresetDialog
        isOpen={isPresetDialogOpen}
        onClose={() => setIsPresetDialogOpen(false)}
        onSave={handleSavePreset}
      />
    </Popover.Root>
  );
};