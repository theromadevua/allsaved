export interface IPost {
    id: number;
    title: string;
    content: string;
    user_id: number;
    user: { name: string };
    created_at: string;
    updated_at: string;
  }