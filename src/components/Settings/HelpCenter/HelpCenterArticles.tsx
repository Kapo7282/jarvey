import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';

interface HelpCenterArticlesProps {
  onBack: () => void;
}

export const HelpCenterArticles: React.FC<HelpCenterArticlesProps> = ({ onBack }) => {
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);

  const articles = [
    {
      category: 'PAYMENTS & DISCOUNTS',
      items: [
        { id: '1', title: 'How do I apply promo/discount codes?' },
        { id: '2', title: 'How do I use my benefits/rewards points?' }
      ]
    },
    {
      category: 'ACCOUNT & SUBSCRIPTIONS',
      items: [
        { id: '3', title: 'How do I cancel my membership/subscription?' },
        { id: '4', title: "I'm having trouble logging in" },
        { id: '5', title: 'How do I skip a subscription shipment?' },
        { id: '6', title: 'How do I update my subscription items?' }
      ]
    },
    {
      category: 'ORDER MANAGEMENT',
      items: [
        { id: '7', title: 'What is your cancellation policy?' },
        { id: '8', title: 'Can I edit or add anything to my order?' },
        { id: '9', title: 'How do I cancel my order?' }
      ]
    }
  ];

  const toggleArticle = (id: string) => {
    setSelectedArticles(prev =>
      prev.includes(id)
        ? prev.filter(articleId => articleId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Add articles using templates</h2>
        <p className="text-gray-500 mb-6">
          The template language is based on the default language set in Step 1. You can import
          your own articles after onboarding.
        </p>

        <div className="space-y-6">
          {articles.map((category) => (
            <div key={category.category}>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.items.map((article) => (
                  <div
                    key={article.id}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <Checkbox
                      id={article.id}
                      checked={selectedArticles.includes(article.id)}
                      onCheckedChange={() => toggleArticle(article.id)}
                    />
                    <Label
                      htmlFor={article.id}
                      className="flex-1 cursor-pointer font-normal"
                    >
                      {article.title}
                    </Label>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onBack}>Back</Button>
          <Button variant="ghost">Save & Customize Later</Button>
        </div>
        <Button>Finish</Button>
      </div>
    </div>
  );
};