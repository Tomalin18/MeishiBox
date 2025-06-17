import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProps } from '@/types';
import { getTheme, typography, spacing, commonStyles } from '@/constants/theme';

type ContactDetailScreenProps = NavigationProps<'ContactDetail'>;

export const ContactDetailScreen: React.FC<ContactDetailScreenProps> = ({ navigation, route }) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');
  const { contactId } = route.params;

  const styles = StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: theme.colors.background.light,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      marginRight: spacing.md,
    },
    headerTitle: {
      fontSize: typography.fontSizes.lg,
      fontWeight: '600' as const,
      color: theme.colors.text.primary,
      flex: 1,
      textAlign: 'center',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg,
    },
    placeholder: {
      fontSize: typography.fontSizes.lg,
      color: theme.colors.text.secondary,
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>名刺の詳細</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.placeholder}>
          連絡先詳細画面 (Contact ID: {contactId})
        </Text>
      </View>
    </SafeAreaView>
  );
}; 