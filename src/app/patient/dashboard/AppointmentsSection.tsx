// src/app/patient/dashboard/components/AppointmentsSection.tsx
import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface Appointment {
  id: number;
  doctor: string;
  date: string;
  time: string;
  type: string;
}

const AppointmentsSection: React.FC = () => {
  const upcomingAppointments: Appointment[] = [
    { id: 1, doctor: 'Dr. Sarah Johnson', date: '2025-07-15', time: '10:00 AM', type: 'General Checkup' },
    { id: 2, doctor: 'Dr. Michael Chen', date: '2025-07-20', time: '2:30 PM', type: 'Follow-up' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 -ml-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-black">Upcoming Appointments</h2>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </button>
      </div>
      
      {upcomingAppointments.length > 0 ? (
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-black">{appointment.doctor}</h3>
                  <p className="text-sm text-gray-600">{appointment.type}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(appointment.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })} • {appointment.time}
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No upcoming appointments</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentsSection;