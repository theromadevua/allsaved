import { useUIStore } from '../../../store/UIStore';
import { useAuthStore } from '../../../store/authStore';
import { useNavigate } from 'react-router-dom';

export const useSettings = () => {
  const { darkMode, toggleDarkMode } = useUIStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return { darkMode, toggleDarkMode, handleLogout };
};
