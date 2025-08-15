import { create } from 'zustand';
import type { IPost } from '../modules/shared/interfaces/posts/IPost';
import { dashboardService } from '../services/dashboardService';

interface DashboardState {
  totalPosts: number;
  userPosts: IPost[];
  fetchDashboardInfo: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  totalPosts: 0,
  userPosts: [],

  fetchDashboardInfo: async () => {
    const { total_posts, user_posts } = await dashboardService.getInfo();
    set({ totalPosts: total_posts || 0, userPosts: user_posts || [] });
  },
}));