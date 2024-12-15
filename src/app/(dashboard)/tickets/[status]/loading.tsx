import { TicketSkeleton } from '@/components/Tickets/TicketSkeleton'

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {Array.from({ length: 5 }).map((_, index) => (
        <TicketSkeleton key={index} index={index} />
      ))}
    </div>
  )
}