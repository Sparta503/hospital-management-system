// src/app/patient/dashboard/components/QuickActions.tsx
import React from 'react';
import { ListChecks, CalendarDays, Bell, Trophy, LucideProps } from 'lucide-react';

interface QuickAction {
  id: number;
  title: string;
  icon: React.ComponentType<LucideProps>;
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
    <div className="bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-blue-800/10 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-blue-400/20 overflow-hidden group/container">
      <h2 className="text-xl font-semibold text-blue-200 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center p-5 rounded-2xl bg-black/40 border border-blue-400/20 
            hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-blue-600/20 hover:border-blue-300/60 
            hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 transform transition-all duration-300 
            group-hover:scale-[0.98] hover:!scale-100 relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500/30 backdrop-blur-sm flex items-center justify-center text-blue-200 mb-4 
            group-hover:bg-blue-500/50 group-hover:shadow-inner group-hover:shadow-blue-400/30
            transition-all duration-300 transform group-hover:scale-110">
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-blue-100 group-hover:text-white text-center relative z-10">{action.title}</span>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-600/0 to-blue-400/20 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;