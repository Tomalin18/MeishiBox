import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ViewStyle,
  useColorScheme,
  GestureResponderEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Contact } from '@/types';
import { getTheme, typography, spacing, borderRadius } from '@/constants/theme';
import { getInitials, getContactDisplayName } from '@/utils/helpers';

interface ContactCardProps {
  contact: Contact;
  onPress: (contact: Contact) => void;
  style?: ViewStyle;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onPress,
  style,
}) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');

  const handlePress = (event: GestureResponderEvent) => {
    onPress(contact);
  };

  const containerStyle: ViewStyle = {
    backgroundColor: theme.colors.surface.light,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    ...theme.shadows.medium,
  };

  const contentStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
  };

  const avatarContainerStyle: ViewStyle = {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: theme.colors.surface.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  };

  const textContainerStyle: ViewStyle = {
    flex: 1,
  };

  const nameStyle = {
    fontSize: typography.fontSizes.md,
    fontWeight: '600' as const,
    color: theme.colors.text.primary,
  };

  const companyStyle = {
    fontSize: typography.fontSizes.sm,
    color: theme.colors.text.secondary,
    marginTop: spacing.xs,
  };

  const actionButtonStyle: ViewStyle = {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    minWidth: 60,
    alignItems: 'center',
  };

  const actionButtonTextStyle = {
    color: theme.colors.text.inverse,
    fontSize: typography.fontSizes.sm,
    fontWeight: '500' as const,
  };

  const renderAvatar = () => {
    if (contact.avatar) {
      return (
        <Image 
          source={{ uri: contact.avatar }} 
          style={{ 
            width: 48, 
            height: 48, 
            borderRadius: borderRadius.md 
          }} 
        />
      );
    }

    return (
      <View style={avatarContainerStyle}>
        <Text style={{
          fontSize: typography.fontSizes.lg,
          fontWeight: '600' as const,
          color: theme.colors.primary,
        }}>
          {getInitials(contact.name || contact.company)}
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={handlePress}
      activeOpacity={0.95}
    >
      <View style={contentStyle}>
        {renderAvatar()}
        <View style={textContainerStyle}>
          <Text style={nameStyle} numberOfLines={1}>
            {getContactDisplayName(contact)}
          </Text>
          {contact.company && (
            <Text style={companyStyle} numberOfLines={1}>
              {contact.company}
            </Text>
          )}
          {contact.position && (
            <Text style={companyStyle} numberOfLines={1}>
              {contact.position}
            </Text>
          )}
        </View>
        <TouchableOpacity style={actionButtonStyle}>
          <Text style={actionButtonTextStyle}>開く</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}; 