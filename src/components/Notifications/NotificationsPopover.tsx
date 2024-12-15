import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { NotificationItem } from './NotificationItem';

export const NotificationsPopover: React.FC = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="w-5 h-5" /> 
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            3
          </span>
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="w-[320px] bg-white rounded-lg shadow-lg border border-gray-200 focus:outline-none"
          align="end"
          sideOffset={5}
        >
          <div className="p-2 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">Notifications</h2>
              <p className="text-xs text-gray-500">3 unread messages</p>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Cog6ToothIcon className="w-4 h-4" />
            </Button>
          </div>

          <Separator className="mb-1" />

          <ScrollArea className="h-[320px]">
            <div className="p-1">
              <NotificationItem
                type="message"
                title="New message from Sarah"
                description="I need help with my order #2345"
                time="5m ago"
                unread
              />
              <NotificationItem
                type="order"
                title="Order status updated"
                description="Order #1234 has been shipped"
                time="2h ago"
                unread
              />
              <NotificationItem
                type="alert"
                title="System update"
                description="New features are available"
                time="1d ago"
                unread
              />
              <NotificationItem
                type="message"
                title="New message from Tom"
                description="Thanks for your help!"
                time="2d ago"
              />
            </div>
          </ScrollArea>

          <Separator className="mt-1" />

          <div className="p-1">
            <Button variant="ghost" size="sm" className="w-full justify-center text-sm h-8">
              Mark all as read
            </Button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};