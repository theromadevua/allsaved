import React, { useMemo } from 'react';
import common from './DashboardView.module.scss';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useDashboardView } from '../../hooks/useDashboardView';
import { PostList } from '../../../posts/components/PostList/PostList';
import { Modal } from '../../../shared/components/Modal/Modal';
import { PostForm } from '../../../posts/components/PostForm/PostForm';

export const DashboardView: React.FC = () => {
  const {
    loading,
    error,
    totalPosts,
    userPosts,
    isDeleteOpen,
    postToDelete,
    setDeleteOpen,
    isEditOpen,
    postToEdit,
    closeEditModal,
    handleEdit,
    handleDelete,
    confirmEdit,
    confirmDelete,
  } = useDashboardView();

  const chartData = useMemo(() => {
    if (!userPosts?.length) return [];

    const counts: Record<string, number> = {};

    userPosts.forEach(post => {
      const date = new Date(post.created_at);
      const key = date.toISOString().split('T')[0];
      counts[key] = (counts[key] || 0) + 1;
    });

    return Object.entries(counts)
      .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
      .map(([date, posts]) => ({ date, posts }));
  }, [userPosts]);

  return (
    <div className={common.pageContainer}>
      <div className={common.main}>
        <div className={common.pageHeader}>
          <h1 className={common.pageTitle}>Dashboard</h1>
        </div>

        {loading ? (
          <p className={common.textMuted}>Loading…</p>
        ) : error ? (
          <div className={common.textError}>{error}</div>
        ) : totalPosts === 0 ? (
          <div className={common.infoBox}>
            <h5>No posts yet</h5>
            <p>Create your first post to see it here.</p>
          </div>
        ) : (
          <div className={common.dashboardContent}>
            <div className={common.statsBlock}>
              <div className={common.statItem}>
                <span className={common.statNumber}>{totalPosts ?? 0}</span>
                <span className={common.statLabel}>Total Posts</span>
              </div>
              <div className={common.statItem}>
                <span className={common.statNumber}>{userPosts.length}</span>
                <span className={common.statLabel}>Your Posts</span>
              </div>
            </div>

            <div className={common.chart}>
              <h3 className={common.sectionTitle}>📈 Posts per Day</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="posts" stroke="var(--color-primary)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className={common.contentBlock}>
              <h3 className={common.sectionTitle}>📝 Your Posts</h3>
              <PostList posts={userPosts} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
          </div>
        )}

        <Modal
          isOpen={isDeleteOpen}
          onClose={() => setDeleteOpen(false)}
          title="Confirm Deletion"
        >
          <p>Are you sure you want to delete this post? This action cannot be undone.</p>
          <div className={common.modalFoot}>
            <button className={`${common.btn} ${common.btnSecondary}`} onClick={() => setDeleteOpen(false)}>
              Cancel
            </button>
            <button className={`${common.btn} ${common.btnDanger}`} onClick={confirmDelete}>
              Yes, Delete
            </button>
          </div>
        </Modal>

        <Modal isOpen={isEditOpen} onClose={closeEditModal} title={postToEdit ? "Edit Post" : "Create Post"}>
          <PostForm
            initialValues={postToEdit ? { title: postToEdit.title, content: postToEdit.content } : undefined}
            onSubmit={confirmEdit}
            onCancel={closeEditModal}
            isEditing={!!postToEdit}
          />
        </Modal>
      </div>
    </div>
  );
};