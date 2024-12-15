import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { Avatar, AvatarFallback } from '../ui/avatar';

export const RecentSearches: React.FC = () => {
  return (
    <div className="py-4">
      <div className="px-4 mb-2">
        <h3 className="text-sm font-medium text-gray-500">Recently accessed</h3>
      </div>

      <div className="space-y-1">
        <button className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50">
          <EnvelopeIcon className="w-5 h-5 text-gray-400" />
          <div className="flex-1 text-left">
            <div className="flex items-center">
              <span className="font-medium">mmmm</span>
              <span className="mx-2 text-gray-400">—</span>
              <span className="text-gray-600">Romain @Gorgias</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Avatar className="w-5 h-5 mr-1">
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
              <span>Rankey</span>
              <span className="mx-2">—</span>
              <span>Dec 7th</span>
            </div>
          </div>
        </button>

        <button className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50">
          <EnvelopeIcon className="w-5 h-5 text-gray-400" />
          <div className="flex-1 text-left">
            <div className="flex items-center">
              <span className="font-medium">Romain @Gorgias</span>
              <span className="mx-2 text-gray-400">—</span>
              <span className="text-gray-600">support@gorgias.com</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};