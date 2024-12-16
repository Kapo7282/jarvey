'use client'

import { Providers } from '@/components/providers'

export function RootProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <Providers>{children}</Providers>
}