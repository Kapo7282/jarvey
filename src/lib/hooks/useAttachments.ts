'use client'

import { useState, useEffect } from 'react'

export type AttachmentType = 'image' | 'document' | 'video' | 'audio'

export interface Attachment {
  id: string
  type: AttachmentType
  url: string
  name: string
  size?: number
  previewUrl?: string
}

export function useAttachments() {
  const [attachments, setAttachments] = useState<Attachment[]>([])

  // Cleanup blob URLs when component unmounts
  useEffect(() => {
    return () => {
      attachments.forEach(attachment => {
        if (attachment.url.startsWith('blob:')) {
          URL.revokeObjectURL(attachment.url)
        }
        if (attachment.previewUrl?.startsWith('blob:')) {
          URL.revokeObjectURL(attachment.previewUrl)
        }
      })
    }
  }, [attachments])

  const addAttachment = async (file: File) => {
    const type: AttachmentType = file.type.startsWith('image/') ? 'image' :
                                file.type.startsWith('video/') ? 'video' :
                                file.type.startsWith('audio/') ? 'audio' : 'document'

    const attachment: Attachment = {
      id: Math.random().toString(),
      type,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }

    // Create preview for images
    if (type === 'image') {
      try {
        const preview = await createImagePreview(file)
        attachment.previewUrl = preview
      } catch (error) {
        console.error('Failed to create image preview:', error)
      }
    }

    setAttachments(prev => [...prev, attachment])
  }

  const removeAttachment = (id: string) => {
    setAttachments(prev => {
      const attachment = prev.find(a => a.id === id)
      if (attachment?.url.startsWith('blob:')) {
        URL.revokeObjectURL(attachment.url)
      }
      if (attachment?.previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(attachment.previewUrl)
      }
      return prev.filter(a => a.id !== id)
    })
  }

  const clearAttachments = () => {
    attachments.forEach(attachment => {
      if (attachment.url.startsWith('blob:')) {
        URL.revokeObjectURL(attachment.url)
      }
      if (attachment.previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(attachment.previewUrl)
      }
    })
    setAttachments([])
  }

  return {
    attachments,
    addAttachment,
    removeAttachment,
    clearAttachments
  }
}

async function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        // Set preview dimensions
        const MAX_SIZE = 200
        let width = img.width
        let height = img.height
        if (width > height) {
          if (width > MAX_SIZE) {
            height = height * (MAX_SIZE / width)
            width = MAX_SIZE
          }
        } else {
          if (height > MAX_SIZE) {
            width = width * (MAX_SIZE / height)
            height = MAX_SIZE
          }
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(blob => {
          if (blob) {
            resolve(URL.createObjectURL(blob))
          } else {
            reject(new Error('Failed to create preview blob'))
          }
        }, 'image/jpeg', 0.7)
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = reader.result as string
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}