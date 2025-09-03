// src/app/patient/dashboard/components/QuickActions.tsx
import React from 'react';
import { LucideIcon, ListChecks, CalendarDays, Bell, Trophy } from 'lucide-react';

interface QuickAction {
  id: number;
  title: string;
  icon: LucideIcon;
  onClick: () => void;
}

const QuickActions: React.FC = () => {
  const actions: QuickAction[] = [
    {
      id: 1,
      title: 'Pending Approvals',
      icon: ListChecks,
      onClick: () => console.log('Show Pending Approvals')
    },
    {
      id: 2,
      title: 'Upcoming Events',
      icon: CalendarDays,
      onClick: () => console.log('Show Upcoming Events')
    },
    {
      id: 3,
      title: 'Alerts',
      icon: Bell,
      onClick: () => console.log('Show Alerts')
    },
    {
      id: 4,
      title: 'Leaderboard',
      icon: Trophy,
      onClick: () => console.log('Show Leaderboard')
    }
  ];

  return (
    <div className="bg-transparent w-full">
      <h2 className="text-xl font-semibold text-blue-200 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-blue-900/30 border-2 border-blue-800/50 hover:bg-blue-800/50 hover:border-blue-500/70 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 ease-in-out transform group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-800/30 flex items-center justify-center text-blue-300 mb-2 group-hover:bg-blue-700/60 group-hover:scale-110 transition-all duration-300 ease-in-out">
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-blue-100 group-hover:text-white group-hover:font-semibold">{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;