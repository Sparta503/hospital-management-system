'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
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
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { Drawer, useMediaQuery, useTheme } from '@mui/material';
import { useSidebarStore } from '@/app/store/sidebarStore';
import { useViewStore } from '@/app/store/viewStore';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '@/app/contexts/AuthContext';

// Constants
const SIDEBAR_WIDTH = 240;
const COLLAPSED_WIDTH = 60;

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  view: string;
  subItems?: MenuItem[];
}

interface MenuSection {
  title?: string;
  items?: MenuItem[];
  divider?: boolean;
}

const doctorMenu: MenuSection[] = [
  {
    items: [
      {
        label: 'Dashboard',
        path: '/doctor/dashboard',
        icon: <DashboardIcon />,
        view: 'dashboard',
      },
      {
        label: 'Patients',
        path: '/doctor/patients',
        icon: <PeopleIcon />,
        view: 'patients',
      },
      {
        label: 'Appointments',
        path: '/doctor/appointments',
        icon: <EventIcon />,
        view: 'appointments',
      },
      {
        label: 'Medical Records',
        path: '/doctor/medical-records',
        icon: <DescriptionIcon />,
        view: 'medical-records',
      },
    ],
  },
  {
    divider: true,
  },
  {
    title: 'Account',
    items: [
      {
        label: 'Settings',
        path: '/doctor/settings',
        icon: <SettingsIcon />,
        view: 'settings',
      },
      {
        label: 'Logout',
        path: '/logout',
        icon: <LogoutIcon />,
        view: 'logout',
      },
    ],
  },
];

export default function DoctorSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const { logout } = useAuth();
  const setActiveView = useViewStore((state) => state.setActiveView);
  const [mounted, setMounted] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const mobileOpen = useSidebarStore((state) => state.mobileOpen);
  const collapsed = useSidebarStore((state) => state.collapsed);
  const toggleMobileOpen = useSidebarStore((state) => state.toggleMobileOpen);
  const toggleCollapsed = useSidebarStore((state) => state.toggleCollapsed);
  const setCollapsed = useSidebarStore((state) => state.setCollapsed);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setActiveView(view);
    if (path) {
      router.push(path);
    }
    if (isMobile) {
      toggleMobileOpen();
    }
  };

  const handleToggleSubMenu = (label: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const drawerContent = (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        bgcolor: 'background.paper',
        color: 'text.primary',
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
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Doctor Portal
          </Typography>
        )}
        <IconButton onClick={toggleCollapsed} size="small">
          {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {doctorMenu.map((section, index) => (
          <React.Fragment key={index}>
            {section.title && !collapsed && (
              <Typography variant="overline" sx={{ px: 3, pt: 2, display: 'block' }}>
                {section.title}
              </Typography>
            )}
            {section.items && (
              <List>
                {section.items.map((item) => {
                  const isExpanded = expandedMenus[item.label] || false;
                  const hasSubItems = item.subItems && item.subItems.length > 0;

                  return (
                    <React.Fragment key={item.path}>
                      <ListItem
                        component="div"
                        sx={{
                          cursor: 'pointer',
                          justifyContent: collapsed ? 'center' : 'flex-start',
                          px: collapsed ? 1 : 2,
                          py: 1.5,
                          my: 0.5,
                          borderRadius: 2,
                          mx: 1,
                          backgroundColor: pathname === item.path ? 'primary.main' : 'transparent',
                          color: pathname === item.path ? 'primary.contrastText' : 'inherit',
                          '&:hover': {
                            backgroundColor: pathname === item.path ? 'primary.dark' : 'action.hover',
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: collapsed ? 0 : 2,
                            justifyContent: 'center',
                            color: 'inherit',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        {!collapsed && (
                          <>
                            <ListItemText primary={item.label} />
                            {hasSubItems && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
                          </>
                        )}
                      </ListItem>
                      {!collapsed && hasSubItems && (
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {item.subItems?.map((subItem) => (
                              <ListItem
                                key={subItem.path}
                                component="div"
                                onClick={() => handleItemClick(subItem.view, subItem.path)}
                                sx={{
                                  pl: 6,
                                  py: 1,
                                  borderRadius: 2,
                                  mx: 1,
                                  cursor: 'pointer',
                                  color: pathname === subItem.path ? 'primary.contrastText' : 'text.primary',
                                  backgroundColor: pathname === subItem.path ? 'primary.main' : 'transparent',
                                  '&:hover': {
                                    backgroundColor: pathname === subItem.path ? 'primary.dark' : 'action.hover',
                                  }
                                }}
                              >
                                <ListItemIcon sx={{ minWidth: 0, mr: 2, color: 'inherit' }}>
                                  {subItem.icon}
                                </ListItemIcon>
                                <ListItemText primary={subItem.label} />
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>
                      )}
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
