import React from 'react';
import styles from './Settings.module.scss';
import { useSettings } from '../hooks/useSettings';
import { SettingsCard } from '../components/SettingsCard/SettingsCard';

const Settings: React.FC = () => {
  const { darkMode, toggleDarkMode, handleLogout } = useSettings();

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Settings</h1>
      <SettingsCard
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default Settings;
