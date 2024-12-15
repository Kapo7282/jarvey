'use client'

interface MessageHeaderProps {
  sender: string
  timestamp: string
  isOutbound?: boolean
}

export function MessageHeader({ sender, timestamp, isOutbound }: MessageHeaderProps) {
  return (
    <div className={`flex items-center gap-1.5 mb-1 ${isOutbound ? 'justify-end' : 'justify-start'}`}>
      <span className="text-xs font-medium text-gray-900">{sender}</span>
      <span className="text-[10px] text-gray-500">{timestamp}</span>
    </div>
  )
}