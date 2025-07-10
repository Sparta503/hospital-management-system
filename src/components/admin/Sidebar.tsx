'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import the shared Sidebar component
const Sidebar = dynamic(
  () => import('@/components/shared/Sidebar'),
  { ssr: false }
);

/**
 * Admin-specific Sidebar component that uses the shared Sidebar
 */
export default function AdminSidebar() {
  return <Sidebar role="admin" />;
}
