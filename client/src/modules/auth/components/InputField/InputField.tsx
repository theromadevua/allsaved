import React from 'react';
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';
import styles from './InputField.module.scss';

interface InputFieldProps {
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  register,
  error,
}) => (
  <div className={styles.mb3}>
    <label htmlFor={register.name} className={styles.formLabel}>
      {label}
    </label>
    <input
      type={type}
      id={register.name}
      className={`${styles.formControl} ${error ? styles.isInvalid : ''}`}
      {...register}
    />
    {error?.message && <div className={styles.invalidFeedback}>{error.message}</div>}
  </div>
);