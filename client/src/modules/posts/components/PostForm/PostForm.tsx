import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './PostForm.module.scss';

interface PostFormProps {
  initialValues?: { title: string; content: string };
  onSubmit: (data: PostFormData) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

interface PostFormData {
  title: string;
  content: string;
}

export const PostForm: React.FC<PostFormProps> = ({ initialValues, onSubmit, onCancel, isEditing = false }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PostFormData>({
    defaultValues: initialValues || { title: '', content: '' },
    mode: 'onChange', 
  });

  useEffect(() => {
    reset(initialValues || { title: '', content: '' });
  }, [initialValues, reset]);

  const onFormSubmit = async (data: PostFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onFormSubmit)} className={styles.formLayout}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.formLabel}>Title</label>
          <input
            type="text"
            id="title"
            className={`${styles.formInput} ${errors.title ? styles.formInputError : ''}`}
            {...register('title', {
              required: 'Title is required',
              maxLength: {
                value: 255,
                message: 'Title cannot exceed 255 characters',
              },
              validate: {
                isString: value => typeof value === 'string' || 'Title must be a valid string',
              },
            })}
            disabled={isSubmitting}
          />
          {errors.title && <div className={styles.formError}>{errors.title.message}</div>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.formLabel}>Content</label>
          <textarea
            id="content"
            rows={6}
            className={`${styles.formInput} ${errors.content ? styles.formInputError : ''}`}
            {...register('content', {
              required: 'Content is required',
              validate: {
                isString: value => typeof value === 'string' || 'Content must be a valid string',
              },
            })}
            disabled={isSubmitting}
          />
          {errors.content && <div className={styles.formError}>{errors.content.message}</div>}
        </div>
        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
          </button>
        </div>
      </form>
    </div>
  );
};