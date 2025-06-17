import React from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  useColorScheme,
  GestureResponderEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { getTheme, spacing } from '@/constants/theme';

interface CameraFABProps {
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  size?: number;
  disabled?: boolean;
}

export const CameraFAB: React.FC<CameraFABProps> = ({
  onPress,
  style,
  size = 56,
  disabled = false,
}) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = (event: GestureResponderEvent) => {
    if (disabled) return;
    
    scale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    onPress(event);
  };

  const fabStyle: ViewStyle = {
    position: 'absolute',
    bottom: spacing.lg + 80, // Account for tab bar
    alignSelf: 'center',
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: disabled ? theme.colors.text.disabled : theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.large,
  };

  return (
    <Animated.View style={[fabStyle, animatedStyle, style]}>
      <TouchableOpacity
        style={{ 
          width: '100%', 
          height: '100%', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Ionicons 
          name="camera" 
          size={24} 
          color={theme.colors.text.inverse} 
        />
      </TouchableOpacity>
    </Animated.View>
  );
}; 