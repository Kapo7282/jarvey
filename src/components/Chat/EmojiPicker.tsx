import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { ScrollArea } from '../ui/scroll-area';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

const EMOJI_CATEGORIES = [
  {
    name: 'Smileys & People',
    emojis: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘']
  },
  {
    name: 'Animals & Nature',
    emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵']
  },
  {
    name: 'Food & Drink',
    emojis: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝']
  },
  {
    name: 'Objects',
    emojis: ['⌚️', '📱', '💻', '⌨️', '🖥', '🖨', '🖱', '🖲', '🕹', '🗜', '💽', '💾', '💿', '📀', '📼']
  }
];

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect }) => {
  return (
    <div className="w-[320px] bg-white rounded-lg shadow-lg border p-2">
      <ScrollArea className="h-[320px]">
        <div className="space-y-4">
          {EMOJI_CATEGORIES.map((category) => (
            <div key={category.name}>
              <h3 className="text-xs font-medium text-gray-500 px-2 mb-2">
                {category.name}
              </h3>
              <div className="grid grid-cols-8 gap-1">
                {category.emojis.map((emoji) => (
                  <button
                    key={emoji}
                    className="w-8 h-8 flex items-center justify-center text-xl hover:bg-gray-100 rounded"
                    onClick={() => onSelect(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};