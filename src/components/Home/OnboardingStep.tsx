'use client'

import { Button } from '../ui/button'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'

interface OnboardingStepProps {
  title: string
  description: string
  stepNumber: number
  isCompleted?: boolean
  isActive?: boolean
  onAction: () => void
  actionLabel: string
  route?: string
}

export function OnboardingStep({
  title,
  description,
  stepNumber,
  isCompleted = false,
  isActive = false,
  onAction,
  actionLabel,
  route,
}: OnboardingStepProps) {
  const router = useRouter()

  const handleClick = () => {
    onAction()
    if (route) {
      router.push(route)
    }
  }

  return (
    <div
      className={clsx(
        "p-6 rounded-lg border transition-colors animate__animated",
        isActive ? "border-purple-600 bg-purple-50 animate__pulse" : "border-gray-200",
        isCompleted ? "bg-green-50 border-green-200 animate__fadeInLeft" : "animate__fadeIn"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={clsx(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium animate__animated",
            isCompleted ? "bg-green-100 text-green-700 animate__bounceIn" : "bg-purple-100 text-purple-700"
          )}
        >
          {isCompleted ? (
            <CheckCircleIcon className="w-5 h-5" />
          ) : (
            stepNumber
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <Button
            variant={isCompleted ? "secondary" : "default"}
            onClick={handleClick}
            disabled={!isActive && !isCompleted}
            className={isActive ? "animate__animated animate__pulse animate__infinite" : ""}
          >
            {isCompleted ? "Connected" : actionLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}