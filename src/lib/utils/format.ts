import { format, formatDistanceToNow } from 'date-fns'

export function formatDate(date: Date): string {
  return format(date, 'MMM d, h:mm a')
}

export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}