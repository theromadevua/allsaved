import { create } from 'zustand';
import { authService } from '../services/authService';
import type { IUser } from '../modules/shared/interfaces/user/IUser';

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  hasFetchedUser: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  hasFetchedUser: false,

  login: async (email, password) => {
    const { user } = await authService.login(email, password);
    set({ user, isAuthenticated: true, hasFetchedUser: true });
  },

  register: async (name, email, password, password_confirmation) => {
    const { user } = await authService.register(name, email, password, password_confirmation);
    set({ user, isAuthenticated: true, hasFetchedUser: true });
  },

  logout: async () => {
    await authService.logout();
    set({ user: null, isAuthenticated: false, hasFetchedUser: false });
  },

  fetchUser: async () => {
    try {
      const user = await authService.getUser();
      set({ user, isAuthenticated: true, hasFetchedUser: true });
    } catch {
      set({ isAuthenticated: false, hasFetchedUser: true });
      throw new Error('Failed to fetch user');
    }
  },

  reset: () => set({ user: null, isAuthenticated: false, hasFetchedUser: false }),
}));