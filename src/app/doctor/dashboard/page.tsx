'use client';

import { Box, Container, Typography, Paper, useTheme } from '@mui/material';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DoctorSidebar from '@/components/doctor/Sidebar';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const theme = useTheme();
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
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <DoctorSidebar />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          width: { md: `calc(100% - 240px)` },
          ml: { md: '240px' },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Doctor Dashboard
          </Typography>
          
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              mb: 4,
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Welcome, Dr. {user.name}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              You are logged in as a doctor. Here&apos;s a quick overview of your dashboard.
            </Typography>
          </Paper>

          {/* Add more dashboard components here */}
          <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Appointments Today
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                12
              </Typography>
            </Paper>
            
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Total Patients
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                84
              </Typography>
            </Paper>
            
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Pending Tasks
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                5
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
