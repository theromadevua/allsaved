import React from 'react';
import styles from './SettingsCard.module.scss';
import { Sun, Moon, LogOut } from 'lucide-react';

interface SettingsCardProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  handleLogout: () => void;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({ darkMode, toggleDarkMode, handleLogout }) => (
  <div className={styles.card}>
    <div className={styles.cardBody}>
      <h5 className={styles.cardTitle}>User Settings</h5>
      <div className={styles.buttons}>
        <button className={styles.btn} onClick={toggleDarkMode}>
          {darkMode ? <><Sun size={18} /> Light Theme</> : <><Moon size={18} /> Dark Theme</>}
        </button>
        <button className={`${styles.btn} ${styles.btnLogout}`} onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  </div>
);
