'use client'

import { Button } from '../ui/button'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export function ConnectStore() {
  const router = useRouter()

  const handleConnectShopify = () => {
    window.location.href = 'https://apps.shopify.com/jarvey'
  }

  return (
    <div className="flex-1 min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Button
          variant="ghost"
          className="mb-8 -ml-4"
          onClick={() => router.push('/')}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Setup
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Connect Your Shopify Store
          </h1>
          <p className="text-gray-600">
            Connect your Shopify store to access customer data and manage orders directly from Jarvey
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <img 
                src="https://cdn.shopify.com/s/files/1/0557/8140/3581/files/shopify-icon.svg" 
                alt="Shopify" 
                className="w-8 h-8"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Shopify</h3>
              <p className="text-sm text-gray-500">E-commerce platform</p>
            </div>
          </div>

          <Button
            className="w-full mb-6"
            onClick={handleConnectShopify}
          >
            Connect Shopify
          </Button>

          <div className="space-y-4 text-sm text-gray-600">
            <p>By connecting your store, you'll be able to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>View customer order history and details</li>
              <li>Update order information directly</li>
              <li>Access customer profiles and data</li>
              <li>Manage shipping and tracking</li>
              <li>Handle refunds and returns</li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              Why connect your store?
            </h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Access customer and order data instantly</li>
              <li>• Automate responses based on order status</li>
              <li>• Manage orders without switching tabs</li>
              <li>• Provide faster, more accurate support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}