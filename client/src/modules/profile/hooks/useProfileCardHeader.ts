import type { IUser } from "../../shared/interfaces/user/IUser";

interface ProfileCardHeaderHookProps {
  user: Pick<IUser, 'name' | 'email'>;
}

interface ProfileCardHeaderHookReturn {
  userName: string;
  userEmail: string;
  userInitials: string;
  avatarUrl: string;
}

export const useProfileCardHeader = ({ user }: ProfileCardHeaderHookProps): ProfileCardHeaderHookReturn => {
  const userName = user.name ?? 'Unknown User';
  const userEmail = user.email ?? 'No email provided';

  const getInitials = (name: string | undefined): string => {
    if (!name) return '??';
    const names = name.split(' ').filter(Boolean);
    const initials = names.map(n => n[0]).join('');
    return initials.length > 2 ? initials.substring(0, 2) : initials || '??';
  };
  const userInitials = getInitials(userName);

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userInitials)}&background=random&color=fff&size=128&bold=true`;

  return {
    userName,
    userEmail,
    userInitials,
    avatarUrl,
  };
};