import type { IPost } from "../posts/IPost";

export interface IDashboardInfo {
    total_posts: number;
    user_posts?: IPost[] | null;
    posts?: IPost[] | null;
  }