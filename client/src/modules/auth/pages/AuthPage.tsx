import React, { useState } from 'react';
import styles from './AuthPage.module.scss';
import { useAuthForm } from '../hooks/useAuthForm';
import AuthForm from '../components/AuthForm/AuthForm';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { onSubmit, error, loading } = useAuthForm(mode);

  const toggleMode = () => {
    setMode(prev => (prev === 'login' ? 'register' : 'login'));
  };

  return (
    <div className={styles.pageContainer}>
      <AuthForm mode={mode} onSubmit={onSubmit} error={error} loading={loading} />
      <div className={styles.switchMode}>
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <button className={styles.switchButton} onClick={toggleMode}>Register</button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button className={styles.switchButton} onClick={toggleMode}>Login</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
