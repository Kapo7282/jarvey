import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface UserAssignmentProps {
  currentUser?: User;
  onAssign: (user: User | null) => void;
}

const SAMPLE_USERS: User[] = [
  { id: '1', name: 'Rankey' },
  { id: '2', name: 'Sarah Smith' },
  { id: '3', name: 'John Doe' },
];

export const UserAssignment: React.FC<UserAssignmentProps> = ({
  currentUser,
  onAssign,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = SAMPLE_USERS.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {currentUser ? (
          <Button
            variant="ghost"
            className="flex items-center gap-2 px-3 py-1 h-8 bg-red-100 text-red-800 hover:bg-red-200"
          >
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-red-200 text-red-800">
                {currentUser.name[0]}
              </AvatarFallback>
            </Avatar>
            <span>{currentUser.name}</span>
            <XMarkIcon className="w-4 h-4 ml-1" onClick={(e) => {
              e.stopPropagation();
              onAssign(null);
            }} />
          </Button>
        ) : (
          <Button variant="ghost" size="sm">
            Assign To
          </Button>
        )}
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="w-[300px] bg-white rounded-lg shadow-lg border border-gray-200 p-3"
          align="start"
          sideOffset={5}
        >
          <h3 className="text-sm font-medium mb-2">ASSIGN TO:</h3>
          
          <div className="relative mb-2">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users or teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-blue-600 mb-2">USERS</h4>
            <ScrollArea className="h-[200px]">
              {filteredUsers.length > 0 ? (
                <div className="space-y-1">
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50"
                      onClick={() => onAssign(user)}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{user.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 text-center py-4">
                  Could not find any user
                </div>
              )}
            </ScrollArea>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};