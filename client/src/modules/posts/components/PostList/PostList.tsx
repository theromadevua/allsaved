import React from 'react';
import styles from './PostList.module.scss';
import { PostListItem } from '../PostListItem/PostListItem';
import type { IPost } from '../../../shared/interfaces/posts/IPost';

interface PostListProps {
  posts: IPost[];
  onEdit: (post: IPost) => void;
  onDelete: (id: number) => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, onEdit, onDelete }) => {
  if (posts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No posts yet.</p>
        <span>Click "Create New Post" to get started.</span>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {posts.map(post => (
        <PostListItem
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};