import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SubscriptionStore, SubscriptionState } from '@/types';

const initialSubscriptionState: SubscriptionState = {
  isActive: false,
  tier: 'free',
  scansRemaining: 50,
  maxScans: 50,
  features: [
    {
      key: 'max_scans',
      name: '月間最大1,000件のスキャン',
      description: 'プレミアムプランで月間1,000件まで名刺をスキャンできます',
      enabled: false,
    },
    {
      key: 'no_ads',
      name: 'アプリ内の広告を削除',
      description: '広告なしでスムーズに名刺管理ができます',
      enabled: false,
    },
    {
      key: 'export_contacts',
      name: '連絡先にエクスポート可能',
      description: 'スキャンした名刺を連絡先アプリに直接エクスポートできます',
      enabled: false,
    },
    {
      key: 'excel_export',
      name: 'Excelにエクスポート',
      description: '名刺データをExcel形式でエクスポートできます',
      enabled: false,
    },
  ],
};

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      subscription: initialSubscriptionState,

      purchaseSubscription: async (productId: string) => {
        try {
          // Simulate subscription purchase
          console.log('Purchasing subscription:', productId);
          
          // In a real app, you would use react-native-iap here
          // const purchase = await RNIap.requestPurchase(productId);
          
          const isAnnual = productId.includes('annual');
          const newSubscription: SubscriptionState = {
            isActive: true,
            tier: isAnnual ? 'annual' : 'monthly',
            scansRemaining: 1000,
            maxScans: 1000,
            expiryDate: new Date(Date.now() + (isAnnual ? 365 : 30) * 24 * 60 * 60 * 1000),
            features: initialSubscriptionState.features.map(feature => ({
              ...feature,
              enabled: true,
            })),
          };

          set({ subscription: newSubscription });
        } catch (error) {
          throw new Error('購入に失敗しました: ' + error);
        }
      },

      restorePurchases: async () => {
        try {
          // Simulate restore purchases
          console.log('Restoring purchases...');
          
          // In a real app, you would use react-native-iap here
          // const purchases = await RNIap.getAvailablePurchases();
          
          // For demo purposes, do nothing
          console.log('No purchases to restore');
        } catch (error) {
          throw new Error('購入履歴の復元に失敗しました: ' + error);
        }
      },

      updateScansRemaining: (count: number) => {
        set(state => ({
          subscription: {
            ...state.subscription,
            scansRemaining: Math.max(0, count),
          },
        }));
      },

      checkSubscriptionStatus: async () => {
        try {
          const { subscription } = get();
          
          // Check if subscription has expired
          if (subscription.expiryDate && new Date() > subscription.expiryDate) {
            set({
              subscription: {
                ...initialSubscriptionState,
                scansRemaining: 50,
              },
            });
          }
        } catch (error) {
          console.error('Subscription status check failed:', error);
        }
      },
    }),
    {
      name: 'subscription-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Selectors
export const useSubscription = () => useSubscriptionStore(state => state.subscription);
export const useIsSubscriptionActive = () => useSubscriptionStore(state => state.subscription.isActive);
export const useScansRemaining = () => useSubscriptionStore(state => state.subscription.scansRemaining);

// Actions
export const useSubscriptionActions = () => {
  const store = useSubscriptionStore();
  return {
    purchaseSubscription: store.purchaseSubscription,
    restorePurchases: store.restorePurchases,
    updateScansRemaining: store.updateScansRemaining,
    checkSubscriptionStatus: store.checkSubscriptionStatus,
  };
}; 