import React from 'react';
import { ChatHeader } from '../components/Chat/ChatHeader';
import { ChatMessage } from '../components/Chat/ChatMessage';
import { MessageComposer } from '../components/Chat/MessageComposer';
import { MessageList } from '../components/Chat/MessageList';
import { CustomerInfo } from '../components/CustomerInfo/CustomerInfo';
import { useParams } from 'react-router-dom';

export const Chat: React.FC = () => {
  const { id } = useParams();

  // Mock data - replace with real API call
  const messages = [
    {
      id: '1',
      title: 'Change my shipping address',
      preview: 'Hey support, I was traveling this...',
      sender: 'Marco D',
      time: '2h ago',
      unread: true
    },
    {
      id: '2',
      title: 'Refund request',
      preview: 'I would like to request a refund...',
      sender: 'Sarah J',
      time: '3h ago'
    },
    {
      id: '3',
      title: 'Product question',
      preview: 'Does this come in blue?',
      sender: 'Tom W',
      time: '5h ago'
    }
  ];

  const chatData = {
    title: "Change my shipping address",
    orderNumber: "Order #2631",
    tags: [
      { text: "Active Subscriber", color: "bg-blue-100 text-blue-800" },
      { text: "AI Agent Responded", color: "bg-green-100 text-green-800" },
      { text: "+2", color: "text-gray-500" }
    ],
    messages: [
      {
        sender: "Marco D",
        timestamp: "12:31 PM",
        content: `Hey support,
I as traveling this weekend to my parent's house in San Francisco.
Their address is:`
      },
      {
        sender: "AI Agent",
        timestamp: "12:31 PM",
        isAI: true,
        content: `Hello,
Thank you for letting us know about the change needed for your shipping address. From what I understand, you'd like to update the shipping address for your order #1503 to the new San Francisco location before your travel this weekend.

To ensure I've got everything correct, you would like to change the address to:
Gorgias Street 123,
San Francisco, USA

Before we go ahead and update the address, please confirm that all the details provided are accurate and that you authorize this change. Once you confirm, we'll proceed to edit the shipping address on your order and provide you with an update.

Looking forward to your confirmation.`
      }
    ]
  };

  const handleSendMessage = (content: string, attachments: File[]) => {
    console.log('Sending message:', content, attachments);
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Messages sidebar - fixed width */}
      <div className="w-[280px] flex-shrink-0">
        <MessageList messages={messages} activeId={id} />
      </div>
      
      {/* Chat area - flexible width */}
      <div className="flex-1 flex flex-col min-w-[500px]">
        <ChatHeader
          title={chatData.title}
          orderNumber={chatData.orderNumber}
          tags={chatData.tags}
        />
        
        <div className="flex-1 min-h-0 relative">
          <div className="absolute inset-0 overflow-y-auto">
            <div className="max-w-3xl mx-auto py-3 px-2">
              <div className="space-y-3">
                <div className="text-center">
                  <span className="inline-block px-2 py-0.5 text-xs font-medium text-gray-500 bg-white rounded-full border">
                    FRI, OCT 18
                  </span>
                </div>
                
                {chatData.messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    sender={message.sender}
                    timestamp={message.timestamp}
                    content={message.content}
                    isAI={message.isAI}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="max-w-3xl mx-auto">
            <MessageComposer onSend={handleSendMessage} />
          </div>
        </div>
      </div>

      {/* Customer info sidebar - fixed width */}
      <div className="w-[320px] flex-shrink-0">
        <CustomerInfo />
      </div>
    </div>
  );
};