import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: React.ElementType;
  colorClass: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, trend, trendUp, icon: Icon, colorClass }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        {trend && (
          <div className={`flex items-center mt-2 text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            <span>{trend}</span>
            <span className="ml-1 text-slate-400">vs geçen ay</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
        <Icon className={colorClass.replace('bg-', 'text-')} size={24} />
      </div>
    </div>
  );
};