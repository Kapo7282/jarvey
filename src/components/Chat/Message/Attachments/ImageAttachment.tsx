'use client'

import { useState } from 'react'
import { Attachment } from '@/lib/hooks/useAttachments'

interface ImageAttachmentProps {
  attachment: Attachment
}

export function ImageAttachment({ attachment }: ImageAttachmentProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-48 h-48 rounded-lg overflow-hidden border bg-gray-100 hover:opacity-90 transition-opacity"
    >
      {/* Use regular img tag for blob URLs */}
      <img
        src={attachment.url}
        alt={attachment.name}
        className={`
          w-full h-full object-cover transition-opacity duration-200
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
      )}
    </a>
  )
}