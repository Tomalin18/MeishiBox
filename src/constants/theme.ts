import { Theme, Typography, Spacing, BorderRadius } from '@/types';

const baseColors = {
  primary: '#FF6B35',
  primaryLight: '#FF8A5C',
  primaryDark: '#E55A2B',
  secondary: '#F5F5F5',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const lightTheme: Theme = {
  colors: {
    primary: baseColors.primary,
    primaryLight: baseColors.primaryLight,
    primaryDark: baseColors.primaryDark,
    secondary: baseColors.secondary,
    background: {
      light: '#FFFFFF',
      dark: '#F8F8F8',
    },
    surface: {
      light: '#FFFFFF',
      dark: '#F0F0F0',
      card: '#FAFAFA',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#999999',
      inverse: '#FFFFFF',
    },
    status: {
      success: baseColors.success,
      warning: baseColors.warning,
      error: baseColors.error,
      info: baseColors.info,
    },
    border: '#E0E0E0',
    overlay: 'rgba(0, 0, 0, 0.5)',
    cameraGuide: '#FFFFFF',
    scanFrame: 'rgba(255, 255, 255, 0.8)',
  },
  shadows: {
    small: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: baseColors.primary,
    primaryLight: baseColors.primaryLight,
    primaryDark: baseColors.primaryDark,
    secondary: '#2A2A2A',
    background: {
      light: '#1A1A1A',
      dark: '#000000',
    },
    surface: {
      light: '#2A2A2A',
      dark: '#1A1A1A',
      card: '#333333',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      disabled: '#666666',
      inverse: '#333333',
    },
    status: {
      success: baseColors.success,
      warning: baseColors.warning,
      error: baseColors.error,
      info: baseColors.info,
    },
    border: '#333333',
    overlay: 'rgba(0, 0, 0, 0.7)',
    cameraGuide: '#FFFFFF',
    scanFrame: 'rgba(255, 255, 255, 0.8)',
  },
  shadows: {
    small: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.5,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

export const typography: Typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing: Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const borderRadius: BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

// Helper functions
export const getTheme = (isDark: boolean): Theme => {
  return isDark ? darkTheme : lightTheme;
};

export const createShadow = (
  offset: { width: number; height: number },
  opacity: number,
  radius: number,
  elevation: number = 0
) => ({
  shadowOffset: offset,
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation,
});

// Common styles
export const commonStyles = {
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  row: {
    flexDirection: 'row' as const,
  },
  column: {
    flexDirection: 'column' as const,
  },
  spaceBetween: {
    justifyContent: 'space-between' as const,
  },
  spaceAround: {
    justifyContent: 'space-around' as const,
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
}; 