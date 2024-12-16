import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { NavigationSidebar } from './components/Navigation/NavigationSidebar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { CustomerInfo } from './components/CustomerInfo/CustomerInfo';
import { MobileNav } from './components/MobileNav';
import { Home } from './pages/Home';
import { ConnectEmail } from './pages/ConnectEmail';
import { ConnectStore } from './pages/ConnectStore';
import { Tickets } from './pages/Tickets';
import { Chat } from './pages/Chat';
import { Messages } from './pages/Messages';
import { SignupPage } from './pages/Signup';
import { BillingSettings } from './components/Settings/BillingSettings';
import { TrialBanner } from './components/TrialBanner';
import { SeriesABanner } from './components/SeriesABanner';

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCustomerInfoOpen, setIsCustomerInfoOpen] = useState(false);
  const [showTrialBanner, setShowTrialBanner] = useState(true);
  const [showSeriesABanner, setShowSeriesABanner] = useState(true);
  const location = useLocation();

  // Only show CustomerInfo on chat pages
  const showCustomerInfo = location.pathname.startsWith('/chat/');
  // Only show Sidebar on ticket-related pages
  const showSidebar = location.pathname.startsWith('/tickets/') || location.pathname.startsWith('/chat/');

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connect-email" element={<ConnectEmail />} />
            <Route path="/connect-store" element={<ConnectStore />} />
            <Route path="/tickets/*" element={<Tickets />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings/*" element={<BillingSettings />} />
          </Routes>
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
              setIsSidebarOpen(false);
              setIsCustomerInfoOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;