import React from 'react';
import common from './PostPageContent.module.scss';
import { PostForm } from '../PostForm/PostForm';
import { Modal } from '../../../shared/components/Modal/Modal';
import { PostList } from '../PostList/PostList';
import { Pagination } from '../Pagination/Pagination';
import type { usePostsPage } from '../../hooks/usePostsPage';

type PostsPageContentProps = ReturnType<typeof usePostsPage>;

export const PostsPageContent: React.FC<PostsPageContentProps> = ({
  posts,
  editingPost,
  isFormModalOpen,
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
  goToPage
}) => {
  const handleFormSubmit = (data: { title: string; content: string }) => {
    if (editingPost) {
      return wrappedUpdate(editingPost.id, data);
    } else {
      return wrappedCreate(data);
    }
  };

  return (
    <div className={common.pageContainer}>
      <div className={common.main}>
        <div className={common.pageHeader}>
          <h1 className={common.pageTitle}>Posts</h1>
          {isAuthenticated && (
            <button
              className={`${common.btn} ${common.btnPrimary}`}
              onClick={openCreateModal}
            >
              Create New Post
            </button>
          )}
        </div>

        <div className={common.contentBlock}>
          <PostList posts={posts} onEdit={openEditModal} onDelete={openDeleteModal} />
          
          {pagination && (
            <Pagination
              currentPage={pagination.current_page}
              totalPages={pagination.last_page}
              onPageChange={goToPage}
              isLoading={isLoading}
            />
          )}
        </div>

        <Modal
          isOpen={isFormModalOpen}
          onClose={closeFormModal}
          title={editingPost ? 'Edit Post' : 'Create Post'}
        >
          <PostForm
            initialValues={editingPost ? { title: editingPost.title, content: editingPost.content } : undefined}
            onSubmit={handleFormSubmit}
            onCancel={closeFormModal}
            isEditing={!!editingPost}
          />
        </Modal>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={cancelDelete}
          title="Confirm Deletion"
        >
          <p>Are you sure you want to delete this post? This action cannot be undone.</p>
          <div className={common.modalFoot}>
            <button className={`${common.btn} ${common.btnSecondary}`} onClick={cancelDelete}>
              Cancel
            </button>
            <button className={`${common.btn} ${common.btnDanger}`} onClick={confirmDelete}>
              Yes, Delete
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};