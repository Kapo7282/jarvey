import React, { useState } from 'react';
import { MessageComposer } from '../components/Chat/MessageComposer';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { ScrollArea } from '../components/ui/scroll-area';
import { Button } from '../components/ui/button';
import { MagnifyingGlassIcon, UsersIcon } from '@heroicons/react/24/outline';

interface Message {
  id: string;
  content: string;
  sender: {
    name: string;
    avatar?: string;
  };
  timestamp: Date;
}

interface Channel {
  id: string;
  name: string;
  unreadCount?: number;
  isActive?: boolean;
}

export const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hey team, just wanted to let you know I\'ll be handling the VIP customers today.',
      sender: { name: 'Sarah Johnson' },
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      content: 'Got it! I\'ll focus on the technical support tickets then.',
      sender: { name: 'Mike Chen' },
      timestamp: new Date(Date.now() - 1800000)
    }
  ]);

  const channels: Channel[] = [
    { id: '1', name: '# General', isActive: true },
    { id: '2', name: '# Support', unreadCount: 3 },
    { id: '3', name: '# Sales' },
    { id: '4', name: '# Random' }
  ];

  const handleSendMessage = (content: string, attachments: File[]) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      sender: { name: 'You' },
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex-1 flex h-full bg-gray-50">
      {/* Channels Sidebar */}
      <div className="w-60 bg-white border-r flex flex-col">
        <div className="p-3 border-b">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium text-sm">Channels</h2>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <UsersIcon className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search channels..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-0.5">
            {channels.map((channel) => (
              <button
                key={channel.id}
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-sm hover:bg-gray-50 ${
                  channel.isActive ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                }`}
              >
                <span>{channel.name}</span>
                {channel.unreadCount && (
                  <span className="px-1.5 py-0.5 text-xs bg-purple-100 text-purple-600 rounded-full">
                    {channel.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-3 bg-white border-b">
          <h2 className="font-medium">General</h2>
          <p className="text-xs text-gray-500">Team-wide announcements and discussions</p>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3 animate__animated animate__fadeIn animate__faster">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback>
                    {message.sender.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-medium text-sm">{message.sender.name}</span>
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 bg-white border-t">
          <MessageComposer onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};