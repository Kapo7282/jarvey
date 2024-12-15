'use client'

import { useState } from 'react'
import {
  HomeIcon,
  PlusIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import { SidebarItem } from './SidebarItem'
import { usePathname } from 'next/navigation'
import { NotificationsPopover } from '../Notifications/NotificationsPopover'
import { SearchModal } from '../Search/SearchModal'
import { StoreSelector } from './StoreSelector'
import { ScrollArea } from '../ui/scroll-area'
import { ViewsManager } from './ViewsManager'
import { ViewsList } from './ViewsList'
import type { View } from './types'

export function Sidebar({ onClose }: { onClose: () => void }) {
  const [views, setViews] = useState<View[]>([
    { id: 'all', name: 'All', emoji: '🔄', count: 47 },
    { id: 'resolved', name: 'Resolved', emoji: '✅', count: 12 },
    { id: 'waiting', name: 'Wait', emoji: '⏳', count: 0 },
    { id: 'closed', name: 'Close', emoji: '❌', count: 12 },
    { id: 'handover', name: 'Handover', emoji: '➡️', count: 23 },
    { id: 'processing', name: 'Processing', emoji: '🔄', count: 0 },
    { id: 'snoozed', name: 'Snooze', emoji: '😴', count: 0 },
    { id: 'ignored', name: 'Ignore', emoji: '🚫', count: 0 },
  ])

  const handleAddView = (name: string, emoji: string) => {
    const newView: View = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      emoji,
      count: 0,
      isFavorite: false
    }
    setViews([...views, newView])
  }

  const handleToggleFavorite = (id: string) => {
    setViews(views.map(view => 
      view.id === id ? { ...view, isFavorite: !view.isFavorite } : view
    ))
  }

  const handleViewsReorder = (newViews: View[]) => {
    setViews(newViews)
  }

  return (
    <div className="h-screen flex flex-col bg-white border-r">
      <div className="flex-shrink-0 p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
          <div>
            <h1 className="font-semibold">Jarvey AI</h1>
            <p className="text-xs text-gray-500">AI CS</p>
          </div>
          <div className="px-4 py-2">
            <NotificationsPopover />
          </div>
        </div>

        <StoreSelector />
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-6 p-2">
          <div className="space-y-1">
            <SearchModal />
            <SidebarItem icon={<PlusIcon className="w-5 h-5" />} label="Create Ticket" to="/create-ticket" />
            <SidebarItem icon={<PhoneIcon className="w-5 h-5" />} label="Place Call" to="/place-call" />
          </div>

          <div>
            <ViewsManager onAddView={handleAddView} />
            <ViewsList
              views={views}
              onViewsReorder={handleViewsReorder}
              onFavorite={handleToggleFavorite}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}