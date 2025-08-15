import { useEffect, useState } from 'react';
import { usePosts } from '../../../hooks/usePosts';
import { useAuth } from '../../../hooks/useAuth';
import type { IPost } from '../../shared/interfaces/posts/IPost';
import { urlUtils } from '../../../utils/urlUtils';

export const usePostsPage = () => {
  const { 
    posts, 
    editingPost, 
    pagination,
    isLoading,
    setEditingPost, 
    createPost, 
    updatePost, 
    deletePost, 
    fetchPosts,
    goToPage 
  } = usePosts();
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const currentPage = urlUtils.getCurrentPageFromUrl();

      fetchPosts(currentPage)

    const unsubscribe = urlUtils.onPopState((page) => {
      fetchPosts(page);
    });

    return unsubscribe;
  }, []);

  const canEdit = (post: IPost): boolean => {
    return isAuthenticated && (user?.id === post.user_id || user?.role == 'admin');
  };

  const openCreateModal = () => {
    setEditingPost(null);
    setModalMode('create');
    setIsFormModalOpen(true);
  };

  const openEditModal = (post: IPost) => {
    if (!canEdit(post)) return;
    setEditingPost(post);
    setModalMode('edit');
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setTimeout(() => setEditingPost(null), 300);
  };

  const openDeleteModal = (id: number) => {
    const post = posts.find(p => p.id === id);
    if (!post || !canEdit(post)) return;
    setPostToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      await deletePost(postToDelete);
      setIsDeleteModalOpen(false);
      setPostToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setPostToDelete(null);
  };

  const wrappedCreate = async (data: { title: string; content: string }) => {
    await createPost(data);
    closeFormModal();
    
    const currentPage = urlUtils.getCurrentPageFromUrl();
    if (currentPage !== 1) {
      await goToPage(1);
    }
  };

  const wrappedUpdate = async (id: number, data: { title: string; content: string }) => {
    await updatePost(id, data);
    closeFormModal();
  };

  return {
    posts,
    editingPost,
    isFormModalOpen,
    modalMode,
    isDeleteModalOpen,
    isAuthenticated,
    isLoading,
    pagination,
    openCreateModal,
    openEditModal,
    closeFormModal,
    openDeleteModal,
    confirmDelete,
    cancelDelete,
    wrappedCreate,
    wrappedUpdate,
    goToPage,
  };
};