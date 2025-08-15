import React from 'react';
import styles from './ProfileInfoItem.module.scss';

interface ProfileInfoItemProps {
  label: string;
  value: string;
}

export const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({ label, value }) => (
  <div className={styles.infoItem}>
    <label className={styles.infoLabel}>{label}</label>
    <div className={styles.infoValue}>{value}</div>
  </div>
);