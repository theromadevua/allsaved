export interface IDashboardStats {
    overview: {
      total_posts: number;
      published_posts: number;
      draft_posts: number;
      posts_today: number;
      posts_this_week: number;
      posts_this_month: number;
    };
    daily_posts: Array<{
      date: string;
      day: string;
      posts_count: number;
    }>;
    monthly_posts: Array<{
      month: string;
      posts_count: number;
    }>;
  }