import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SeriesABannerProps {
  onDismiss?: () => void;
}

export const SeriesABanner: React.FC<SeriesABannerProps> = ({ onDismiss }) => {
  return (
    <div className="bg-yellow-50 px-4 py-2 flex items-center justify-between text-sm border-b border-yellow-100 animate__animated animate__fadeInDown">
      <div className="flex items-center gap-2 text-yellow-800 mx-auto">
        <span className="animate__animated animate__tada animate__delay-1s">🎉</span>
        <span>Exciting news! Jarvey AI has raised a $2M Series-A round</span>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-yellow-600 hover:text-yellow-800 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};