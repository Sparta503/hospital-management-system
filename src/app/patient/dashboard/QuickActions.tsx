// src/app/patient/dashboard/components/QuickActions.tsx
import React from 'react';
import { FileText, MessageSquare, Plus } from 'lucide-react';

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
      title: 'Book Appointment',
      icon: <Plus className="w-5 h-5" />,
      onClick: () => console.log('Book Appointment')
    },
    {
      id: 2,
      title: 'View Records',
      icon: <FileText className="w-5 h-5" />,
      onClick: () => console.log('View Records')
    },
    {
      id: 3,
      title: 'Message Doctor',
      icon: <MessageSquare className="w-5 h-5" />,
      onClick: () => console.log('Message Doctor')
    },
    {
      id: 4,
      title: 'Request Prescription',
      icon: <FileText className="w-5 h-5" />,
      onClick: () => console.log('Request Prescription')
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