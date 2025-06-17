import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { getTheme, typography, spacing, borderRadius } from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: borderRadius.lg,
      minHeight: getSizeHeight(),
      paddingHorizontal: getSizePadding(),
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? theme.colors.text.disabled : theme.colors.primary,
          ...theme.shadows.small,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? theme.colors.text.disabled : theme.colors.surface.card,
          borderWidth: 1,
          borderColor: theme.colors.border,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: disabled ? theme.colors.text.disabled : theme.colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontSize: getSizeFontSize(),
      fontWeight: '600' as const,
      textAlign: 'center',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseTextStyle,
          color: theme.colors.text.inverse,
        };
      case 'secondary':
        return {
          ...baseTextStyle,
          color: theme.colors.text.primary,
        };
      case 'outline':
        return {
          ...baseTextStyle,
          color: disabled ? theme.colors.text.disabled : theme.colors.primary,
        };
      case 'ghost':
        return {
          ...baseTextStyle,
          color: disabled ? theme.colors.text.disabled : theme.colors.primary,
        };
      default:
        return baseTextStyle;
    }
  };

  const getSizeHeight = (): number => {
    switch (size) {
      case 'small':
        return 36;
      case 'medium':
        return 48;
      case 'large':
        return 56;
      default:
        return 48;
    }
  };

  const getSizePadding = (): number => {
    switch (size) {
      case 'small':
        return spacing.md;
      case 'medium':
        return spacing.lg;
      case 'large':
        return spacing.xl;
      default:
        return spacing.lg;
    }
  };

  const getSizeFontSize = (): number => {
    switch (size) {
      case 'small':
        return typography.fontSizes.sm;
      case 'medium':
        return typography.fontSizes.md;
      case 'large':
        return typography.fontSizes.lg;
      default:
        return typography.fontSizes.md;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? theme.colors.text.inverse : theme.colors.primary} 
          size="small" 
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}; 