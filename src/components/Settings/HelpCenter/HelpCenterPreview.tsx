import React from 'react';
import { Button } from '../../ui/button';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface HelpCenterPreviewProps {
  layout: 'list' | 'grid';
  brandName: string;
  accentColor: string;
}

export const HelpCenterPreview: React.FC<HelpCenterPreviewProps> = ({
  layout,
  brandName,
  accentColor
}) => {
  const ListLayout = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium">Shipping & Delivery</h3>
        <div className="space-y-1">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 cursor-pointer">
            <span>What is your shipping policy?</span>
            <ChevronRightIcon className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 cursor-pointer">
            <span>How do I track my order?</span>
            <ChevronRightIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium">Order Management</h3>
        <div className="space-y-1">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 cursor-pointer">
            <span>How do I cancel my order?</span>
            <ChevronRightIcon className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 cursor-pointer">
            <span>Can I modify my order?</span>
            <ChevronRightIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );

  const GridLayout = () => (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Categories</h3>
          <Button variant="ghost" size="sm">See All</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg border hover:border-blue-600 cursor-pointer">
            <h4 className="font-medium">Shipping & Returns</h4>
            <p className="text-sm text-gray-500 mt-1">4 articles</p>
          </div>
          <div className="p-4 bg-white rounded-lg border hover:border-blue-600 cursor-pointer">
            <h4 className="font-medium">Order Management</h4>
            <p className="text-sm text-gray-500 mt-1">6 articles</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Popular Articles</h3>
          <Button variant="ghost" size="sm">See All</Button>
        </div>
        <div className="space-y-2">
          <div className="p-3 bg-white rounded-lg hover:bg-gray-50 cursor-pointer">
            <h4 className="font-medium">How do I track my order?</h4>
            <p className="text-sm text-gray-500 mt-1">Learn how to track your shipment and get updates...</p>
          </div>
          <div className="p-3 bg-white rounded-lg hover:bg-gray-50 cursor-pointer">
            <h4 className="font-medium">Returns & Refunds Policy</h4>
            <p className="text-sm text-gray-500 mt-1">Everything you need to know about our return process...</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="border rounded-lg overflow-hidden bg-gray-50">
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">{brandName || 'Your Brand Name'}</h2>
          <Button variant="ghost" size="sm">Menu</Button>
        </div>
      </div>
      <div className="p-4">
        {layout === 'list' ? <ListLayout /> : <GridLayout />}
      </div>
    </div>
  );
};