import React from 'react';
import { EnvelopeIcon, PhoneIcon, GlobeAltIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { CustomerSummary } from './CustomerSummary';
import { CustomerNotes } from './CustomerNotes';

interface CustomerInfoProps {
  onClose?: () => void;
}

export const CustomerInfo: React.FC<CustomerInfoProps> = ({ onClose }) => {
  return (
    <div className="w-full lg:w-80 h-full border-l bg-white flex flex-col">
      <div className="lg:hidden p-4 border-b flex items-center justify-between">
        <h2 className="font-medium">Customer Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <XMarkIcon className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">MD</span>
            </div>
            <div>
              <h2 className="font-medium">Marco D.</h2>
              <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">VIP</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600">Usually asks for a discount</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <EnvelopeIcon className="w-4 h-4 text-gray-400" />
              <span className="truncate">marcodicaprio1111@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <PhoneIcon className="w-4 h-4 text-gray-400" />
              <span>+1 415 301 3868</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <GlobeAltIcon className="w-4 h-4 text-gray-400" />
              <span>Montreal, Canada</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <span>Local Time: 09:50 am</span>
            </div>
          </div>
        </div>
      </div>

      <CustomerSummary />
      
      <CustomerNotes />

      <div className="p-4 mt-auto">
        <button className="w-full py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
          Customer Timeline
        </button>
      </div>
    </div>
  );
};