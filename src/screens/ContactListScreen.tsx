import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  useColorScheme,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Contact, NavigationProps } from '@/types';
import { getTheme, typography, spacing, commonStyles } from '@/constants/theme';
import { SearchInput } from '@/components/common/SearchInput';
import { ContactCard } from '@/components/contact/ContactCard';
import { CameraFAB } from '@/components/common/CameraFAB';
import { 
  useFilteredContacts, 
  useSearchQuery, 
  useContactActions 
} from '@/store/contactStore';

type ContactListScreenProps = NavigationProps<'ContactList'>;

export const ContactListScreen: React.FC<ContactListScreenProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');
  
  const filteredContacts = useFilteredContacts();
  const searchQuery = useSearchQuery();
  const { setSearchQuery } = useContactActions();

  const handleContactPress = (contact: Contact) => {
    navigation.navigate('ContactDetail', { contactId: contact.id });
  };

  const handleCameraPress = () => {
    navigation.navigate('CameraScan');
  };

  const renderContact: ListRenderItem<Contact> = ({ item }) => (
    <ContactCard 
      contact={item} 
      onPress={handleContactPress}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons 
        name="card-outline" 
        size={64} 
        color={theme.colors.text.disabled} 
      />
      <Text style={[styles.emptyTitle, { color: theme.colors.text.secondary }]}>
        名刺がありません
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.colors.text.disabled }]}>
        カメラボタンを押して最初の名刺をスキャンしましょう
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
          名刺一覧
        </Text>
        <View style={styles.headerActions}>
          <Ionicons 
            name="menu" 
            size={24} 
            color={theme.colors.text.primary} 
          />
        </View>
      </View>
      
      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="連絡先を検索..."
      />
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: theme.colors.background.light,
    },
    header: {
      backgroundColor: theme.colors.background.light,
      paddingTop: spacing.md,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm,
    },
    headerTitle: {
      fontSize: typography.fontSizes.xl,
      fontWeight: '600' as const,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    listContainer: {
      flex: 1,
    },
    listContent: {
      paddingBottom: 140, // Account for FAB and tab bar
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.xl,
      paddingTop: 100,
    },
    emptyTitle: {
      fontSize: typography.fontSizes.lg,
      fontWeight: '600' as const,
      marginTop: spacing.md,
      marginBottom: spacing.sm,
    },
    emptySubtitle: {
      fontSize: typography.fontSizes.md,
      textAlign: 'center',
      lineHeight: typography.lineHeights.relaxed * typography.fontSizes.md,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {renderHeader()}
        
        <View style={styles.listContainer}>
          <FlatList
            data={filteredContacts}
            renderItem={renderContact}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyState}
          />
        </View>

        <CameraFAB onPress={handleCameraPress} />
      </View>
    </SafeAreaView>
  );
}; 