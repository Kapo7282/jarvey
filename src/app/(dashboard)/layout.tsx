'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  // if (!session?.user) {
  //   router.replace('/login')
  //   return <div>Redirecting...</div>
  // }

  return (
    <DashboardLayout>{children}</DashboardLayout>
  )
}