'use client';

import { Box } from '@mui/material';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PatientSidebar from '@/components/patient/Sidebar';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Set client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect to login if not authenticated or not a patient
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'patient') {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user, router]);

  if (!isClient || !user || user.role !== 'patient') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Loading...
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <PatientSidebar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          width: { md: `calc(100% - 240px)` },
          ml: { md: '240px' },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
