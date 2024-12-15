'use client'

import { Button } from './ui/button'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

interface TrialBannerProps {
  daysLeft: number
  progress?: number
  onDismiss?: () => void
}

export function TrialBanner({ 
  daysLeft, 
  progress = 50,
  onDismiss 
}: TrialBannerProps) {
  const router = useRouter()

  return (
    <div className="bg-blue-50 px-4 py-2 flex items-center justify-between text-sm animate__animated animate__fadeInDown">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-blue-600">
          <span>You only have {daysLeft} days left in your trial</span>
          <Button 
            variant="link" 
            className="text-blue-600 h-auto p-0 animate__animated animate__pulse animate__infinite"
            onClick={() => router.push('/settings')}
          >
            Choose a plan
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600">Complete Jarvey Automate setup</span>
          <div className="w-32 h-2 bg-blue-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-gray-600">{progress}%</span>
        </div>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}