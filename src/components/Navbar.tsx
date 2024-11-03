import React from 'react';
import { Moon, BookOpen, Users, User } from 'lucide-react';

interface NavbarProps {
  activeTab: 'personal' | 'community';
  onTabChange: (tab: 'personal' | 'community') => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full bg-purple-950 shadow-lg z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Moon className="w-8 h-8 text-purple-400" />
            <span className="ml-2 text-xl font-semibold text-white">Dreamscape AI</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onTabChange('personal')}
              className={`p-2 transition-colors ${
                activeTab === 'personal' 
                  ? 'text-white bg-purple-800 rounded-lg' 
                  : 'text-purple-400 hover:text-purple-300'
              }`}
            >
              <BookOpen className="w-6 h-6" />
            </button>
            <button 
              onClick={() => onTabChange('community')}
              className={`p-2 transition-colors ${
                activeTab === 'community' 
                  ? 'text-white bg-purple-800 rounded-lg' 
                  : 'text-purple-400 hover:text-purple-300'
              }`}
            >
              <Users className="w-6 h-6" />
            </button>
            <button className="p-2 text-purple-400 hover:text-purple-300 transition-colors">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}