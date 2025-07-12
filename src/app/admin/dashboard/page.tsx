'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Container, Typography, useTheme, Paper } from '@mui/material';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Set client-side rendering and handle redirects
  useEffect(() => {
    setIsMounted(true);
    
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'admin') {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user, router]);

  if (!isMounted || !user || user.role !== 'admin') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
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
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Dashboard
          </Typography>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Welcome, {user.name}!
            </Typography>
            <Typography color="text.secondary">
              You are logged in as an administrator.
            </Typography>
            {/* Add admin-specific content here */}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
