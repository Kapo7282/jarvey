import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { HelpCenterPreview } from './HelpCenterPreview';

interface HelpCenterBrandingProps {
  onNext: () => void;
  onBack: () => void;
}

export const HelpCenterBranding: React.FC<HelpCenterBrandingProps> = ({ onNext, onBack }) => {
  const [layout, setLayout] = useState<'list' | 'grid'>('list');
  const [brandName, setBrandName] = useState('modemarketsdfmk');
  const [accentColor, setAccentColor] = useState('#4A8DF9');

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Add your branding</h2>
          <p className="text-gray-500 mb-6">
            Give the Help Center your brand's look and feel. Additional customization available later.
          </p>

          <div className="space-y-8">
            <div>
              <Label>Logo</Label>
              <p className="text-sm text-gray-500 mb-2">
                Displayed in the header of your Help Center.
              </p>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <div className="mb-2">Drop your image here,</div>
                <div>or <Button variant="link" className="text-blue-600 p-0">browse</Button></div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Recommended size 1640 x 624, 500KB or less
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="accent-color">Accent color</Label>
                <input
                  id="accent-color"
                  type="text"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="#4A8DF9"
                />
              </div>

              <div>
                <Label htmlFor="main-font">Main font</Label>
                <select
                  id="main-font"
                  className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="inter">Inter</option>
                  <option value="roboto">Roboto</option>
                  <option value="opensans">Open Sans</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Layout</Label>
              <RadioGroup
                value={layout}
                onValueChange={(value: 'list' | 'grid') => setLayout(value)}
                className="mt-3 grid grid-cols-2 gap-4"
              >
                <div className="relative">
                  <RadioGroupItem
                    value="list"
                    id="list"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="list"
                    className={`
                      block p-4 rounded-lg border-2 cursor-pointer
                      ${layout === 'list' ? 'border-blue-600' : 'border-gray-200'}
                    `}
                  >
                    <div className="space-y-2 mb-4">
                      <div className="h-2 w-full bg-gray-200 rounded"></div>
                      <div className="h-2 w-full bg-gray-200 rounded"></div>
                      <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="font-medium">1 page layout</div>
                    <div className="text-sm text-gray-500">
                      Best for shorter articles and FAQs - shows all articles on a single page in an accordion layout.
                    </div>
                  </Label>
                </div>

                <div className="relative">
                  <RadioGroupItem
                    value="grid"
                    id="grid"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="grid"
                    className={`
                      block p-4 rounded-lg border-2 cursor-pointer
                      ${layout === 'grid' ? 'border-blue-600' : 'border-gray-200'}
                    `}
                  >
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="h-12 bg-gray-200 rounded"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                    </div>
                    <div className="font-medium">Card layout</div>
                    <div className="text-sm text-gray-500">
                      Best for more complex Help Centers - organize content into categories and sub-categories.
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t">
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onBack}>Back</Button>
            <Button variant="ghost">Save & Customize Later</Button>
          </div>
          <Button onClick={onNext}>Next</Button>
        </div>
      </div>

      <div className="sticky top-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">PREVIEW</h3>
        <HelpCenterPreview
          layout={layout}
          brandName={brandName}
          accentColor={accentColor}
        />
      </div>
    </div>
  );
};