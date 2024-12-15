import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { TRPCProvider } from './providers'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Customer Support Dashboard',
  description: 'AI-powered customer support dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <TRPCProvider>
            {children}
          </TRPCProvider>
        </SessionProvider>
      </body>
    </html>
  )
}