export interface Tag {
  id: string
  text: string
  color: TagColor
  category?: string
}

export type TagColor = 
  | 'blue' 
  | 'green' 
  | 'yellow' 
  | 'red' 
  | 'purple' 
  | 'gray'

export interface TagGroup {
  category: string
  tags: Tag[]
}

export const TAG_COLORS: Record<TagColor, {
  bg: string
  text: string
  border: string
}> = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200'
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200'
  },
  yellow: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200'
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200'
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200'
  },
  gray: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200'
  }
}