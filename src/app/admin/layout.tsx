'use client';

import { Box } from '@mui/material';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
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

  // Redirect to login if not authenticated or not an admin
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'admin') {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user, router]);

  if (!isClient || !user || user.role !== 'admin') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Loading...
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AdminSidebar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: { md: `calc(100% - 240px)` },
          ml: { md: '240px' },
          p: 0,
          m: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
