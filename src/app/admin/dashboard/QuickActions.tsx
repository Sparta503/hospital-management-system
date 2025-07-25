// src/app/patient/dashboard/components/QuickActions.tsx
import React from 'react';
import { ListChecks, CalendarDays, Bell, Trophy } from 'lucide-react';

interface QuickAction {
  id: number;
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const QuickActions: React.FC = () => {
  const actions: QuickAction[] = [
    {
      id: 1,
      title: 'Pending Approvals',
      icon: <ListChecks className="w-5 h-5" />,
      onClick: () => console.log('Show Pending Approvals')
    },
    {
      id: 2,
      title: 'Upcoming Events',
      icon: <CalendarDays className="w-5 h-5" />,
      onClick: () => console.log('Show Upcoming Events')
    },
    {
      id: 3,
      title: 'Alerts',
      icon: <Bell className="w-5 h-5" />,
      onClick: () => console.log('Show Alerts')
    },
    {
      id: 4,
      title: 'Leaderboard',
      icon: <Trophy className="w-5 h-5" />,
      onClick: () => console.log('Show Leaderboard')
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-black mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
              {action.icon}
            </div>
            <span className="text-sm font-medium text-black">{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;