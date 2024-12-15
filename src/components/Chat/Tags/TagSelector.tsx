'use client'

import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TagBadge } from './TagBadge'
import { Tag, TagGroup } from '@/lib/types/tags'
import { TAG_GROUPS } from '@/lib/data/tags'

interface TagSelectorProps {
  selectedTags: Tag[]
  onSelectTag: (tag: Tag) => void
  onRemoveTag: (tagId: string) => void
}

export function TagSelector({ 
  selectedTags,
  onSelectTag,
  onRemoveTag 
}: TagSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredGroups = TAG_GROUPS.map(group => ({
    ...group,
    tags: group.tags.filter(tag => 
      tag.text.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedTags.find(t => t.id === tag.id)
    )
  })).filter(group => group.tags.length > 0)

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-7 text-xs gap-1"
        >
          <PlusIcon className="w-3.5 h-3.5" />
          Add Tags
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
              placeholder="Search tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {filteredGroups.map((group) => (
                <div key={group.category}>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">
                    {group.category}
                  </h3>
                  <div className="space-y-1">
                    {group.tags.map((tag) => (
                      <button
                        key={tag.id}
                        className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-gray-50"
                        onClick={() => {
                          onSelectTag(tag)
                          setIsOpen(false)
                        }}
                      >
                        <TagBadge tag={tag} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {filteredGroups.length === 0 && (
                <div className="text-sm text-gray-500 text-center py-4">
                  No tags found
                </div>
              )}
            </div>
          </ScrollArea>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}