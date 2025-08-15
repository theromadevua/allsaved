import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

export const useAuthForm = (mode: 'login' | 'register') => {
  const navigate = useNavigate();
  const { login, register, loading, error } = useAuth();

  const onSubmit = async (data: AuthFormData) => {
      if (mode === 'login') {
        await login(data.email, data.password);
      } else {
        await register(data.name!, data.email, data.password, data.password_confirmation!);
      }
      navigate('/');
  };

  return { onSubmit, error, loading };
};