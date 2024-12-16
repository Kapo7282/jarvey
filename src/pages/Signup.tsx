import React from 'react';
import { SignupModal } from '../components/Auth/SignupModal';
import { useNavigate } from 'react-router-dom';
import { ChatHeader } from '../components/Chat/ChatHeader';
import { ChatMessage } from '../components/Chat/ChatMessage';
import { CustomerInfo } from '../components/CustomerInfo/CustomerInfo';
import { MessageComposer } from '../components/Chat/MessageComposer';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Backdrop - Ticket Chat */}
      <div className="absolute inset-0 filter blur-sm pointer-events-none">
        <div className="flex h-full">
          <div className="w-64 border-r bg-white" />
          
          <main className="flex-1 flex flex-col">
            <ChatHeader
              title="Change my shipping address"
              orderNumber="Order #2631"
              tags={[
                { text: "Active Subscriber", color: "bg-blue-100 text-blue-800" },
                { text: "AI Agent Responded", color: "bg-green-100 text-green-800" },
                { text: "+2", color: "text-gray-500" }
              ]}
            />
            
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto p-4">
                <div className="mb-8">
                  <div className="text-center text-sm text-gray-500 mb-6">
                    FRI, OCT 18
                  </div>
                  
                  <ChatMessage
                    sender="Marco D"
                    timestamp="12:31 PM"
                    content="Hey support,
I as traveling this weekend to my parent's house in San Francisco.
Their address is:"
                  />
                  
                  <ChatMessage
                    sender="AI Agent"
                    timestamp="12:31 PM"
                    isAI
                    content={`Hello,
Thank you for letting us know about the change needed for your shipping address. From what I understand, you'd like to update the shipping address for your order #1503 to the new San Francisco location before your travel this weekend.

To ensure I've got everything correct, you would like to change the address to:
Gorgias Street 123,
San Francisco, USA

Before we go ahead and update the address, please confirm that all the details provided are accurate and that you authorize this change. Once you confirm, we'll proceed to edit the shipping address on your order and provide you with an update.

Looking forward to your confirmation.`}
                  />
                </div>
              </div>
            </div>

            <MessageComposer onSend={() => {}} />
          </main>

          <div className="w-80 border-l bg-white" />
        </div>
      </div>

      {/* Modal */}
      <div className="relative z-50">
        <SignupModal 
          isOpen={true} 
          onClose={() => {}} // Empty function to prevent closing
          canClose={false}
        />
      </div>
    </div>
  );
};