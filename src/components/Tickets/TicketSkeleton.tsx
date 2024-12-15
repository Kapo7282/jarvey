import React from 'react';
import { clsx } from 'clsx';

interface TicketSkeletonProps {
  index?: number;
}

export const TicketSkeleton: React.FC<TicketSkeletonProps> = ({ index = 0 }) => {
  return (
    <div 
      className={clsx(
        "flex items-center gap-4 px-4 py-3 border-b",
        "animate__animated animate__fadeIn animate__faster",
        "transition-all duration-500 ease-in-out",
        "hover:scale-[1.02] hover:bg-gray-50"
      )}
      style={{
        animationDelay: `${index * 100}ms`,
        transform: `translateY(${index * 2}px)`,
        opacity: 1 - (index * 0.1)
      }}
    >
      <div className="flex-shrink-0">
        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
      </div>
      
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
      </div>

      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
    </div>
  );
};