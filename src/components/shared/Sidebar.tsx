'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';

import { Drawer, useMediaQuery, useTheme } from '@mui/material';
import { useSidebarStore } from '@/app/store/sidebarStore';
import { useViewStore } from '@/app/store/viewStore';
import { useAuth } from '@/app/contexts/AuthContext';

// Constants
const SIDEBAR_WIDTH = 240;
const COLLAPSED_WIDTH = 60;

type UserRole = 'patient' | 'doctor' | 'admin';

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  view: string;
  subItems?: MenuItem[];
  roles?: UserRole[];
}

interface MenuSection {
  title?: string;
  items?: MenuItem[];
  divider?: boolean;
  roles?: UserRole[];
}

const menuItems: MenuSection[] = [
  {
    items: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: <DashboardIcon />,
        view: 'dashboard',
        roles: ['patient', 'doctor', 'admin']
      },
      {
        label: 'Appointments',
        path: '/appointments',
        icon: <EventIcon />,
        view: 'appointments',
        roles: ['patient', 'doctor', 'admin']
      },
      {
        label: 'Patients',
        path: '/patients',
        icon: <PeopleIcon />,
        view: 'patients',
        roles: ['doctor', 'admin']
      },
      {
        label: 'Medical Records',
        path: '/medical-records',
        icon: <DescriptionIcon />,
        view: 'medical-records',
        roles: ['patient', 'doctor']
      },
      {
        label: 'Users',
        path: '/users',
        icon: <PeopleIcon />,
        view: 'users',
        roles: ['admin']
      }
    ]
  },
  {
    divider: true,
    roles: ['patient', 'doctor', 'admin']
  },
  {
    title: 'Account',
    items: [
      {
        label: 'Settings',
        path: '/settings',
        icon: <SettingsIcon />,
        view: 'settings',
        roles: ['patient', 'doctor', 'admin']
      },
      {
        label: 'Logout',
        path: '/logout',
        icon: <LogoutIcon />,
        view: 'logout',
        roles: ['patient', 'doctor', 'admin']
      }
    ]
  }
];

interface SidebarProps {
  role: UserRole;
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const { logout } = useAuth();
  const setActiveView = useViewStore((state) => state.setActiveView);
  const [mounted, setMounted] = useState(false);
  const [filteredMenu, setFilteredMenu] = useState<MenuSection[]>([]);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const mobileOpen = useSidebarStore((state) => state.mobileOpen);
  const collapsed = useSidebarStore((state) => state.collapsed);
  const toggleMobileOpen = useSidebarStore((state) => state.toggleMobileOpen);
  const toggleCollapsed = useSidebarStore((state) => state.toggleCollapsed);
  const setCollapsed = useSidebarStore((state) => state.setCollapsed);

  useEffect(() => {
    setMounted(true);
    
    // Filter menu items based on user role
    const filtered = menuItems.map(section => ({
      ...section,
      items: section.items?.filter(item => !item.roles || item.roles.includes(role))
    })).filter(section => 
      !section.roles || section.roles.includes(role)
    );
    
    setFilteredMenu(filtered);
  }, [role]);

  useEffect(() => {
    if (mounted && isMobile) {
      setCollapsed(false);
    }
  }, [isMobile, mounted, setCollapsed]);

  const handleDrawerToggle = () => {
    toggleMobileOpen();
  };

  const handleItemClick = (view: string, path: string) => {
    if (path === '/logout') {
      logout();
      router.push('/login');
      return;
    }
    
    // Add role prefix to the path if not already present
    const rolePath = `/${role}${path}`;
    setActiveView(view);
    router.push(rolePath);
    
    if (isMobile) {
      toggleMobileOpen();
    }
  };

  const getPortalIcon = (role: UserRole) => {
    switch (role) {
      case 'patient':
        return <PersonIcon sx={{ mr: 1, color: 'error.main' }} />; // single person for patient
      case 'doctor':
        return <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />; // group for doctor
      case 'admin':
        return <SecurityIcon sx={{ mr: 1, color: 'warning.main' }} />;
      default:
        return null;
    }
  };

  const drawerContent = (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        bgcolor: 'black', // <-- Set sidebar background to black
        color: 'white',   // <-- Set default text color to white
        pt: 10, // Keep this for top padding
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: collapsed ? 'center' : 'space-between', 
          p: 2,
          minHeight: 64,
        }}
      >
        {!collapsed && (
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            {getPortalIcon(role)}
            {role.charAt(0).toUpperCase() + role.slice(1)} Portal
          </Typography>
        )}
        <IconButton
          onClick={toggleCollapsed}
          size="small"
          sx={{
            color: 'white', // <-- Make the toggle icon white
          }}
        >
          {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider sx={{ my: 2}} /> {/* Increase vertical margin here */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {filteredMenu.map((section, index) => (
          <React.Fragment key={index}>
            {section.title && !collapsed && (
              <Typography variant="overline" sx={{ px: 3, pt: 2, display: 'block' }}>
                {section.title}
              </Typography>
            )}
            {section.items && section.items.length > 0 && (
              <List>
                {section.items.map((item) => {
                  const isActive = pathname === `/${role}${item.path}` || 
                                 pathname === `/${role}${item.path}/`;
                  const hasSubItems = item.subItems && item.subItems.length > 0;

                  return (
                    <React.Fragment key={item.path}>
                      <ListItem
                        component="div"
                        onClick={() => handleItemClick(item.view, item.path)}
                        sx={{
                          cursor: 'pointer',
                          justifyContent: collapsed ? 'center' : 'flex-start',
                          px: collapsed ? 1 : 2,
                          py: 1.5,
                          my: 0.5,
                          borderRadius: 2,
                          mx: 1,
                          backgroundColor: isActive ? 'primary.main' : 'transparent',
                          color: isActive ? 'primary.contrastText' : 'white',
                          transition: 'background 0.2s, color 0.2s',
                          '&:hover': {
                            backgroundColor: isActive
                              ? 'primary.dark'
                              : 'rgba(255,255,255,0.16)', // a bit stronger white hover
                            color: isActive ? 'primary.contrastText' : 'primary.main', // text turns primary on hover
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: collapsed ? 0 : 2,
                            justifyContent: 'center',
                            color: 'inherit', // <-- Inherit color from ListItem
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        {!collapsed && (
                          <>
                            <ListItemText primary={item.label} />
                            {hasSubItems && <ExpandMore />}
                          </>
                        )}
                      </ListItem>
                    </React.Fragment>
                  );
                })}
              </List>
            )}
            {section.divider && <Divider sx={{ my: 1 }} />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );

  if (!mounted) return null;

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              position: 'fixed',
              top: 16,
              left: 16,
              zIndex: (theme) => theme.zIndex.drawer + 1,
              bgcolor: 'background.paper',
              boxShadow: 1,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                width: SIDEBAR_WIDTH,
                boxSizing: 'border-box',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          open
          sx={{
            width: collapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            '& .MuiDrawer-paper': {
              width: collapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH,
              boxSizing: 'border-box',
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
            display: { xs: 'none', md: 'block' },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
