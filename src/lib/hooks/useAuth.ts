'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/constants/routes'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check')
        if (!response.ok) {
          throw new Error('Not authenticated')
        }
        setIsAuthenticated(true)
      } catch (error) {
        router.push(ROUTES.SIGNUP)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const signOut = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' })
      router.push(ROUTES.SIGNUP)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return {
    isAuthenticated,
    isLoading,
    signOut
  }
}