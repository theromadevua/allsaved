import React from 'react';
import { ProfileInfoItem } from '../ProfileInfoItem/ProfileInfoItem';
import { ProfileCardHeader } from '../ProfileCardHeader/ProfileCardHeader';
import styles from './ProfileCard.module.scss';
import { useProfileCard } from '../../hooks/useProfileCard';

export const ProfileCard: React.FC = () => {
  const { name, email, joined, role } = useProfileCard();

  const items = [
    { label: 'Name', value: name },
    { label: 'Email', value: email },
    { label: 'Joined', value: joined },
    { label: 'Role', value: role },
  ];

  return (
    <div className={styles.card}>
      <ProfileCardHeader user={{ name, email }} />
      <div className={styles.cardBody}>
        <div className={styles.infoGrid}>
          {items.map((item) => (
            <ProfileInfoItem key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </div>
    </div>
  );
};
