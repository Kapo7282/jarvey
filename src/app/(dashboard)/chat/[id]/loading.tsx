export default function Loading() {
  return (
    <div className="flex h-full bg-gray-50">
      <div className="w-[280px] flex-shrink-0 animate-pulse bg-gray-100" />
      <div className="flex-1 flex flex-col min-w-[500px]">
        <div className="h-16 bg-white border-b animate-pulse" />
        <div className="flex-1 p-4">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-16 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}