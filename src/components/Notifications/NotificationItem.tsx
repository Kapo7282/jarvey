import React from 'react';
import { clsx } from 'clsx';
import { 
  ChatBubbleLeftIcon, 
  ShoppingBagIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

interface NotificationItemProps {
  type: 'message' | 'order' | 'alert';
  title: string;
  description: string;
  time: string;
  unread?: boolean;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  type,
  title,
  description,
  time,
  unread = false,
}) => {
  const icons = {
    message: ChatBubbleLeftIcon,
    order: ShoppingBagIcon,
    alert: ExclamationTriangleIcon,
  };

  const colors = {
    message: 'bg-blue-100 text-blue-600',
    order: 'bg-purple-100 text-purple-600',
    alert: 'bg-yellow-100 text-yellow-600',
  };

  const Icon = icons[type];

  return (
    <div className={clsx(
      'flex gap-2 p-2 rounded-md transition-colors cursor-pointer animate__animated animate__fadeInDown animate__faster',
      unread ? 'bg-gray-50' : 'hover:bg-gray-50'
    )}>
      <div className={clsx(
        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
        colors[type]
      )}>
        <Icon className="w-4 h-4" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className={clsx(
            'text-sm truncate',
            unread && 'font-medium text-gray-900'
          )}>
            {title}
          </p>
          <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
            {time}
          </span>
        </div>
        <p className="text-xs text-gray-600 truncate">
          {description}
        </p>
      </div>

      {unread && (
        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-2 animate__animated animate__pulse animate__infinite" />
      )}
    </div>
  );
};