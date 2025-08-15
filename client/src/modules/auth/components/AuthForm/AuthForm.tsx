import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.scss';
import { InputField } from '../InputField/InputField';

interface FormData {
  name?: string; 
  email: string;
  password: string;
  password_confirmation?: string; 
}

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (data: FormData) => void;
  error?: string | null;
  loading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, error, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange', 
  });

  return (
    <div className={styles.formContainer}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>{mode === 'login' ? 'Login' : 'Register'}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {mode === 'register' && (
            <InputField
              label="Name"
              type="text"
              register={register('name', { required: 'Name is required' })}
              error={errors.name}
            />
          )}
          <InputField
            label="Email"
            type="email"
            register={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            error={errors.email}
          />
          <InputField
            label="Password"
            type="password"
            register={register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Minimum 8 characters' },
            })}
            error={errors.password}
          />
          {mode === 'register' && (
            <InputField
              label="Confirm Password"
              type="password"
              register={register('password_confirmation', {
                required: 'Password confirmation required',
              })}
              error={errors.password_confirmation}
            />
          )}
          {error && <div className={styles.alertDanger}>{error}</div>}
          <button type="submit" className={styles.btnFullWidth} disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;