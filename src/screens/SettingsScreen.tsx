import React from 'react';
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
import { useSubscription } from '@/store/subscriptionStore';

type SettingsScreenProps = NavigationProps<'Settings'>;

interface SettingsItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  rightElement?: React.ReactNode;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  rightElement 
}) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');

  return (
    <TouchableOpacity style={[styles.settingsItem, { borderBottomColor: theme.colors.border }]} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: theme.colors.surface.card }]}>
        <Ionicons name={icon as any} size={16} color={theme.colors.text.secondary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.itemTitle, { color: theme.colors.text.primary }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.itemSubtitle, { color: theme.colors.text.secondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement || (
        <Ionicons name="chevron-forward" size={16} color={theme.colors.text.secondary} />
      )}
    </TouchableOpacity>
  );
};

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');
  const subscription = useSubscription();

  const handleExportFeature = () => {
    Alert.alert('エクスポート機能', 'settings.pro_features.export_to_...機能を表示します。');
  };

  const handleRate = () => {
    Alert.alert('評価', 'アプリストアで評価してください。');
  };

  const handleContact = () => {
    Alert.alert('お問い合わせ', 'サポートにお問い合わせください。');
  };

  const handleRestorePurchases = () => {
    Alert.alert('購入を復元', '購入履歴を復元します。');
  };

  const styles = StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: theme.colors.background.light,
    },
    header: {
      backgroundColor: theme.colors.background.light,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: typography.fontSizes.xl,
      fontWeight: '600' as const,
      color: theme.colors.text.primary,
      textAlign: 'center',
    },
    membershipCard: {
      backgroundColor: theme.colors.surface.card,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      margin: spacing.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    membershipHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    membershipTitle: {
      fontSize: typography.fontSizes.md,
      fontWeight: '600' as const,
      color: theme.colors.text.primary,
      marginLeft: spacing.sm,
    },
    membershipSubtitle: {
      fontSize: typography.fontSizes.sm,
      color: theme.colors.text.secondary,
    },
    restoreButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    restoreIconContainer: {
      width: 32,
      height: 32,
      borderRadius: borderRadius.sm,
      backgroundColor: theme.colors.surface.card,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.md,
    },
    restoreText: {
      fontSize: typography.fontSizes.md,
      color: theme.colors.text.primary,
      flex: 1,
    },
    sectionHeader: {
      fontSize: typography.fontSizes.md,
      fontWeight: '600' as const,
      color: theme.colors.primary,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: theme.colors.background.light,
    },
    settingsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderBottomWidth: 1,
    },
    iconContainer: {
      width: 32,
      height: 32,
      borderRadius: borderRadius.sm,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.md,
    },
    textContainer: {
      flex: 1,
    },
    itemTitle: {
      fontSize: typography.fontSizes.md,
    },
    itemSubtitle: {
      fontSize: typography.fontSizes.sm,
      marginTop: spacing.xs,
    },
    footer: {
      alignItems: 'center',
      padding: spacing.lg,
    },
    versionText: {
      fontSize: typography.fontSizes.sm,
      color: theme.colors.text.secondary,
    },
    madeInText: {
      fontSize: typography.fontSizes.sm,
      color: theme.colors.text.secondary,
      marginTop: spacing.xs,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>設定</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Membership Section */}
        <Text style={styles.sectionHeader}>メンバーシップ</Text>
        
        <View style={styles.membershipCard}>
          <View style={styles.membershipHeader}>
            <Ionicons name="star" size={24} color={theme.colors.primary} />
            <Text style={styles.membershipTitle}>
              メンバーシップの状態 {subscription.isActive ? 'プレミアム' : '無料版'}
            </Text>
          </View>
          <Text style={styles.membershipSubtitle}>
            残りスキャン回数: {subscription.scansRemaining}
          </Text>
        </View>

        <TouchableOpacity style={styles.restoreButton} onPress={handleRestorePurchases}>
          <View style={styles.restoreIconContainer}>
            <Ionicons name="refresh" size={16} color={theme.colors.text.secondary} />
          </View>
          <Text style={styles.restoreText}>購入を復元</Text>
          <Ionicons name="chevron-forward" size={16} color={theme.colors.text.secondary} />
        </TouchableOpacity>

        {/* Pro Features Section */}
        <Text style={styles.sectionHeader}>settings.section.pro_features</Text>
        
        <SettingsItem
          icon="document-text"
          title="settings.pro_features.export_to_..."
          onPress={handleExportFeature}
        />

        {/* Support Section */}
        <Text style={styles.sectionHeader}>サポート</Text>
        
        <SettingsItem
          icon="thumbs-up"
          title="評価する"
          onPress={handleRate}
        />
        
        <SettingsItem
          icon="chatbubble"
          title="お問い合わせ"
          onPress={handleContact}
        />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>Ver. 1.0.04</Text>
          <Text style={styles.madeInText}>Made in Keelung ❤️</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}; 