import React from 'react';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Setup Progress
        </span>
        <span className="text-sm text-gray-600">
          {currentStep} of {totalSteps} steps completed
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-purple-600 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};