import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  van_type: string | null;
  verified: boolean;
}

export interface GPSLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

interface GPSStore {
  location: GPSLocation | null;
  tracking: boolean;
  setLocation: (location: GPSLocation) => void;
  setTracking: (tracking: boolean) => void;
}

interface UIStore {
  sidebarOpen: boolean;
  darkMode: boolean;
  setSidebarOpen: (open: boolean) => void;
  setDarkMode: (dark: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

export const useGPSStore = create<GPSStore>((set) => ({
  location: null,
  tracking: false,
  setLocation: (location) => set({ location }),
  setTracking: (tracking) => set({ tracking }),
}));

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,
  darkMode: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setDarkMode: (dark) => set({ darkMode: dark }),
}));
