import { create } from 'zustand';

type SidebarState = {
  mobileOpen: boolean;
  collapsed: boolean;
  toggleMobileOpen: () => void;
  toggleCollapsed: () => void;
  setCollapsed: (collapsed: boolean) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  mobileOpen: false,
  collapsed: false,
  toggleMobileOpen: () => set((state) => ({ mobileOpen: !state.mobileOpen })),
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  setCollapsed: (collapsed) => set({ collapsed }),
}));
