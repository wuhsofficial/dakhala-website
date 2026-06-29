import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAdmin: false,
  loading: true,
  setUser: (user) => set({ user, isAdmin: user?.email === 'wuhs.official@gmail.com', loading: false }),
  clearUser: () => set({ user: null, isAdmin: false, loading: false }),
}));
