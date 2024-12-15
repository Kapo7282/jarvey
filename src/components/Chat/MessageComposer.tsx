import React, { useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '../ui/button';
import {
  BoltIcon,
  PaperClipIcon,
  PhotoIcon,
  FaceSmileIcon,
  XMarkIcon,
  DocumentIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline';
import { MacroSelector } from './MacroSelector';
import { EmojiPicker } from './EmojiPicker';
import { AttachmentPicker } from './AttachmentPicker';
import * as Popover from '@radix-ui/react-popover';
import { ScrollArea } from '../ui/scroll-area';

interface MessageComposerProps {
  onSend: (content: string, attachments: File[]) => void;
}

interface Attachment {
  file: File;
  preview?: string;
}

const getIconForFileType = (type: string) => {
  if (type.startsWith('image/')) return PhotoIcon;
  if (type.startsWith('video/')) return VideoCameraIcon;
  if (type.startsWith('audio/')) return MusicalNoteIcon;
  if (type.includes('zip') || type.includes('rar') || type.includes('7z')) return ArchiveBoxIcon;
  return DocumentIcon;
};

export const MessageComposer: React.FC<MessageComposerProps> = ({ onSend }) => {
  const [showMacros, setShowMacros] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Type your message...',
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[40px] max-h-[160px] overflow-y-auto text-sm',
      },
    },
  });

  const handleSend = () => {
    if (editor?.isEmpty && attachments.length === 0) return;
    const content = editor?.getHTML() || '';
    onSend(content, attachments.map(a => a.file));
    editor?.commands.clearContent();
    setAttachments([]);
  };

  const handleEmojiSelect = (emoji: string) => {
    editor?.commands.insertContent(emoji);
  };

  const handleAttachmentSelect = (type: string) => {
    if (fileInputRef.current) {
      const acceptMap: Record<string, string> = {
        document: '.pdf,.doc,.docx,.txt',
        photo: 'image/*',
        video: 'video/*',
        audio: 'audio/*',
        archive: '.zip,.rar,.7z',
      };
      fileInputRef.current.accept = acceptMap[type] || '*/*';
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAttachments: Attachment[] = await Promise.all(
      files.map(async (file) => {
        const attachment: Attachment = { file };
        if (file.type.startsWith('image/')) {
          attachment.preview = URL.createObjectURL(file);
        }
        return attachment;
      })
    );
    setAttachments([...attachments, ...newAttachments]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => {
      const newAttachments = [...prev];
      if (newAttachments[index].preview) {
        URL.revokeObjectURL(newAttachments[index].preview!);
      }
      newAttachments.splice(index, 1);
      return newAttachments;
    });
  };

  return (
    <div className="flex-shrink-0 border-t bg-white">
      <div className="max-w-3xl mx-auto p-3">
        {attachments.length > 0 && (
          <ScrollArea className="border rounded-lg p-2 mb-2 max-h-[160px]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="relative group border rounded-lg overflow-hidden"
                >
                  {attachment.preview ? (
                    <img
                      src={attachment.preview}
                      alt={attachment.file.name}
                      className="w-full h-16 object-cover"
                    />
                  ) : (
                    <div className="w-full h-16 bg-gray-50 flex flex-col items-center justify-center p-2">
                      {React.createElement(getIconForFileType(attachment.file.type), {
                        className: "w-6 h-6 text-gray-400 mb-1"
                      })}
                      <span className="text-xs text-gray-500 truncate w-full text-center">
                        {attachment.file.name}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => handleRemoveAttachment(index)}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <div className="mb-2 flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={() => setShowMacros(!showMacros)}
          >
            <BoltIcon className="w-3.5 h-3.5 mr-1" />
            Macros
          </Button>

          <Popover.Root>
            <Popover.Trigger asChild>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                <PaperClipIcon className="w-3.5 h-3.5 mr-1" />
                Attach
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content sideOffset={5} align="start">
                <AttachmentPicker onSelect={handleAttachmentSelect} />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.accept = 'image/*';
                fileInputRef.current.click();
              }
            }}
          >
            <PhotoIcon className="w-3.5 h-3.5 mr-1" />
            Image
          </Button>

          <Popover.Root>
            <Popover.Trigger asChild>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                <FaceSmileIcon className="w-3.5 h-3.5 mr-1" />
                Emoji
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content sideOffset={5} align="start">
                <EmojiPicker onSelect={handleEmojiSelect} />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>

        {showMacros && (
          <div className="mb-2">
            <MacroSelector onSelect={(macro) => {
              editor?.commands.setContent(macro.content);
              setShowMacros(false);
            }} />
          </div>
        )}

        <div className="bg-white border rounded-lg shadow-sm mb-2">
          <div className="p-2">
            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Press ⌘ + Enter to send
          </div>
          <div className="flex gap-1">
            <Button 
              variant="secondary" 
              size="sm"
              className="h-7 text-xs"
              onClick={() => {
                editor?.commands.clearContent();
                setAttachments([]);
              }}
            >
              Clear
            </Button>
            <Button 
              size="sm"
              className="h-7 text-xs"
              onClick={handleSend}
              disabled={editor?.isEmpty && attachments.length === 0}
            >
              Send
            </Button>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
          multiple
        />
      </div>
    </div>
  );
};