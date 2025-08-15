import { useAuth } from "../../../hooks/useAuth";

export const useProfileCard = () => {
  const {user} = useAuth();

  const joined = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-EN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';
  
  console.log(user)
  const role = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : '';

  return {
    name: user?.name || '',
    email: user?.email || '',
    role,
    joined,
  };
};