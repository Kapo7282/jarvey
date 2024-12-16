import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { CreditCardForm } from './CreditCardForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const BillingSettings: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const plans = [
    {
      name: 'Helpdesk',
      description: 'Pro - 2000 tickets/month',
      price: 360,
      interval: 'month'
    },
    {
      name: 'Automate',
      description: '190 automated interactions/month',
      price: 180,
      interval: 'month'
    }
  ];

  const total = plans.reduce((sum, plan) => sum + plan.price, 0);

  return (
    <div className="space-y-6">
      <div>
        <Tabs defaultValue="payment" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="usage">Usage & Plans</TabsTrigger>
            <TabsTrigger value="payment">Payment Information</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>

          <TabsContent value="payment">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Payment Method
                  </h3>
                  <CreditCardForm />
                </div>

                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Billing Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="billing@company.com"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Invoices are sent to this email address
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Organization name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country or region
                      </label>
                      <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border h-fit">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Summary
                </h3>
                <div className="space-y-4">
                  {plans.map((plan) => (
                    <div key={plan.name} className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{plan.name}</h4>
                        <p className="text-sm text-gray-500">{plan.description}</p>
                      </div>
                      <p className="font-medium">
                        ${plan.price}/{plan.interval}
                      </p>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total}/month</span>
                  </div>

                  <p className="text-sm text-gray-500 text-right">
                    Prices exclusive of sales tax
                  </p>

                  <div className="pt-4">
                    <h4 className="font-medium mb-2">
                      Start your subscription today
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      You will be charged for the products and plan you've selected.
                    </p>
                    <div className="flex items-start gap-2 mb-4">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mt-1"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the Terms of Service and Privacy Policy
                      </label>
                    </div>
                    <Button className="w-full">
                      Subscribe Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};