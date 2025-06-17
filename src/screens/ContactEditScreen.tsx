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

type ContactEditScreenProps = NavigationProps<'ContactEdit'>;

export const ContactEditScreen: React.FC<ContactEditScreenProps> = ({ navigation, route }) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');
  const { contactId } = route.params || {};

  const styles = StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: theme.colors.background.light,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: typography.fontSizes.lg,
      fontWeight: '600' as const,
      color: theme.colors.text.primary,
    },
    saveButton: {
      color: theme.colors.primary,
      fontSize: typography.fontSizes.md,
      fontWeight: '600' as const,
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>名刺を編集</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.saveButton}>保存</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.placeholder}>
          名刺編輯画面 {contactId ? `(Contact ID: ${contactId})` : '(新規作成)'}
        </Text>
      </View>
    </SafeAreaView>
  );
}; 