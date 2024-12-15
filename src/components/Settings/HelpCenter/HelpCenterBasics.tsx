import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

interface HelpCenterBasicsProps {
  onNext: () => void;
}

export const HelpCenterBasics: React.FC<HelpCenterBasicsProps> = ({ onNext }) => {
  const [platformType, setPlatformType] = useState('ecommerce');
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-6">Set up the basics</h2>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="brand-name">Brand name *</Label>
            <input
              id="brand-name"
              type="text"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your brand name"
            />
          </div>

          <div>
            <Label htmlFor="subdomain">Subdomain</Label>
            <div className="mt-1 flex items-center">
              <input
                id="subdomain"
                type="text"
                className="flex-1 px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="support"
              />
              <span className="px-3 py-2 bg-gray-50 border border-l-0 rounded-r-lg text-gray-500">
                .jarvey.help
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="language">Default language *</Label>
            <select
              id="language"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
            <Button variant="link" className="mt-2 text-blue-600">
              + Add More Languages
            </Button>
          </div>

          <div>
            <Label>Select a platform type</Label>
            <RadioGroup
              defaultValue="ecommerce"
              onValueChange={setPlatformType}
              className="mt-3 space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ecommerce" id="ecommerce" />
                <Label htmlFor="ecommerce" className="font-normal">
                  <div className="font-medium">Ecommerce platforms</div>
                  <div className="text-sm text-gray-500">Shopify, Magento, BigCommerce</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="font-normal">
                  <div className="font-medium">Any other website</div>
                  <div className="text-sm text-gray-500">Websites, knowledge bases, etc.</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {platformType === 'ecommerce' && (
            <div>
              <Label>Connect a store</Label>
              <p className="text-sm text-gray-500 mb-2">
                Connect a store to enable auto-embedding (Shopify only) to your website.
              </p>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select a store</option>
                <option value="store1">Store 1</option>
                <option value="store2">Store 2</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button variant="ghost">Cancel</Button>
        <Button onClick={onNext}>Create & Customize</Button>
      </div>
    </div>
  );
};