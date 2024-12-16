import React from 'react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const ConnectEmail: React.FC = () => {
  const navigate = useNavigate();

  const handleGmailConnect = () => {
    // Implement Gmail OAuth flow
    window.location.href = '/api/auth/gmail';
  };

  const handleOutlookConnect = () => {
    // Implement Outlook OAuth flow
    window.location.href = '/api/auth/outlook';
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Button
          variant="ghost"
          className="mb-8 -ml-4"
          onClick={() => navigate('/')}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Setup
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Connect Your Support Email
          </h1>
          <p className="text-gray-600">
            Choose your email provider to connect your support inbox
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="space-y-4">
            <Button
              className="w-full flex items-center justify-center gap-3 h-12"
              onClick={handleGmailConnect}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"/>
              </svg>
              Connect with Gmail
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <Button
              variant="secondary"
              className="w-full flex items-center justify-center gap-3 h-12"
              onClick={handleOutlookConnect}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.18 3H2.82C1.27 3 0 4.27 0 5.82v12.36C0 19.73 1.27 21 2.82 21h18.36c1.55 0 2.82-1.27 2.82-2.82V5.82C24 4.27 22.73 3 21.18 3zm-8.45 3.91h7.36v2.73h-7.36V6.91zm0 4.09h7.36v2.73h-7.36v-2.73zm0 4.09h7.36v2.73h-7.36v-2.73zM3.91 6.91h5.45v2.73H3.91V6.91zm0 4.09h5.45v2.73H3.91v-2.73zm0 4.09h5.45v2.73H3.91v-2.73z"/>
              </svg>
              Connect with Outlook
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              By connecting your email, you agree to our{' '}
              <a href="#" className="text-purple-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-purple-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              Why connect your email?
            </h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Manage all customer inquiries in one place</li>
              <li>• Automate responses with AI assistance</li>
              <li>• Track response times and performance</li>
              <li>• Collaborate with your team efficiently</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};