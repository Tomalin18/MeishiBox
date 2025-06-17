import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProps } from '@/types';
import { getTheme, typography, spacing, borderRadius, commonStyles } from '@/constants/theme';
import { Button } from '@/components/common/Button';
import { useSubscriptionActions } from '@/store/subscriptionStore';

type SubscriptionScreenProps = NavigationProps<'Subscription'>;

interface FeatureItemProps {
  icon: string;
  text: string;
  enabled?: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  badge?: string;
  selected: boolean;
  onSelect: () => void;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text, enabled = true }) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');

  return (
    <View style={styles.featureItem}>
      <Ionicons 
        name={icon as any} 
        size={20} 
        color={enabled ? theme.colors.primary : theme.colors.text.disabled} 
      />
      <Text style={[
        styles.featureText,
        { color: enabled ? theme.colors.text.primary : theme.colors.text.disabled }
      ]}>
        {text}
      </Text>
    </View>
  );
};

const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  description, 
  badge, 
  selected, 
  onSelect 
}) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');

  const cardStyle = [
    styles.pricingCard,
    {
      backgroundColor: theme.colors.surface.light,
      borderColor: selected ? theme.colors.primary : theme.colors.border,
      borderWidth: selected ? 2 : 1,
    }
  ];

  return (
    <TouchableOpacity style={cardStyle} onPress={onSelect}>
      {badge && (
        <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.badgeText, { color: theme.colors.text.inverse }]}>
            {badge}
          </Text>
        </View>
      )}
      
      <View style={styles.pricingContent}>
        <View style={styles.radioContainer}>
          <View style={[
            styles.radio,
            {
              borderColor: selected ? theme.colors.primary : theme.colors.border,
              backgroundColor: selected ? theme.colors.primary : 'transparent',
            }
          ]}>
            {selected && (
              <Ionicons name="checkmark" size={16} color={theme.colors.text.inverse} />
            )}
          </View>
        </View>
        
        <View style={styles.pricingDetails}>
          <Text style={[styles.pricingTitle, { color: theme.colors.text.primary }]}>
            {title}
          </Text>
          <Text style={[styles.pricingPrice, { color: theme.colors.text.primary }]}>
            {price}
          </Text>
          <Text style={[styles.pricingDescription, { color: theme.colors.text.secondary }]}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');
  const { purchaseSubscription } = useSubscriptionActions();
  
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    navigation.replace('MainTabs');
  };

  const handlePurchase = async () => {
    try {
      setLoading(true);
      const productId = selectedPlan === 'annual' ? 'annual_subscription' : 'monthly_subscription';
      await purchaseSubscription(productId);
      navigation.replace('MainTabs');
    } catch (error) {
      Alert.alert('購入エラー', '購入に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  const handleRestorePurchases = () => {
    // TODO: Implement restore purchases
    Alert.alert('購入履歴', '復元する購入履歴がありません。');
  };

  const handleTerms = () => {
    // TODO: Open terms of service
    Alert.alert('利用規約', '利用規約を表示します。');
  };

  const handlePrivacy = () => {
    // TODO: Open privacy policy
    Alert.alert('プライバシー', 'プライバシーポリシーを表示します。');
  };

  const styles = StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: theme.colors.background.light,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: spacing.md,
      paddingTop: spacing.lg,
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.surface.card,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.lg,
    },
    heroSection: {
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    appIcon: {
      marginBottom: spacing.md,
    },
    title: {
      fontSize: typography.fontSizes.xxl,
      fontWeight: '700' as const,
      color: theme.colors.primary,
      textAlign: 'center',
      marginBottom: spacing.sm,
    },
    subtitle: {
      fontSize: typography.fontSizes.md,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      lineHeight: typography.lineHeights.relaxed * typography.fontSizes.md,
    },
    featuresSection: {
      marginBottom: spacing.xl,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    featureText: {
      fontSize: typography.fontSizes.md,
      marginLeft: spacing.sm,
    },
    upcomingSection: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      fontSize: typography.fontSizes.md,
      fontWeight: '600' as const,
      color: theme.colors.text.secondary,
      marginBottom: spacing.md,
    },
    pricingSection: {
      marginBottom: spacing.xl,
    },
    pricingCards: {
      flexDirection: 'row',
      gap: spacing.md,
    },
    pricingCard: {
      flex: 1,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      position: 'relative',
    },
    badge: {
      position: 'absolute',
      top: -8,
      left: spacing.md,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.md,
    },
    badgeText: {
      fontSize: typography.fontSizes.sm,
      fontWeight: '600' as const,
    },
    pricingContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    radioContainer: {
      marginRight: spacing.sm,
      marginTop: spacing.xs,
    },
    radio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pricingDetails: {
      flex: 1,
    },
    pricingTitle: {
      fontSize: typography.fontSizes.lg,
      fontWeight: '600' as const,
      marginBottom: spacing.xs,
    },
    pricingPrice: {
      fontSize: typography.fontSizes.md,
      fontWeight: '600' as const,
      marginBottom: spacing.xs,
    },
    pricingDescription: {
      fontSize: typography.fontSizes.sm,
      lineHeight: typography.lineHeights.normal * typography.fontSizes.sm,
    },
    ctaSection: {
      paddingBottom: spacing.xl,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.lg,
    },
    footerLink: {
      fontSize: typography.fontSizes.sm,
      color: theme.colors.text.secondary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={18} color={theme.colors.text.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.appIcon}>
            <Ionicons name="card" size={100} color={theme.colors.primary} />
            <View style={{
              position: 'absolute',
              top: -8,
              right: -8,
              backgroundColor: theme.colors.text.primary,
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 4,
            }}>
              <Text style={{
                color: theme.colors.text.inverse,
                fontSize: 10,
                fontWeight: '600' as const,
              }}>pro</Text>
            </View>
          </View>
          
          <Text style={styles.title}>MeishiBox Pro無料トライアル</Text>
          <Text style={styles.subtitle}>
            最も熱心なユーザーのための、最も高度な機能です。
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <FeatureItem icon="checkmark" text="月間最大1,000件のスキャン" />
          <FeatureItem icon="checkmark" text="アプリ内の広告を削除" />
          <FeatureItem icon="checkmark" text="連絡先にエクスポート可能" />
          <FeatureItem icon="checkmark" text="Excelにエクスポート" />
        </View>

        <View style={styles.upcomingSection}>
          <Text style={styles.sectionTitle}>今後の機能</Text>
          <FeatureItem icon="calendar" text="一括名刺認識" enabled={false} />
        </View>

        <View style={styles.pricingSection}>
          <View style={styles.pricingCards}>
            <PricingCard
              title="年間"
              price="¥667円/月"
              description="無料トライアル後、¥8,000/年で請求されます。"
              badge="17% 割引!"
              selected={selectedPlan === 'annual'}
              onSelect={() => setSelectedPlan('annual')}
            />
            
            <PricingCard
              title="月額"
              price="¥800/月"
              description="¥800/月で請求されます"
              selected={selectedPlan === 'monthly'}
              onSelect={() => setSelectedPlan('monthly')}
            />
          </View>
        </View>

        <View style={styles.ctaSection}>
          <Button
            title="無料で始める"
            onPress={handlePurchase}
            loading={loading}
            fullWidth
            size="large"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleRestorePurchases}>
          <Text style={styles.footerLink}>購入履歴を復元</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTerms}>
          <Text style={styles.footerLink}>利用規約</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePrivacy}>
          <Text style={styles.footerLink}>プライバシー</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}; 