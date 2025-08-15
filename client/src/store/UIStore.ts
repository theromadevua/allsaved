import { create } from 'zustand';

const THEME_KEY = 'theme';
const getStoredTheme = () => localStorage.getItem(THEME_KEY) === 'dark';
const setTheme = (isDark: boolean) => {
  const theme = isDark ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.setAttribute('data-theme', theme);
};

interface UIStore {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  darkMode: getStoredTheme(),

  toggleDarkMode: () => set(state => {
    const newMode = !state.darkMode;
    setTheme(newMode);
    return { darkMode: newMode };
  }),

  setDarkMode: (value) => {
    setTheme(value);
    set({ darkMode: value });
  },
}));