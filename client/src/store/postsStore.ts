import { create } from 'zustand';
import { postsService } from '../services/postsService';
import { urlUtils } from '../utils/urlUtils';
import type { IPost } from '../modules/shared/interfaces/posts/IPost';

interface PostsState {
  posts: IPost[];
  editingPost: IPost | null;
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    has_more: boolean;
  } | null;
  isLoading: boolean;
  
  fetchPosts: (page?: number, perPage?: number) => Promise<void>;
  goToPage: (page: number) => Promise<void>;
  createPost: (data: { title: string; content: string; status?: string }) => Promise<void>;
  updatePost: (id: number, data: { title: string; content: string; status?: string }) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  setEditingPost: (post: IPost | null) => void;
  resetPosts: () => void;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  editingPost: null,
  pagination: null,
  isLoading: false,

  fetchPosts: async (page = 1, perPage = 5) => {
    set({ isLoading: true });
    
    try {
      const response = await postsService.getAll({ page, per_page: perPage });
      
      set({
        posts: response.data,
        pagination: response.pagination,
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  goToPage: async (page) => {
    const { pagination } = get();
    const perPage = pagination?.per_page || 5;
    
    urlUtils.updateUrlWithPage(page);
    
    await get().fetchPosts(page, perPage);
  },

  createPost: async (data) => {
    const newPost = await postsService.create(data);
    
    set(state => ({ 
      posts: [newPost, ...state.posts],
      pagination: state.pagination ? {
        ...state.pagination,
        total: state.pagination.total + 1
      } : null
    }));
  },

  updatePost: async (id, data) => {
    const updatedPost = await postsService.update(id, data);
    
    set(state => ({
      posts: state.posts.map(p => p.id === id ? updatedPost : p),
      editingPost: null,
    }));
  },

  deletePost: async (id) => {
    await postsService.delete(id);
    
    set(state => ({ 
      posts: state.posts.filter(p => p.id !== id),
      pagination: state.pagination ? {
        ...state.pagination,
        total: state.pagination.total - 1
      } : null
    }));
  },

  setEditingPost: (post) => set({ editingPost: post }),

  resetPosts: () => set({ posts: [], pagination: null }),
}));