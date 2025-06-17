import React from 'react';
import {
  View,
  TextInput,
  ViewStyle,
  TextStyle,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTheme, typography, spacing, borderRadius } from '@/constants/theme';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = '連絡先を検索...',
  style,
  inputStyle,
  onFocus,
  onBlur,
}) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface.card,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    minHeight: 44,
    borderWidth: 1,
    borderColor: theme.colors.border,
  };

  const inputTextStyle: TextStyle = {
    flex: 1,
    fontSize: typography.fontSizes.md,
    color: theme.colors.text.primary,
    marginLeft: spacing.sm,
  };

  return (
    <View style={[containerStyle, style]}>
      <Ionicons 
        name="search" 
        size={20} 
        color={theme.colors.text.secondary} 
      />
      <TextInput
        style={[inputTextStyle, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.secondary}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <Ionicons 
          name="close-circle" 
          size={20} 
          color={theme.colors.text.secondary}
          onPress={() => onChangeText('')}
        />
      )}
    </View>
  );
}; 