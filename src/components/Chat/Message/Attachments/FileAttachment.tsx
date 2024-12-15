'use client'

import { Attachment } from '@/lib/hooks/useAttachments'
import { AttachmentIcon } from './AttachmentIcon'
import { formatFileSize } from '@/lib/utils/file'
import { clsx } from 'clsx'

interface FileAttachmentProps {
  attachment: Attachment
  isOutbound?: boolean
}

export function FileAttachment({ attachment, isOutbound }: FileAttachmentProps) {
  // For blob URLs, create an onClick handler to download the file
  const handleClick = (e: React.MouseEvent) => {
    if (attachment.url.startsWith('blob:')) {
      e.preventDefault()
      const link = document.createElement('a')
      link.href = attachment.url
      link.download = attachment.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <a
      href={attachment.url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors",
        isOutbound ? "bg-white" : "bg-gray-50"
      )}
    >
      <div className="text-gray-500">
        <AttachmentIcon type={attachment.type} className="w-5 h-5" />
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
}