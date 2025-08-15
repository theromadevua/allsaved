import { useAuth } from "../../../hooks/useAuth";
import type { IPost } from "../../shared/interfaces/posts/IPost";

interface PostListItemHookProps {
  post: IPost;
}

interface PostListItemHookReturn {
  userInitials: string;
  avatarUrl: string;
  formattedDate: string;
  userName: string;
  canEdit: boolean;
}

export const usePostListItem = ({ post }: PostListItemHookProps): PostListItemHookReturn => {
  const { isAuthenticated, user } = useAuth();

  const userName = post?.user?.name ?? 'Unknown User';

  const getInitials = (name: string | undefined): string => {
    if (!name) return '??';
    const names = name.split(' ').filter(Boolean);
    const initials = names.map(n => n[0]).join('');
    return initials.length > 2 ? initials.substring(0, 2) : initials || '??';
  };
  const userInitials = getInitials(userName);

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userInitials)}&background=random&color=fff&size=128&bold=true`;

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown Date';

  const canEdit = isAuthenticated && (user?.id === post.user_id || user?.role === 'admin');

  return {
    userInitials,
    avatarUrl,
    formattedDate,
    userName,
    canEdit,
  };
};