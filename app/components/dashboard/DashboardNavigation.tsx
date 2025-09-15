/**
 * DashboardNavigation Component
 * 
 * Renders a horizontal navigation bar for the dashboard with buttons for each view.
 * 
 * Props:
 * - activeView: the currently selected view ('dashboard' | 'complaints' | 'in_progress' | 'reviewed').
 * - onViewChange: callback function triggered when a navigation button is clicked.
 * 
 * Client-side only:
 * - Handles button click events and dynamic styling based on the active view.
 */
"use client";

import { Home, List, FileText, Clock } from 'lucide-react';

interface DashboardNavigationProps {
  activeView: 'dashboard' | 'complaints' | 'in_progress' | 'reviewed';
  onViewChange: (view: 'dashboard' | 'complaints' | 'in_progress' | 'reviewed') => void;
}

export const DashboardNavigation: React.FC<DashboardNavigationProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { key: 'dashboard', icon: Home, label: 'Dashboard' },
    { key: 'complaints', icon: List, label: 'Complaints' },
    { key: 'in_progress', icon: Clock, label: 'In Progress' },
    { key: 'reviewed', icon: FileText, label: 'Reviewed Complaints' },
  ] as const;

  return (
    <nav className="flex space-x-4 mb-6">
      {navItems.map(({ key, icon: Icon, label }) => (
        <button 
          key={key}
          onClick={() => onViewChange(key)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeView === key 
              ? 'bg-(--purple) bg-opacity-20 backdrop-blur-sm' 
              : 'text-white text-opacity-80 hover:bg-(--purple)/50 cursor-pointer'
          }`}
          style={{ 
            color: activeView === key ? 'var(--background)' : undefined 
          }}
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
};