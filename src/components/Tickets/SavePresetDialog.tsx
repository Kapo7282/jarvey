import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SavePresetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, emoji: string) => void;
}

const EMOJI_OPTIONS = ['🔍', '📋', '📝', '✨', '🎯', '⭐️', '📌', '🔖'];

export const SavePresetDialog: React.FC<SavePresetDialogProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJI_OPTIONS[0]);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name, selectedEmoji);
      onClose();
      setName('');
      setSelectedEmoji(EMOJI_OPTIONS[0]);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[400px] bg-white rounded-lg shadow-lg p-6">
          <Dialog.Title className="text-lg font-medium mb-4">
            Save Filter Preset
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <Label htmlFor="preset-name">Preset Name</Label>
              <input
                id="preset-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter preset name"
              />
            </div>

            <div>
              <Label>Select Emoji</Label>
              <div className="grid grid-cols-8 gap-2 mt-1">
                {EMOJI_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xl ${
                      selectedEmoji === emoji ? 'bg-purple-100' : 'hover:bg-gray-100'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!name.trim()}>
              Save Preset
            </Button>
          </div>

          <Dialog.Close className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <XMarkIcon className="w-5 h-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};