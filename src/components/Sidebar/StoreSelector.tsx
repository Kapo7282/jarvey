'use client'

import { useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'

interface Store {
  id: string
  name: string
  domain: string
}

const SAMPLE_STORES: Store[] = [
  { id: '1', name: 'Fashion Store', domain: 'fashion-store.myshopify.com' },
  { id: '2', name: 'Electronics Hub', domain: 'electronics-hub.myshopify.com' },
  { id: '3', name: 'Home Decor', domain: 'home-decor.myshopify.com' },
]

export function StoreSelector() {
  const [selectedStore, setSelectedStore] = useState<Store | 'all'>('all')
  const router = useRouter()

  const handleAddStore = () => {
    router.push('/connect-store')
  }

  return (
    <div className="relative">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between mb-4 h-auto py-2"
          >
            <div className="flex items-center gap-2">
              {selectedStore === 'all' ? (
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-600">ALL</span>
                </div>
              ) : (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {selectedStore.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="text-left">
                <div className="font-medium">
                  {selectedStore === 'all' ? 'All Stores' : selectedStore.name}
                </div>
                <div className="text-xs text-gray-500">
                  {selectedStore === 'all' 
                    ? `${SAMPLE_STORES.length} stores` 
                    : selectedStore.domain}
                </div>
              </div>
            </div>
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content 
            className="min-w-[240px] bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            align="start"
            sideOffset={4}
          >
            <DropdownMenu.RadioGroup value={selectedStore === 'all' ? 'all' : selectedStore.id}>
              <DropdownMenu.RadioItem
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer outline-none"
                value="all"
                onSelect={() => setSelectedStore('all')}
              >
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-600">ALL</span>
                </div>
                <div>
                  <div className="font-medium">All Stores</div>
                  <div className="text-xs text-gray-500">{SAMPLE_STORES.length} stores</div>
                </div>
              </DropdownMenu.RadioItem>

              <Separator className="my-2" />

              {SAMPLE_STORES.map((store) => (
                <DropdownMenu.RadioItem
                  key={store.id}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer outline-none"
                  value={store.id}
                  onSelect={() => setSelectedStore(store)}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      {store.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{store.name}</div>
                    <div className="text-xs text-gray-500">{store.domain}</div>
                  </div>
                </DropdownMenu.RadioItem>
              ))}

              <Separator className="my-2" />

              <DropdownMenu.Item
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer outline-none text-purple-600"
                onSelect={handleAddStore}
              >
                <PlusIcon className="w-5 h-5" />
                <span className="font-medium">Add Store</span>
              </DropdownMenu.Item>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}