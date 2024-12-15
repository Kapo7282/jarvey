'use client'

import { clsx } from 'clsx'
import { Attachment } from '@/lib/hooks/useAttachments'
import { ImageAttachment } from './ImageAttachment'
import { FileAttachment } from './FileAttachment'

interface MessageAttachmentsProps {
  attachments: Attachment[]
  isOutbound?: boolean
}

export function MessageAttachments({ attachments, isOutbound }: MessageAttachmentsProps) {
  if (!attachments?.length) return null

  return (
    <div className={clsx(
      "flex flex-wrap gap-2 max-w-[80%] mb-2",
      isOutbound ? "ml-auto" : "mr-auto"
    )}>
      {attachments.map((attachment) => (
        attachment.type === 'image' ? (
          <ImageAttachment key={attachment.id} attachment={attachment} />
        ) : (
          <FileAttachment key={attachment.id} attachment={attachment} isOutbound={isOutbound} />
        )
      ))}
    </div>
  )
}