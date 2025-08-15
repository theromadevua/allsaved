import { usePostsStore } from "../store/postsStore";
import { useAsyncAction } from "./useAsyncAction";

export const usePosts = () => {
  const store = usePostsStore();
  const { loading, error, execute } = useAsyncAction();

  return {
    ...store,
    loading,
    error,
    fetchPosts: (page?: number) => execute(() => store.fetchPosts(page)),
    createPost: (data: any) => execute(() => store.createPost(data)),
    updatePost: (id: number, data: any) => execute(() => store.updatePost(id, data)),
    deletePost: (id: number) => execute(() => store.deletePost(id)),
  };
};