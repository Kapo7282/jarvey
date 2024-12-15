import React, { useState } from 'react';
import { SavePresetDialog } from '../Tickets/SavePresetDialog';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';

interface ViewsManagerProps {
  onAddView?: (name: string, emoji: string) => void;
}

export const ViewsManager: React.FC<ViewsManagerProps> = ({ onAddView }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveView = (name: string, emoji: string) => {
    if (onAddView) {
      onAddView(name, emoji);
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 mb-2">
        <h2 className="text-xs font-semibold text-gray-500">DEFAULT</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0 hover:bg-gray-100 transition-colors visible"
          onClick={() => setIsDialogOpen(true)}
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>

      <SavePresetDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveView}
      />
    </>
  );
};