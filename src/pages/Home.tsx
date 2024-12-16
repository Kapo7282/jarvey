import React, { useState } from 'react';
import { WelcomeMessage } from '../components/Home/WelcomeMessage';
import { OnboardingStep } from '../components/Home/OnboardingStep';
import { OnboardingProgress } from '../components/Home/OnboardingProgress';

export const Home: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const currentStep = completedSteps.length;

  const handleStepComplete = (stepNumber: number) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  const steps = [
    {
      title: "Connect your support email",
      description: "Link your customer support email to start managing all inquiries in one place.",
      actionLabel: "Connect Email",
      route: "/connect-email"
    },
    {
      title: "Connect your Shopify store",
      description: "Integrate your Shopify store to access order information and customer data.",
      actionLabel: "Connect Shopify",
      route: "/connect-shopify"
    },
    {
      title: "Train your AI assistant",
      description: "Customize your AI assistant with your brand voice and support preferences.",
      actionLabel: "Start Training",
      route: "/train-ai"
    },
  ];

  return (
    <div className="flex-1 min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <WelcomeMessage />
        <OnboardingProgress currentStep={currentStep} totalSteps={steps.length} />
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <OnboardingStep
              key={index}
              stepNumber={index + 1}
              title={step.title}
              description={step.description}
              actionLabel={step.actionLabel}
              isCompleted={completedSteps.includes(index)}
              isActive={currentStep === index}
              onAction={() => handleStepComplete(index)}
              route={step.route}
            />
          ))}
        </div>
      </div>
    </div>
  );
};