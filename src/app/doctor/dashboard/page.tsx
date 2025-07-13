'use client';

import { Box, Container, Typography, Button, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MessageIcon from '@mui/icons-material/Message';

const mockAppointments = [
  { id: 1, patient: 'John Doe', time: '09:00 AM', type: 'Checkup' },
  { id: 2, patient: 'Jane Smith', time: '10:30 AM', type: 'Consultation' },
  { id: 3, patient: 'Sam Wilson', time: '01:00 PM', type: 'Follow-up' },
];

const mockPatients = [
  { id: 1, name: 'John Doe', lastVisit: '2025-07-10' },
  { id: 2, name: 'Jane Smith', lastVisit: '2025-07-09' },
  { id: 3, name: 'Sam Wilson', lastVisit: '2025-07-08' },
];

export default function DoctorDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Set client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect to login if not authenticated or not a doctor
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'doctor') {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user, router]);

  if (!isClient || !user || user.role !== 'doctor') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.default' }}>
      <Container
       maxWidth={false} 
        sx={{ 
          p: 3, 
          m: 0, 
          width: 'calc(100% - 80px)',
          maxWidth: '100% !important',
          ml: '40px',
          mr: '40px',
        }}
      >
        <div className="space-y-6 w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back, Dr. {user.name}!</h1>
              <p className="text-gray-600 mt-1">Here’s your dashboard overview for today.</p>
            </div>
            <div className="mt-4 md:mt-0 ml-4">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => router.push('/doctor/appointments/new')}
                sx={{ fontWeight: 600, px: 4, py: 1.5, borderRadius: 2 }}
              >
                New Appointment
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="relative">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Appointments Today */}
              <div className="relative group p-0.5 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-70 transition duration-300"></div>
                <div className="relative bg-white rounded-xl p-5 h-full flex items-center">
                  <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl p-3 shadow-md">
                    <EventNoteIcon fontSize="large" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-500">Appointments Today</h3>
                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">12</p>
                  </div>
                </div>
              </div>
              {/* Total Patients */}
              <div className="relative group p-0.5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl blur opacity-0 group-hover:opacity-70 transition duration-300"></div>
                <div className="relative bg-white rounded-xl p-5 h-full flex items-center">
                  <div className="flex-shrink-0 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl p-3 shadow-md">
                    <GroupIcon fontSize="large" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-500">Total Patients</h3>
                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500">84</p>
                  </div>
                </div>
              </div>
              {/* Pending Tasks */}
              <div className="relative group p-0.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-70 transition duration-300"></div>
                <div className="relative bg-white rounded-xl p-5 h-full flex items-center">
                  <div className="flex-shrink-0 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-xl p-3 shadow-md">
                    <AssignmentIcon fontSize="large" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-500">Pending Tasks</h3>
                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Appointments */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Appointments</h3>
                  <Button
                    onClick={() => router.push('/doctor/appointments')}
                    size="small"
                    sx={{ textTransform: 'none' }}
                  >
                    View All
                  </Button>
                </div>
                <div>
                  <List>
                    {mockAppointments.map((appt) => (
                      <ListItem key={appt.id} divider>
                        <ListItemAvatar>
                          <Avatar>
                            <EventNoteIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${appt.patient} (${appt.type})`}
                          secondary={appt.time}
                        />
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => router.push(`/doctor/appointments/${appt.id}`)}
                        >
                          Details
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </div>

              {/* Recent Patients Section */}
              <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
                <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Patients</h3>
                  <Button
                    onClick={() => router.push('/doctor/patients')}
                    size="small"
                    sx={{ textTransform: 'none' }}
                  >
                    View All
                  </Button>
                </div>
                <div>
                  <List>
                    {mockPatients.map((patient) => (
                      <ListItem key={patient.id} divider>
                        <ListItemAvatar>
                          <Avatar>
                            <GroupIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={patient.name}
                          secondary={`Last visit: ${new Date(patient.lastVisit).toLocaleDateString()}`}
                        />
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => router.push(`/doctor/patients/${patient.id}`)}
                        >
                          View
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 gap-4">
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<AddCircleOutlineIcon />}
                      onClick={() => router.push('/doctor/appointments/new')}
                      sx={{ mb: 2, textTransform: 'none' }}
                    >
                      New Appointment
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      startIcon={<AssignmentIcon />}
                      onClick={() => router.push('/doctor/tasks')}
                      sx={{ mb: 2, textTransform: 'none' }}
                    >
                      View Tasks
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      startIcon={<MessageIcon />}
                      onClick={() => router.push('/doctor/messages')}
                      sx={{ textTransform: 'none' }}
                    >
                      Messages
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
}
