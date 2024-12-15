'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import { validatePassword } from '@/lib/utils/validation'
import Image from 'next/image'
import Link from 'next/link'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  canClose?: boolean
}

export function SignupModal({ 
  isOpen, 
  onClose,
  canClose = true 
}: SignupModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
  })

  const [validationErrors, setValidationErrors] = useState({
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    hasMinLength: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name === 'password') {
      setValidationErrors(validatePassword(value))
    }
  }

  const handleNext = () => {
    setStep(2)
  }

  const handleGoogleSignup = () => {
    // Implement Google OAuth
    console.log('Google signup')
  }

  const allValidationsPassed = Object.values(validationErrors).every(Boolean)
  const isFormValid = formData.email && formData.fullName && formData.password && allValidationsPassed

  return (
    <Dialog.Root open={isOpen} onOpenChange={canClose ? onClose : undefined}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-md bg-white rounded-lg shadow-xl p-6 z-50">
          <Dialog.Title asChild>
            <VisuallyHidden>Create your account</VisuallyHidden>
          </Dialog.Title>

          <div className="flex flex-col items-center mb-6">
            <Image 
              src="/logo.svg" 
              alt="Jarvey" 
              width={150}
              height={40}
              className="mb-8"
            />
            <div className="flex items-center gap-2">
              <span className="bg-gray-100 text-gray-600 text-sm px-2 py-0.5 rounded">
                {step}/2
              </span>
              <h2 className="text-2xl font-semibold">Create your account</h2>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="jane@mystore.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className={`text-xs ${validationErrors.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                  ✓ A lowercase letter
                </div>
                <div className={`text-xs ${validationErrors.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                  ✓ A number
                </div>
                <div className={`text-xs ${validationErrors.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                  ✓ A capital (uppercase) letter
                </div>
                <div className={`text-xs ${validationErrors.hasMinLength ? 'text-green-600' : 'text-gray-500'}`}>
                  ✓ Minimum 14 characters
                </div>
              </div>
            </div>

            <Button 
              className="w-full bg-[#F8A39D] hover:bg-[#F69187] text-black font-normal"
              onClick={handleNext}
              disabled={!isFormValid}
            >
              Next
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <Button
              variant="default"
              className="w-full"
              onClick={handleGoogleSignup}
            >
              <Image 
                src="/google.svg" 
                alt="Google" 
                width={20} 
                height={20}
                className="mr-2"
              />
              Sign up with Google
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Already have a Gorgias account? </span>
              <Link href="/login" className="text-purple-600 hover:underline">
                Log in
              </Link>
            </div>

            <div className="text-center text-xs text-gray-500">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-purple-600 hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>

          <Dialog.Description className="sr-only">
            Create a new account by providing your email, full name, and password, or sign up with Google.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}