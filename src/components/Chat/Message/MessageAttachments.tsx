'use client'

import Image from 'next/image'
import { DocumentIcon, PhotoIcon, VideoCameraIcon, MusicalNoteIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

interface Attachment {
  id: string
  type: 'image' | 'document' | 'video' | 'audio'
  url: string
  name: string
  size?: number
  previewUrl?: string
}

interface MessageAttachmentsProps {
  attachments: Attachment[]
  isOutbound?: boolean
}

function formatFileSize(bytes: number = 0) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function AttachmentIcon({ type }: { type: Attachment['type'] }) {
  switch (type) {
    case 'document':
      return <DocumentIcon className="w-5 h-5" />
    case 'image':
      return <PhotoIcon className="w-5 h-5" />
    case 'video':
      return <VideoCameraIcon className="w-5 h-5" />
    case 'audio':
      return <MusicalNoteIcon className="w-5 h-5" />
  }
}

export function MessageAttachments({ attachments, isOutbound }: MessageAttachmentsProps) {
  if (!attachments?.length) return null

  return (
    <div className={clsx(
      "flex flex-wrap gap-2 max-w-[80%] mb-2",
      isOutbound ? "ml-auto" : "mr-auto"
    )}>
      {attachments.map((attachment) => {
        if (attachment.type === 'image') {
          return (
            <a
              key={attachment.id}
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-48 h-48 rounded-lg overflow-hidden border bg-gray-100 hover:opacity-90 transition-opacity"
            >
              <Image
                src={attachment.url}
                alt={attachment.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </a>
          )
        }

        return (
          <a
            key={attachment.id}
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors",
              isOutbound ? "bg-white" : "bg-gray-50"
            )}
          >
            <div className="text-gray-500">
              <AttachmentIcon type={attachment.type} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">
                {attachment.name}
              </div>
              {attachment.size && (
                <div className="text-xs text-gray-500">
                  {formatFileSize(attachment.size)}
                </div>
              )}
            </div>
          </a>
        )
      })}
    </div>
  )
}