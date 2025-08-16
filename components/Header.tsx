
import React from 'react';
import type { View } from '../App';
import { Icons } from './Icons';

interface HeaderProps {
  activeView: View;
  setView: (view: View) => void;
}

const NavButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const Header: React.FC<HeaderProps> = ({ activeView, setView }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Icons.logo className="h-8 w-8 text-blue-600" />
            <h1 className="ml-3 text-xl font-bold text-gray-800 tracking-tight">Friction Detector</h1>
          </div>
          <nav className="flex items-center space-x-2 p-1 bg-gray-100 rounded-lg">
            <NavButton
              label="Live Simulation"
              icon={<Icons.simulation className="h-5 w-5" />}
              isActive={activeView === 'simulation'}
              onClick={() => setView('simulation')}
            />
            <NavButton
              label="Analytics Dashboard"
              icon={<Icons.dashboard className="h-5 w-5" />}
              isActive={activeView === 'dashboard'}
              onClick={() => setView('dashboard')}
            />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
