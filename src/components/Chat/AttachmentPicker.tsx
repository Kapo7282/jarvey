import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { 
  DocumentIcon, 
  PhotoIcon, 
  VideoCameraIcon,
  MusicalNoteIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';

interface AttachmentPickerProps {
  onSelect: (type: string) => void;
}

const ATTACHMENT_TYPES = [
  { id: 'document', icon: DocumentIcon, label: 'Document' },
  { id: 'photo', icon: PhotoIcon, label: 'Photo' },
  { id: 'video', icon: VideoCameraIcon, label: 'Video' },
  { id: 'audio', icon: MusicalNoteIcon, label: 'Audio' },
  { id: 'archive', icon: ArchiveBoxIcon, label: 'Archive' },
];

export const AttachmentPicker: React.FC<AttachmentPickerProps> = ({ onSelect }) => {
  return (
    <div className="w-[200px] bg-white rounded-lg shadow-lg border p-2">
      <div className="space-y-1">
        {ATTACHMENT_TYPES.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded hover:bg-gray-50"
              onClick={() => onSelect(type.id)}
            >
              <Icon className="w-5 h-5 text-gray-500" />
              <span>{type.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};