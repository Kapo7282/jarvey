import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import * as HoverCard from '@radix-ui/react-hover-card';

interface GaugeProps {
  value: number;
  max: number;
  color: string;
}

const Gauge: React.FC<GaugeProps> = ({ value, max, color }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="relative w-32 h-16">
      <svg className="transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#f3f4f6"
          strokeWidth="10"
          strokeDasharray={`${Math.PI * 90 * 0.75} ${Math.PI * 90 * 0.25}`}
          strokeLinecap="round"
          className="transform translate-x-2 translate-y-2"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${(Math.PI * 90 * 0.75) * (percentage / 100)} ${Math.PI * 90}`}
          strokeLinecap="round"
          className="transform translate-x-2 translate-y-2 transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-semibold">{value || '--'}</span>
      </div>
    </div>
  );
};

interface MetricProps {
  label: string;
  tooltip: string;
  children: React.ReactNode;
}

const Metric: React.FC<MetricProps> = ({ label, tooltip, children }) => {
  return (
    <div>
      <div className="flex items-center gap-1 mb-2">
        <span className="text-sm text-gray-600">{label}</span>
        <HoverCard.Root>
          <HoverCard.Trigger asChild>
            <button className="text-gray-400 hover:text-gray-600">
              <InformationCircleIcon className="w-4 h-4" />
            </button>
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content
              className="w-64 p-3 bg-gray-900 text-white rounded-lg shadow-lg text-sm"
              sideOffset={5}
            >
              {tooltip}
              <HoverCard.Arrow className="fill-gray-900" />
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      </div>
      {children}
    </div>
  );
};

export const CustomerSummary: React.FC = () => {
  return (
    <div className="p-4 border-b animate__animated animate__fadeIn">
      <h3 className="text-sm font-medium mb-4">Summary</h3>
      <div className="grid grid-cols-2 gap-4">
        <Metric 
          label="Total spent" 
          tooltip="Total amount spent by this customer across all orders"
        >
          <Gauge value={0} max={1000} color="#10B981" />
        </Metric>
        
        <Metric 
          label="Total Orders" 
          tooltip="Total number of orders placed by this customer"
        >
          <Gauge value={0} max={100} color="#F59E0B" />
        </Metric>
        
        <Metric 
          label="AOV" 
          tooltip="Average Order Value - total spent divided by number of orders"
        >
          <Gauge value={0} max={500} color="#F59E0B" />
        </Metric>
        
        <Metric 
          label="Frequency" 
          tooltip="Average number of orders per month"
        >
          <Gauge value={0} max={10} color="#EC4899" />
        </Metric>
      </div>
    </div>
  );
};