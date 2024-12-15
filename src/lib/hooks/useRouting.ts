'use client'

import { useRouter, usePathname } from 'next/navigation'

export function useRouting() {
  const router = useRouter()
  const pathname = usePathname()

  return {
    router,
    pathname,
    isActive: (path: string) => pathname === path,
    navigate: (path: string) => router.push(path),
    currentPath: pathname.split('/').pop(),
  }
}