import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { CreditCardForm } from './CreditCardForm';
import { NotificationsSettings } from './NotificationsSettings';
import { UsagePlans } from './UsagePlans';
import { HelpCenterSettings } from './HelpCenter/HelpCenterSettings';

export const BillingSettings: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <Tabs defaultValue="usage" className="w-full space-y-6">
        <div className="bg-white border-b sticky top-0 z-10 pt-6">
          <TabsList className="w-full justify-start px-6 pb-6">
            <TabsTrigger value="usage">Usage & Plans</TabsTrigger>
            <TabsTrigger value="payment">Payment Information</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="helpdesk">Help Center</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="usage" className="m-0">
          <UsagePlans />
        </TabsContent>

        <TabsContent value="payment" className="m-0">
          <div className="max-w-4xl mx-auto">
            <CreditCardForm />
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="m-0">
          <NotificationsSettings />
        </TabsContent>

        <TabsContent value="helpdesk" className="m-0">
          <HelpCenterSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};