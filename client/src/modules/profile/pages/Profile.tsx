import { useEffect } from 'react';
import styles from './Profile.module.scss';
import { ProfileCard } from '../components/ProfileCard/ProfileCard';
import { useAuth } from '../../../hooks/useAuth';

const Profile: React.FC = () => {
  const { user, isAuthenticated, loading, fetchUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !user) {
      fetchUser();
    }
  }, [isAuthenticated, user, fetchUser]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.notAuthenticated}>
          <h2>Access Denied</h2>
          <p>Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content}>
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
