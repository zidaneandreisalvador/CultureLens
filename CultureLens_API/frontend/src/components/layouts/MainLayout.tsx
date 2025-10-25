import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation } from '../ui/BottomNavigation';
interface MainLayoutProps {
  onLogout: () => void;
}
export const MainLayout = ({
  onLogout
}: MainLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Determine active tab based on current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/search') return 'search';
    if (path === '/buddy') return 'buddy';
    if (path === '/guide') return 'guide';
    if (path === '/account') return 'account';
    return 'home'; // Default to home
  };
  const handleTabChange = (tab: string) => {
    switch (tab) {
      case 'home':
        navigate('/');
        break;
      case 'search':
        navigate('/search');
        break;
      case 'buddy':
        navigate('/buddy');
        break;
      case 'guide':
        navigate('/guide');
        break;
      case 'account':
        navigate('/account');
        break;
      default:
        navigate('/');
    }
  };
  return <div className="min-h-screen max-w-md mx-auto bg-[#fef7e0] flex flex-col">
      <main className="flex-1 overflow-y-auto pb-16">
        <Outlet />
      </main>
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        <BottomNavigation activeTab={getActiveTab()} onTabChange={handleTabChange} />
      </footer>
    </div>;
};