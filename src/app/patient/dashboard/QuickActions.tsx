// src/app/patient/dashboard/QuickActions.tsx
import React from 'react';
import { ListChecks, CalendarDays, Bell, Trophy, Stethoscope } from 'lucide-react';

const QuickActions: React.FC = () => {
  const quickActions = [
    { 
      id: 1, 
      title: 'Pending Approvals', 
      icon: ListChecks, 
      color: 'bg-blue-100 text-blue-600',
      onClick: () => console.log('Show Pending Approvals') 
    },
    { 
      id: 2, 
      title: 'Upcoming Events', 
      icon: CalendarDays, 
      color: 'bg-green-100 text-green-600',
      onClick: () => console.log('Show Upcoming Events') 
    },
    { 
      id: 3, 
      title: 'Alerts', 
      icon: Bell, 
      color: 'bg-purple-100 text-purple-600',
      onClick: () => console.log('Show Alerts') 
    },
    { 
      id: 4, 
      title: 'Leaderboard', 
      icon: Trophy, 
      color: 'bg-yellow-100 text-yellow-600',
      onClick: () => console.log('Show Leaderboard') 
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 w-full transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:bg-white/20">
      <h2 className="text-lg font-semibold text-white mb-6 flex items-center group">
        <Stethoscope className="w-5 h-5 mr-2 text-white transition-transform duration-300 group-hover:scale-110" />
        <span className="relative">
          Quick Actions
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
        </span>
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action) => {
          const baseColor = action.color.split('-')[1];
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`
                relative overflow-hidden group/btn
                flex flex-col items-center justify-center p-4 rounded-xl 
                bg-${baseColor}-500/20 hover:bg-${baseColor}-600/30 
                transition-all duration-300 backdrop-blur-sm
                border border-white/10 hover:border-${baseColor}-400/30
                transform hover:-translate-y-1 hover:shadow-lg hover:shadow-${baseColor}-500/20
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <action.icon className={`w-5 h-5 mb-2 text-white transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:text-${baseColor}-300`} />
                <span className={`text-xs font-medium text-white group-hover/btn:text-${baseColor}-100 transition-colors duration-300`}>
                  {action.title}
                </span>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-${baseColor}-400 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left`}></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;