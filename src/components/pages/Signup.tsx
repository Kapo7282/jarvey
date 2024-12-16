'use client'

import { SignupModal } from '../Auth/SignupModal'
import { useRouter } from 'next/navigation'
import { ChatHeader } from '../Chat/ChatHeader'
import { ChatMessage } from '../Chat/ChatMessage'
import { MessageComposer } from '../Chat/MessageComposer'

export function SignupPage() {
  const router = useRouter()

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
Thank you for letting us know about the change needed for your shipping address...`}
                  />
                </div>
              </div>
            </div>

            <MessageComposer onSend={() => {}} />
          </main>
        </div>
      </div>

      {/* Modal */}
      <div className="relative z-50">
        <SignupModal 
          isOpen={true} 
          onClose={() => {}} 
          canClose={false}
        />
      </div>
    </div>
  )
}