import { create } from 'zustand';

export const useAdminMode = create((set) => ({
  isEditing: false,
  toggleEditing: () => set((state) => ({ isEditing: !state.isEditing })),
}));
