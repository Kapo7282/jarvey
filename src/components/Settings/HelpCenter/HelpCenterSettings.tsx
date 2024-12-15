import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { HelpCenterBasics } from './HelpCenterBasics';
import { HelpCenterBranding } from './HelpCenterBranding';
import { HelpCenterArticles } from './HelpCenterArticles';
import { Button } from '../../ui/button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const HelpCenterSettings: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-8">
        <Button variant="ghost" size="sm" className="-ml-2">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to Settings
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-semibold">Help Center</h1>
        <span className="text-sm text-gray-500">
          Configure your customer help center
        </span>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className="flex items-center"
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${currentStep === step ? 'bg-blue-600 text-white' : 
                    currentStep > step ? 'bg-green-100 text-green-600' : 
                    'bg-gray-100 text-gray-400'}
                `}>
                  {currentStep > step ? '✓' : step}
                </div>
                {step < 3 && (
                  <div className={`w-24 h-0.5 mx-2 ${
                    currentStep > step ? 'bg-green-100' : 'bg-gray-100'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {currentStep === 1 && <HelpCenterBasics onNext={handleNext} />}
        {currentStep === 2 && <HelpCenterBranding onNext={handleNext} onBack={handleBack} />}
        {currentStep === 3 && <HelpCenterArticles onBack={handleBack} />}
      </div>
    </div>
  );
};