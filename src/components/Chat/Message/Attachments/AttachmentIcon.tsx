'use client'

import { DocumentIcon, PhotoIcon, VideoCameraIcon, MusicalNoteIcon } from '@heroicons/react/24/outline'
import { AttachmentType } from '@/lib/hooks/useAttachments'

interface AttachmentIconProps {
  type: AttachmentType
  className?: string
}

export function AttachmentIcon({ type, className }: AttachmentIconProps) {
  switch (type) {
    case 'document':
      return <DocumentIcon className={className} />
    case 'image':
      return <PhotoIcon className={className} />
    case 'video':
      return <VideoCameraIcon className={className} />
    case 'audio':
      return <MusicalNoteIcon className={className} />
  }
}