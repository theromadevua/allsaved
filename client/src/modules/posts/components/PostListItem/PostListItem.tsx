import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import styles from './PostListItem.module.scss';
import type { IPost } from '../../../shared/interfaces/posts/IPost';
import { usePostListItem } from '../../hooks/usePostListItem';

interface PostListItemProps {
  post: IPost;
  onEdit: (post: IPost) => void;
  onDelete: (id: number) => void;
}

export const PostListItem: React.FC<PostListItemProps> = ({ post, onEdit, onDelete }) => {
  const { avatarUrl, formattedDate, userName, canEdit } = usePostListItem({ post });

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.header}>
          <div className={styles.author}>
            <img src={avatarUrl} alt={`${userName}'s avatar`} className={styles.avatar} />
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{userName}</span>
              <span className={styles.timestamp}>{formattedDate}</span>
            </div>
          </div>
          {canEdit && (
            <div className={styles.actions}>
              <button
                className={styles.iconButton}
                onClick={() => onEdit(post)}
                aria-label={`Edit post titled ${post.title ?? 'Untitled'}`}
              >
                <Pencil size={18} />
              </button>
              <button
                className={`${styles.iconButton} ${styles.danger}`}
                onClick={() => onDelete(post.id ?? 0)}
                aria-label={`Delete post titled ${post.title ?? 'Untitled'}`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
        <div className={styles.content}>
          <h6 className={styles.title}>{post.title ?? 'Untitled'}</h6>
          <p className={styles.text}>{post.content ?? 'No content available'}</p>
        </div>
      </div>
    </div>
  );
};