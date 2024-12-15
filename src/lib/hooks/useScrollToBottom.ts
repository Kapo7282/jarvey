'use client'

import { useEffect, useRef } from 'react'

export function useScrollToBottom(deps: any[] = []) {
  const scrollRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, deps)

  return scrollRef
}