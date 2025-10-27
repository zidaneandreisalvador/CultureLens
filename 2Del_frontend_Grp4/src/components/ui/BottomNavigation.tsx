import React from 'react';
import { HomeIcon, SearchIcon, MessageSquareIcon, BookOpenIcon, UserIcon } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, active = false, onClick }: NavItemProps) => (
  <button
    className={`flex flex-col items-center ${
      active ? 'text-[#744a32] bg-[#e8dcc6] p-2 rounded-lg relative' : 'text-[#8b7355] hover:text-[#744a32]'
    }`}
    onClick={onClick}
    aria-label={label}
    aria-current={active ? 'page' : undefined}
  >
    <div className="mb-1">{icon}</div>
    <span className="text-xs font-semibold font-serif">{label}</span>
    {active && <div className="absolute -bottom-1 w-1.5 h-1.5 bg-[#744a32] rounded-full"></div>}
  </button>
);

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const user = localStorage.getItem('user');
  const isAdmin = user ? JSON.parse(user).role === 'Admin' : false;

  return (
    <nav className="bg-[#fefcf0] border-t border-[#d4c4a8] p-4 flex justify-around items-center w-full max-w-md shadow-lg">
      <NavItem
        icon={<HomeIcon size={20} />}
        label="Home"
        active={activeTab === 'home'}
        onClick={() => onTabChange('home')}
      />
      <NavItem
        icon={<SearchIcon size={20} />}
        label="Search"
        active={activeTab === 'search'}
        onClick={() => onTabChange('search')}
      />
      <NavItem
        icon={<MessageSquareIcon size={20} />}
        label="Buddy"
        active={activeTab === 'buddy'}
        onClick={() => onTabChange('buddy')}
      />
      <NavItem
        icon={<BookOpenIcon size={20} />}
        label="Guide"
        active={activeTab === 'guide'}
        onClick={() => onTabChange('guide')}
      />
      <NavItem
        icon={<UserIcon size={20} />}
        label="Profile"
        active={activeTab === 'account'}
        onClick={() => onTabChange('account')}
      />
    </nav>
  );
};
