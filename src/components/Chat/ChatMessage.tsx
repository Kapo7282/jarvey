import React from 'react';
import { clsx } from 'clsx';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface ChatMessageProps {
  content: string;
  timestamp: string;
  sender: string;
  isAI?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ content, timestamp, sender, isAI }) => {
  return (
    <div className="mb-3 animate__animated animate__fadeInUp animate__faster">
      <div className="flex items-center gap-1.5 mb-1">
        <Avatar className="h-5 w-5">
          <AvatarFallback className="text-xs">
            {sender.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-gray-900">{sender}</span>
          <span className="text-[10px] text-gray-500">{timestamp}</span>
        </div>
      </div>
      <div className={clsx(
        "p-2.5 rounded-lg shadow-sm animate__animated animate__fadeIn animate__faster ml-6",
        isAI ? "bg-purple-600 text-white" : "bg-white border"
      )}>
        <p className="whitespace-pre-wrap text-xs leading-relaxed">{content}</p>
      </div>
    </div>
  );
};