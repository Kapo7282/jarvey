'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { Tag } from '@/lib/types/tags'
import { TagList } from './Tags/TagList'
import { TagSelector } from './Tags/TagSelector'

interface ChatHeaderProps {
  title: string
  orderNumber: string
  initialTags?: Tag[]
}

export function ChatHeader({ 
  title, 
  orderNumber,
  initialTags = []
}: ChatHeaderProps) {
  const router = useRouter()
  const [tags, setTags] = useState<Tag[]>(initialTags)

  const handleAddTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  const handleRemoveTag = (tagId: string) => {
    setTags(prev => prev.filter(tag => tag.id !== tagId))
  }

  return (
    <div className="border-b bg-white">
      <div className="p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
            onClick={() => router.push('/tickets/all')}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">MD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-sm font-medium leading-none mb-1">
                {title} • {orderNumber}
              </h2>
              <TagList 
                tags={tags}
                onRemoveTag={handleRemoveTag}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="px-3 py-1.5 bg-gray-50 flex items-center gap-2">
        <TagSelector
          selectedTags={tags}
          onSelectTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />
      </div>
    </div>
  )
}