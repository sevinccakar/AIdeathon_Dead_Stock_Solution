import React from 'react';
import { LayoutDashboard, Package, BarChart3, Settings, LifeBuoy } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSettingsClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onSettingsClick }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Genel Bakış', icon: LayoutDashboard },
    { id: 'inventory', label: 'Stok Yönetimi', icon: Package },
    { id: 'analytics', label: 'Analitik', icon: BarChart3 },
  ];

  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Deadstock.AI
        </h1>
        <p className="text-xs text-slate-400 mt-1">Akıllı Envanter Yönetimi</p>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              activeTab === item.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <button 
          onClick={onSettingsClick}
          className="w-full flex items-center space-x-3 px-4 py-2 text-slate-400 hover:text-white transition-colors"
        >
          <Settings size={18} />
          <span className="text-sm">Ayarlar</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-2 text-slate-400 hover:text-white transition-colors">
          <LifeBuoy size={18} />
          <span className="text-sm">Destek</span>
        </button>
      </div>
    </div>
  );
};