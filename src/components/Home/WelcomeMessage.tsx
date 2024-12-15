import React from 'react';

export const WelcomeMessage: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Jarvey AI
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Let's get your customer support system set up. Follow these simple steps to connect your store and start providing exceptional support with AI assistance.
      </p>
    </div>
  );
};