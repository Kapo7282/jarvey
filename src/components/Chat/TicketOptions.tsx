import React, { useState } from 'react';
import { Button } from '../ui/button';
import { XMarkIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Badge } from '../ui/badge';
import { TagsDropdown } from './TagsDropdown';
import { ContactReasonDropdown } from './ContactReasonDropdown';
import { ResolutionDropdown } from './ResolutionDropdown';
import { UserAssignment } from './UserAssignment';
import * as HoverCard from '@radix-ui/react-hover-card';

interface TicketOptionsProps {
  onClose?: () => void;
  onAddTags?: (tag: string) => void;
  onRemoveTag?: (tag: string) => void;
  tags?: string[];
}

const MAX_VISIBLE_TAGS = 3;

export const TicketOptions: React.FC<TicketOptionsProps> = ({
  onClose,
  onAddTags,
  onRemoveTag,
  tags = []
}) => {
  const [showAllTags, setShowAllTags] = useState(false);
  const [contactReason, setContactReason] = useState('');
  const [resolution, setResolution] = useState('');
  const [assignedUser, setAssignedUser] = useState({ id: '1', name: 'Rankey' });
  const visibleTags = showAllTags ? tags : tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenTagsCount = tags.length - MAX_VISIBLE_TAGS;

  const TagsList = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-wrap items-center gap-1">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="flex items-center gap-1 text-[10px]"
        >
          {tag}
          <button
            onClick={() => onRemoveTag?.(tag)}
            className="ml-1 hover:text-gray-700"
          >
            <XMarkIcon className="w-3 h-3" />
          </button>
        </Badge>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 px-3 py-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="h-7 text-xs" onClick={onClose}>
            Close Ticket
          </Button>
          
          <TagsDropdown onAddTag={onAddTags} />

          <div className="flex items-center gap-1">
            <TagsList tags={visibleTags} />
            
            {!showAllTags && hiddenTagsCount > 0 && (
              <HoverCard.Root openDelay={200} closeDelay={100}>
                <HoverCard.Trigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 px-1.5 text-xs"
                    onClick={() => setShowAllTags(true)}
                  >
                    +{hiddenTagsCount}
                  </Button>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                  <HoverCard.Content
                    className="w-auto bg-gray-900 text-white rounded-lg p-3 shadow-lg"
                    sideOffset={5}
                  >
                    <div className="space-y-1">
                      {tags.slice(MAX_VISIBLE_TAGS).map((tag) => (
                        <div key={tag} className="text-sm whitespace-nowrap">
                          {tag}
                        </div>
                      ))}
                    </div>
                    <HoverCard.Arrow className="fill-gray-900" />
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            )}

            {showAllTags && tags.length > MAX_VISIBLE_TAGS && (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 px-1.5 text-xs text-blue-600 hover:text-blue-700"
                onClick={() => setShowAllTags(false)}
              >
                Show Less
                <ChevronUpIcon className="w-3 h-3 ml-1" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <UserAssignment
            currentUser={assignedUser}
            onAssign={setAssignedUser}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-700">Contact reason:</span>
          <ContactReasonDropdown
            value={contactReason}
            onChange={setContactReason}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-700">Product:</span>
          <Button variant="ghost" size="sm" className="text-xs text-gray-500 h-6">
            + Add
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-700">Resolution:</span>
          <ResolutionDropdown
            value={resolution}
            onChange={setResolution}
          />
        </div>
      </div>
    </div>
  );
};