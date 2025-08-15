import React from 'react';
import styles from './ProfileCardHeader.module.scss';
import type { IUser } from '../../../shared/interfaces/user/IUser';
import { useProfileCardHeader } from '../../hooks/useProfileCardHeader';

interface ProfileHeaderProps {
  user: Pick<IUser, 'name' | 'email'>;
}

export const ProfileCardHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const { userName, userEmail, avatarUrl } = useProfileCardHeader({ user });

  return (
    <div className={styles.cardHeader}>
      <div className={styles.headerLeft}>
        <img src={avatarUrl} alt={`${userName}'s avatar`} className={styles.avatar} />
        <div className={styles.cardTitle}>
          <h3>{userName}</h3>
          <p>{userEmail}</p>
        </div>
      </div>
    </div>
  );
};