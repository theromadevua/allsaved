import { api } from "../api";
import type { IAuthResponse } from "../modules/shared/interfaces/auth/IAuthResponse";
import type { IUser } from "../modules/shared/interfaces/user/IUser";

export const authService = {
  login: (email: string, password: string) =>
    api.post<IAuthResponse>('/login', { email, password }),

  register: (name: string, email: string, password: string, password_confirmation: string) =>
    api.post<IAuthResponse>('/register', { name, email, password, password_confirmation }),

  getUser: () => api.get<IUser>('/user'),

  logout: async () => {
    await api.post('/logout');
    api.clearAuth();
  },
};