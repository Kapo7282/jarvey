'use client'

import { useState } from 'react'
import { Tag } from '@/lib/types/tags'
import { TagBadge } from './TagBadge'
import { Button } from '@/components/ui/button'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import * as HoverCard from '@radix-ui/react-hover-card'

interface TagListProps {
  tags: Tag[]
  onRemoveTag: (tagId: string) => void
  maxVisible?: number
}

export function TagList({ 
  tags, 
  onRemoveTag,
  maxVisible = 3 
}: TagListProps) {
  const [showAll, setShowAll] = useState(false)
  
  const visibleTags = showAll ? tags : tags.slice(0, maxVisible)
  const hiddenCount = tags.length - maxVisible

  if (tags.length === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {visibleTags.map((tag) => (
        <TagBadge
          key={tag.id}
          tag={tag}
          onRemove={() => onRemoveTag(tag.id)}
        />
      ))}

      {!showAll && hiddenCount > 0 && (
        <HoverCard.Root>
          <HoverCard.Trigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 px-1.5 text-xs"
              onClick={() => setShowAll(true)}
            >
              +{hiddenCount}
            </Button>
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content
              className="w-auto bg-white rounded-lg p-2 shadow-lg border"
              sideOffset={5}
            >
              <div className="space-y-1">
                {tags.slice(maxVisible).map((tag) => (
                  <TagBadge
                    key={tag.id}
                    tag={tag}
                    className="block"
                  />
                ))}
              </div>
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      )}

      {showAll && tags.length > maxVisible && (
        <Button
          variant="ghost"
          size="sm"
          className="h-5 px-1.5 text-xs text-blue-600 hover:text-blue-700"
          onClick={() => setShowAll(false)}
        >
          Show Less
          <ChevronUpIcon className="w-3 h-3 ml-1" />
        </Button>
      )}
    </div>
  )
}