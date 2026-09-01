import { create } from 'zustand';

interface UserState {
  theme: 'dark' | 'light';
  language: string;
  currency: string;
  setTheme: (theme: 'dark' | 'light') => void;
  setLanguage: (lang: string) => void;
  setCurrency: (currency: string) => void;
}

export const useStore = create<UserState>((set) => ({
  theme: 'dark',
  language: 'en',
  currency: 'USD',
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setCurrency: (currency) => set({ currency }),
}));
