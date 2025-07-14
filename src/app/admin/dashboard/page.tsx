'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!user) router.push('/login');
    else if (user.role !== 'admin') router.push(`/${user.role}/dashboard`);
  }, [user, router]);

  if (!isMounted || !user || user.role !== 'admin') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
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
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome, {user.name}! You are logged in as an administrator.
      </Typography>

      {/* Stats Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <AdminPanelSettingsIcon color="primary" fontSize="large" />
          <Box>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>1,234</Typography>
          </Box>
        </Paper>
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <GroupIcon color="success" fontSize="large" />
          <Box>
            <Typography variant="h6">Active Staff</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>56</Typography>
          </Box>
        </Paper>
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <EventNoteIcon color="warning" fontSize="large" />
          <Box>
            <Typography variant="h6">Appointments Today</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>87</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AssignmentIcon />}
            onClick={() => router.push('/admin/users')}
          >
            Manage Users
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<GroupIcon />}
            onClick={() => router.push('/admin/staff')}
          >
            Manage Staff
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<EventNoteIcon />}
            onClick={() => router.push('/admin/appointments')}
          >
            View Appointments
          </Button>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          System Overview
        </Typography>
        <Typography color="text.secondary">
          {/* Add more admin-specific content, charts, or tables here */}
          Here you can manage users, staff, appointments, and view system analytics.
        </Typography>
      </Paper>
    </Container>
  );
}
