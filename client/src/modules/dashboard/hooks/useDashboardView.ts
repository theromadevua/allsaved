import { useEffect, useCallback, useState } from 'react';
import type { IPost } from '../../shared/interfaces/posts/IPost';
import { usePosts } from '../../../hooks/usePosts';
import { useDashboard } from '../../../hooks/useDashboard';

export const useDashboardView = () => {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [isEditOpen, setEditOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<IPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    totalPosts,
    userPosts,
    loading,
    error: storeError,
    fetchDashboardInfo,
  } = useDashboard();

  const {
    updatePost,
    deletePost,
    createPost,
  } = usePosts();

  useEffect(() => {
    fetchDashboardInfo();
  }, []);

  const handleEdit = useCallback((post: IPost) => {
    setPostToEdit(post);
    setEditOpen(true);
  }, []);

  const handleDelete = useCallback((post: number) => {
    setPostToDelete(post);
    setDeleteOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!postToDelete) return;

    try {
      await deletePost(postToDelete);
      setDeleteOpen(false);
      setPostToDelete(null);
      setError(null);
      fetchDashboardInfo();
    } catch (err) {
      setError('Failed to delete post. Please try again.');
      console.error('Delete error:', err);
    }
  }, [postToDelete, deletePost, fetchDashboardInfo]);

  const closeEditModal = useCallback(() => {
    setEditOpen(false);
    setPostToEdit(null);
    setError(null);
  }, []);

  const confirmEdit = useCallback(
    async (updatedData: { title: string; content: string }) => {
      try {
        if (postToEdit) {
          await updatePost(postToEdit.id, updatedData);
        } else {
          await createPost(updatedData);
        }
        closeEditModal();
        setError(null);
        fetchDashboardInfo();
      } catch (err) {
        setError('Failed to save post. Please try again.');
        console.error('Edit error:', err);
      }
    },
    [postToEdit, updatePost, createPost, closeEditModal, fetchDashboardInfo]
  );

  return {
    loading,
    error: storeError || error,
    totalPosts,
    userPosts,
    isDeleteOpen,
    postToDelete,
    setDeleteOpen,
    isEditOpen,
    postToEdit,
    closeEditModal,
    confirmEdit,
    handleEdit,
    handleDelete,
    confirmDelete,
  };
};