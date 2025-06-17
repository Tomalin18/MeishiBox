import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStore, AppSettings } from '@/types';

const initialSettings: AppSettings = {
  theme: 'auto',
  language: 'ja',
  notifications: true,
  hapticFeedback: true,
  autoBackup: false,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      settings: initialSettings,
      isFirstLaunch: true,

      updateSettings: (newSettings: Partial<AppSettings>) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      setFirstLaunch: (isFirst: boolean) => {
        set({ isFirstLaunch: isFirst });
      },
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Selectors
export const useAppSettings = () => useAppStore(state => state.settings);
export const useIsFirstLaunch = () => useAppStore(state => state.isFirstLaunch);

// Actions
export const useAppActions = () => {
  const store = useAppStore();
  return {
    updateSettings: store.updateSettings,
    setFirstLaunch: store.setFirstLaunch,
  };
}; 