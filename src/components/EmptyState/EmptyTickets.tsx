import React from 'react';
import { JarveyLogo } from './JarveyLogo';
import { clsx } from 'clsx';

export const EmptyTickets: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
      <div className="relative">
        <JarveyLogo 
          className={clsx(
            "w-24 h-24 text-gray-200 transition-all duration-500 hover:text-purple-600",
            "animate-float"
          )}
        />
      </div>
      <p className="mt-4 text-gray-500 animate__animated animate__fadeIn animate__delay-1s">
        No tickets found
      </p>
    </div>
  );
};