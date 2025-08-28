'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaCalendarAlt, FaClock, FaStethoscope, FaInfoCircle, FaCheckCircle, FaPlus, FaHospitalUser } from 'react-icons/fa';

interface Appointment {
  id: number;
  title: string;
  doctor: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'declined';
  type: 'checkup' | 'follow-up' | 'consultation' | 'procedure';
  notes?: string;
  imageUrl?: string;
}


const appointmentsData: Appointment[] = [
  {
    id: 1,
    title: 'Annual Physical Exam',
    doctor: 'Dr. Sarah Johnson',
    date: '2023-08-30',
    time: '10:00 AM',
    status: 'pending',
    type: 'checkup',
    notes: 'Routine annual checkup',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    title: 'Follow-up Consultation',
    doctor: 'Dr. Michael Chen',
    date: '2023-08-31',
    time: '2:30 PM',
    status: 'pending',
    type: 'follow-up',
    notes: 'Follow up on blood test results',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    title: 'Dermatology Consultation',
    doctor: 'Dr. Robert Chen',
    date: '2023-09-02',
    time: '9:15 AM',
    status: 'pending',
    type: 'consultation',
    notes: 'Skin condition evaluation',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8a25d00?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 4,
    title: 'Physical Therapy',
    doctor: 'Dr. Jennifer Lee',
    date: '2023-09-05',
    time: '3:45 PM',
    status: 'accepted',
    type: 'procedure',
    notes: 'Knee rehabilitation session',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c6e2ba0c50b1?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 5,
    title: 'Cardiology Checkup',
    doctor: 'Dr. David Kim',
    date: '2023-09-10',
    time: '11:30 AM',
    status: 'accepted',
    type: 'checkup',
    notes: 'Annual heart health check',
    imageUrl: 'https://images.unsplash.com/photo-1551076805-e4c3dab1407a?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 6,
    title: 'Eye Examination',
    doctor: 'Dr. Lisa Wong',
    date: '2023-09-12',
    time: '2:00 PM',
    status: 'pending',
    type: 'checkup',
    notes: 'Comprehensive eye exam',
    imageUrl: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 7,
    title: 'Pediatric Checkup',
    doctor: 'Dr. Maria Garcia',
    date: '2023-09-15',
    time: '10:45 AM',
    status: 'declined',
    type: 'checkup',
    notes: 'Child wellness visit',
    imageUrl: 'https://images.unsplash.com/photo-1551190820-a2333f6a46a3?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 8,
    title: 'Orthopedic Consultation',
    doctor: 'Dr. James Wilson',
    date: '2023-09-18',
    time: '1:30 PM',
    status: 'pending',
    type: 'consultation',
    notes: 'Back pain evaluation',
    imageUrl: 'https://images.unsplash.com/photo-1599045118108-bb99543c1c17?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 9,
    title: 'Nutrition Counseling',
    doctor: 'Dr. Rachel Adams',
    date: '2023-09-20',
    time: '4:15 PM',
    status: 'accepted',
    type: 'consultation',
    notes: 'Diet and nutrition planning',
    imageUrl: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 10,
    title: 'Dental Checkup',
    doctor: 'Dr. Emily Wilson',
    date: '2023-09-22',
    time: '11:15 AM',
    status: 'pending',
    type: 'checkup',
    notes: 'Regular dental cleaning and checkup',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=200&q=80'
  },
];

const INITIAL_VISIBLE = 3;
const EXPANDED_VISIBLE = 10;
const INITIAL_MAX_HEIGHT = '350px';
const EXPANDED_MAX_HEIGHT = '600px';

const AdminAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(appointmentsData);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [maxHeight, setMaxHeight] = useState(INITIAL_MAX_HEIGHT);
  const containerRef = useRef<HTMLDivElement>(null);

  const showMore = () => {
    setVisibleCount(EXPANDED_VISIBLE);
    setMaxHeight(EXPANDED_MAX_HEIGHT);
  };

  const showLess = () => {
    setVisibleCount(INITIAL_VISIBLE);
    setMaxHeight(INITIAL_MAX_HEIGHT);
  };

  useEffect(() => {
    if (visibleCount === EXPANDED_VISIBLE) {
      setMaxHeight(EXPANDED_MAX_HEIGHT);
    } else {
      setMaxHeight(INITIAL_MAX_HEIGHT);
    }
  }, [visibleCount]);


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'checkup':
        return 'bg-purple-100 text-purple-800';
      case 'follow-up':
        return 'bg-yellow-100 text-yellow-800';
      case 'consultation':
        return 'bg-indigo-100 text-indigo-800';
      case 'procedure':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-6 bg-gradient-to-br from-blue-700 to-blue-900 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-6 mt-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FaHospitalUser className="inline-block text-blue-200 text-3xl drop-shadow" />
            My Appointments
          </h1>
          <button 
            onClick={() => {}}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition flex items-center gap-2 hover:scale-105 transform"
          >
            <FaPlus className="inline-block" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Shifted Up: mb-8 mt-0 -> mb-6 mt-0 */}
        <div className="relative rounded-lg shadow bg-black mb-6 mt-0 group">
          <div className="absolute -top-2 -left-2 z-20 w-12 h-12 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-full h-full rounded-tl-2xl shadow-2xl shadow-blue-400/60" />
          </div>
          <div className="overflow-x-hidden">
            <div
              className="transition-all duration-500"
              style={{
                maxHeight,
                minHeight: '0px'
              }}
              ref={containerRef}
            >
              <table className="min-w-full text-white">
                <thead className="sticky top-0 bg-blue-800 z-10">
                  <tr>
                    <th className="py-3 px-4 text-left rounded-tl-lg w-16">
                      <span className="flex items-center gap-2">
                        <FaUser className="inline-block text-blue-300" />
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <span className="flex items-center gap-2">
                        <FaCalendarAlt className="inline-block text-blue-300" />
                        <span>Date</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <span className="flex items-center gap-2">
                        <FaClock className="inline-block text-blue-300" />
                        <span>Time</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <span className="flex items-center gap-2">
                        <FaStethoscope className="inline-block text-blue-300" />
                        <span>Doctor</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <span className="flex items-center gap-2">
                        <FaInfoCircle className="inline-block text-blue-300" />
                        <span>Appointment Type</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <span className="flex items-center gap-2">
                        <FaInfoCircle className="inline-block text-blue-300" />
                        <span>Notes</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left rounded-tr-lg">
                      <span className="flex items-center gap-2">
                        <FaCheckCircle className="inline-block text-blue-300" />
                        <span>Status</span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.slice(0, visibleCount).map((appointment, idx) => (
                    <tr
                      key={appointment.id}
                      className={`border-b last:border-b-0 ${idx % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} hover:bg-gray-700 hover:scale-[1.01] transition-all duration-200 transform`}
                    >
                      <td className="py-3 px-4 text-center">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        <FaUser className="text-lg" />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {new Date(appointment.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                      <td className="py-3 px-4">{appointment.time}</td>
                      <td className="py-3 px-4 font-medium">{appointment.doctor}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeBadge(appointment.type)}`}>
                          {appointment.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-300">
                        {appointment.notes || 'No additional notes'}
                      </td>
                      <td className="py-3 px-4">
                        {appointment.status === 'pending' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setAppointments(prev => prev.map(a => 
                                  a.id === appointment.id ? { ...a, status: 'accepted' } : a
                                ));
                              }}
                              className="px-3 py-1 bg-green-500 text-white rounded-full text-xs hover:bg-green-600 transition"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => {
                                setAppointments(prev => prev.map(a => 
                                  a.id === appointment.id ? { ...a, status: 'declined' } : a
                                ));
                              }}
                              className="px-3 py-1 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition"
                            >
                              Decline
                            </button>
                          </div>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {visibleCount === EXPANDED_VISIBLE && appointments.length > EXPANDED_VISIBLE &&
                    appointments.slice(EXPANDED_VISIBLE, appointments.length).map((appointment, idx) => (
                      <tr
                        key={appointment.id}
                        className={`border-b last:border-b-0 ${(EXPANDED_VISIBLE + idx) % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} hover:bg-gray-700 hover:scale-[1.01] transition-all duration-200 transform`}
                      >
                        <td className="py-3 px-4 font-medium">
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td className="py-3 px-4">{appointment.time}</td>
                        <td className="py-3 px-4 font-medium">{appointment.doctor}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeBadge(appointment.type)}`}>
                            {appointment.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-300">
                          {appointment.notes || 'No additional notes'}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center p-4 bg-black">
            {appointments.length > INITIAL_VISIBLE && (
              visibleCount < EXPANDED_VISIBLE ? (
                <button
                  onClick={showMore}
                  className="px-6 py-2 bg-blue-900 text-white rounded-lg shadow hover:bg-blue-800 transition"
                >
                  Show More
                </button>
              ) : (
                <button
                  onClick={showLess}
                  className="px-6 py-2 bg-blue-300 text-blue-900 rounded-lg shadow hover:bg-blue-400 transition"
                >
                  Show Less
                </button>
              )
            )}
          </div>
        </div>

        <div className="mt-10 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Upcoming Appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments
              .filter(a => a.status === 'pending' || a.status === 'accepted')
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 3)
              .map(appointment => (
                <div key={appointment.id} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white">{appointment.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <FaStethoscope className="text-blue-300" />
                      {appointment.doctor}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <FaCalendarAlt className="text-blue-300" />
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </div>
                  </div>
                  {appointment.notes && (
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                      {appointment.notes}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAppointments;