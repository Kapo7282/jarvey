'use client'

import { usePathname } from 'next/navigation'
import { NavigationSidebar } from '../Navigation/NavigationSidebar'
import { Sidebar } from '../Sidebar/Sidebar'
import { CustomerInfo } from '../CustomerInfo/CustomerInfo'
import { MobileNav } from '../MobileNav'
import { TrialBanner } from '../TrialBanner'
import { SeriesABanner } from '../SeriesABanner'
import { useState } from 'react'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCustomerInfoOpen, setIsCustomerInfoOpen] = useState(false)
  const [showTrialBanner, setShowTrialBanner] = useState(true)
  const [showSeriesABanner, setShowSeriesABanner] = useState(true)
  const pathname = usePathname()

  // Only show CustomerInfo on chat pages
  const showCustomerInfo = pathname.startsWith('/chat/')
  // Only show Sidebar on ticket-related pages
  const showSidebar = pathname.startsWith('/tickets/') || pathname.startsWith('/chat/')

  return (
    <div className="min-h-screen flex">
      <NavigationSidebar />
      
      {showSidebar && (
        <div
          className={`
            fixed inset-y-0 left-16 w-64 transform lg:transform-none
            transition-transform duration-200 ease-in-out z-20 bg-white
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div className={`lg:pl-0 ${showSidebar ? 'ml-[60px] lg:ml-[320px]' : 'ml-[60px]'}`}>
          {showSeriesABanner && (
            <SeriesABanner onDismiss={() => setShowSeriesABanner(false)} />
          )}
          {showTrialBanner && (
            <TrialBanner 
              daysLeft={4} 
              progress={50}
              onDismiss={() => setShowTrialBanner(false)}
            />
          )}
        </div>

        <div className="lg:hidden">
          <MobileNav 
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>

        <main className={`flex-1 flex flex-col min-w-0 overflow-hidden relative ${
          showSidebar ? 'ml-[60px] lg:ml-[320px]' : 'ml-[60px]'
        }`}>
          {children}
        </main>

        {showCustomerInfo && (
          <div
            className={`
              fixed inset-y-0 right-0 w-80 transform lg:transform-none
              transition-transform duration-200 ease-in-out z-20 bg-white
              ${isCustomerInfoOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            `}
          >
            <CustomerInfo onClose={() => setIsCustomerInfoOpen(false)} />
          </div>
        )}

        {(isSidebarOpen || (isCustomerInfoOpen && showCustomerInfo)) && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-10"
            onClick={() => {
              setIsSidebarOpen(false)
              setIsCustomerInfoOpen(false)
            }}
          />
        )}
      </div>
    </div>
  )
}