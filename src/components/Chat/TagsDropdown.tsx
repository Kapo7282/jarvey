import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

interface TagsDropdownProps {
  onAddTag: (tag: string) => void;
}

const AVAILABLE_TAGS = [
  'VIP',
  'spam',
  'social-question',
  'social-lead',
  'shipped',
  'sentiments-urgent',
  'sentiments-threatening',
  'sentiments-promoter',
  'sentiments-positive'
];

export const TagsDropdown: React.FC<TagsDropdownProps> = ({ onAddTag }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTags = AVAILABLE_TAGS.filter(tag =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="ghost" size="sm">
          + Add Tags
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
              {filteredTags.map((tag) => (
                <button
                  key={tag}
                  className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-50"
                  onClick={() => onAddTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </ScrollArea>

          <Popover.Close className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
            <XMarkIcon className="w-4 h-4" />
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};