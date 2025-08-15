import { api } from "../api";
import type { IPost } from "../modules/shared/interfaces/posts/IPost";


type PostData = { title: string; content: string; status?: string };

export const postsService = {
  getAll: ({ page, per_page: perPage }: { page: number; per_page: number }) =>
    api.get<any>(`/posts?page=${page}&per_page=${perPage}`, true),
  create: (data: PostData) => api.post<IPost>('/posts', data),
  update: (id: number, data: PostData) => api.put<IPost>(`/posts/${id}`, data),
  delete: (id: number) => api.delete(`/posts/${id}`),
};