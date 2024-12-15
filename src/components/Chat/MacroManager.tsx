import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Label } from '../ui/label';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TagsDropdown } from './TagsDropdown';
import { Badge } from '../ui/badge';

interface MacroManagerProps {
  isOpen: boolean;
  onClose: () => void;
  initialMacro?: Macro;
  onSave: (macro: Macro) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

export interface Macro {
  id: string;
  name: string;
  content: string;
  tags: string[];
  language: string;
}

export const MacroManager: React.FC<MacroManagerProps> = ({
  isOpen,
  onClose,
  initialMacro,
  onSave,
  onDelete,
  onDuplicate,
}) => {
  const [macro, setMacro] = useState<Macro>(
    initialMacro || {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      content: '',
      tags: [],
      language: 'English',
    }
  );

  const editor = useEditor({
    extensions: [StarterKit],
    content: macro.content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  const handleSave = () => {
    if (editor) {
      onSave({
        ...macro,
        content: editor.getHTML(),
      });
    }
    onClose();
  };

  const handleAddTag = (tag: string) => {
    if (!macro.tags.includes(tag)) {
      setMacro({ ...macro, tags: [...macro.tags, tag] });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setMacro({
      ...macro,
      tags: macro.tags.filter(tag => tag !== tagToRemove),
    });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-[5%] left-[50%] translate-x-[-50%] w-full max-w-3xl bg-white rounded-lg shadow-xl">
          <div className="p-6">
            <Dialog.Title className="text-xl font-semibold mb-6">
              {initialMacro ? 'Edit Macro' : 'Create New Macro'}
            </Dialog.Title>

            <div className="space-y-6">
              <div>
                <Label htmlFor="macro-name">Macro name</Label>
                <input
                  id="macro-name"
                  type="text"
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={macro.name}
                  onChange={(e) => setMacro({ ...macro, name: e.target.value })}
                  placeholder="Name that all agents will see while searching for it"
                />
              </div>

              <div>
                <Label>Language</Label>
                <select
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={macro.language}
                  onChange={(e) => setMacro({ ...macro, language: e.target.value })}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>

              <div>
                <Label>Add tags to ticket</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  <TagsDropdown onAddTag={handleAddTag} />
                  {macro.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-gray-700"
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Response text</Label>
                <div className="mt-2 border rounded-lg">
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div>
                {initialMacro && (
                  <Button
                    variant="destructive"
                    onClick={() => onDelete?.(macro.id)}
                  >
                    Delete Macro
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={onClose}>
                  Discard Changes
                </Button>
                {initialMacro && (
                  <Button
                    variant="secondary"
                    onClick={() => onDuplicate?.(macro.id)}
                  >
                    Duplicate
                  </Button>
                )}
                <Button onClick={handleSave}>
                  {initialMacro ? 'Update' : 'Create Macro'}
                </Button>
              </div>
            </div>
          </div>

          <Dialog.Close className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <XMarkIcon className="w-6 h-6" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};