import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Button } from './ui/button';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b px-4 flex items-center justify-between z-40">
      <Button variant="ghost" size="icon" onClick={onToggle}>
        <Bars3Icon className="w-6 h-6" />
      </Button>
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
        <div>
          <h1 className="font-semibold">Jarvey AI</h1>
          <p className="text-xs text-gray-500">AI CS</p>
        </div>
      </div>

      <div className="w-10" /> {/* Spacer for alignment */}
    </div>
  );
};