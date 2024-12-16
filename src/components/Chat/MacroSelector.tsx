import React, { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import { MacroManager } from './MacroManager';

interface Macro {
  id: string;
  title: string;
  content: string;
  tags: string[];
  language: string;
}

interface MacroSelectorProps {
  onSelect: (macro: Macro) => void;
}

export const MacroSelector: React.FC<MacroSelectorProps> = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMacro, setSelectedMacro] = useState<Macro | null>(null);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [macros, setMacros] = useState<Macro[]>([
    {
      id: '1',
      title: 'Greeting',
      content: 'Hello,\n\nThank you for reaching out. How can I help you today?',
      tags: ['greeting', 'welcome'],
      language: 'English',
    },
    {
      id: '2',
      title: 'Order Status',
      content: 'I can help you check the status of your order. Could you please provide your order number?',
      tags: ['order', 'status'],
      language: 'English',
    },
  ]);

  const filteredMacros = macros.filter(macro =>
    macro.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    macro.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSaveMacro = (macro: Macro) => {
    if (selectedMacro) {
      setMacros(macros.map(m => m.id === macro.id ? macro : m));
    } else {
      setMacros([...macros, macro]);
    }
    setSelectedMacro(null);
    setIsManagerOpen(false);
  };

  const handleDeleteMacro = (id: string) => {
    setMacros(macros.filter(m => m.id !== id));
    setSelectedMacro(null);
    setIsManagerOpen(false);
  };

  const handleDuplicateMacro = (id: string) => {
    const macro = macros.find(m => m.id === id);
    if (macro) {
      const newMacro = {
        ...macro,
        id: Math.random().toString(36).substr(2, 9),
        title: `${macro.title} (Copy)`,
      };
      setMacros([...macros, newMacro]);
    }
    setSelectedMacro(null);
    setIsManagerOpen(false);
  };

  return (
    <div className="border rounded-lg bg-white">
      <div className="p-3 border-b">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Search macros..."
            className="flex-1 px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            size="sm"
            onClick={() => {
              setSelectedMacro(null);
              setIsManagerOpen(true);
            }}
          >
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="h-[200px]">
        <div className="p-2">
          {filteredMacros.map((macro) => (
            <div
              key={macro.id}
              className="group relative p-2 rounded hover:bg-gray-50"
            >
              <button
                className="w-full text-left"
                onClick={() => onSelect(macro)}
              >
                <div className="font-medium text-sm">{macro.title}</div>
                <div className="text-xs text-gray-500 truncate">{macro.content}</div>
                <div className="mt-1 flex gap-1">
                  {macro.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
              <button
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
                onClick={() => {
                  setSelectedMacro(macro);
                  setIsManagerOpen(true);
                }}
              >
                <PencilIcon className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <MacroManager
        isOpen={isManagerOpen}
        onClose={() => {
          setIsManagerOpen(false);
          setSelectedMacro(null);
        }}
        initialMacro={selectedMacro || undefined}
        onSave={handleSaveMacro}
        onDelete={handleDeleteMacro}
        onDuplicate={handleDuplicateMacro}
      />
    </div>
  );
};