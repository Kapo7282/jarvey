import React, { useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { clsx } from 'clsx';

interface Note {
  id: string;
  content: string;
  timestamp: Date;
  author: string;
}

export const CustomerNotes: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const note: Note = {
      id: Math.random().toString(36).substr(2, 9),
      content: newNote.trim(),
      timestamp: new Date(),
      author: 'You'
    };

    setNotes([note, ...notes]);
    setNewNote('');
  };

  return (
    <div className="border-t">
      <button
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3 className="text-sm font-medium">Notes</h3>
        <ChevronUpIcon 
          className={clsx(
            "w-4 h-4 text-gray-500 transition-transform",
            isCollapsed && "transform rotate-180"
          )} 
        />
      </button>

      <div className={clsx(
        "overflow-hidden transition-all",
        isCollapsed ? "max-h-0" : "max-h-[400px]"
      )}>
        <div className="p-4 pt-0">
          <form onSubmit={handleAddNote} className="mb-4">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add note"
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </form>

          <ScrollArea className="h-[200px]">
            {notes.length === 0 ? (
              <div className="text-sm text-gray-500 text-center py-8">
                No notes found
              </div>
            ) : (
              <div className="space-y-3">
                {notes.map((note) => (
                  <div 
                    key={note.id} 
                    className="p-3 bg-gray-50 rounded-lg animate__animated animate__fadeIn animate__faster"
                  >
                    <p className="text-sm mb-2">{note.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{note.author}</span>
                      <span>
                        {new Intl.DateTimeFormat('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric'
                        }).format(note.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};