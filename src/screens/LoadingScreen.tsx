import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
} from 'react-native-reanimated';
import { NavigationProps } from '@/types';
import { getTheme, typography, spacing, commonStyles } from '@/constants/theme';
import { useAppActions, useIsFirstLaunch } from '@/store/appStore';
import { useSubscriptionActions } from '@/store/subscriptionStore';

type LoadingScreenProps = NavigationProps<'Loading'>;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');
  const isFirstLaunch = useIsFirstLaunch();
  const { setFirstLaunch } = useAppActions();
  const { checkSubscriptionStatus } = useSubscriptionActions();

  // Animation values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const loadingOpacity = useSharedValue(0);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const loadingAnimatedStyle = useAnimatedStyle(() => ({
    opacity: loadingOpacity.value,
  }));

  useEffect(() => {
    // Start animations
    logoOpacity.value = withTiming(1, { duration: 800 });
    logoScale.value = withTiming(1, { duration: 800 });
    
    loadingOpacity.value = withDelay(
      300,
      withTiming(1, { duration: 400 })
    );

    // Initialize app
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Check subscription status
      await checkSubscriptionStatus();
      
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to appropriate screen
      if (isFirstLaunch) {
        setFirstLaunch(false);
        navigation.replace('Subscription');
      } else {
        navigation.replace('MainTabs');
      }
    } catch (error) {
      console.error('App initialization failed:', error);
      // Navigate to main app anyway
      navigation.replace('MainTabs');
    }
  };

  const styles = StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: theme.colors.background.light,
      ...commonStyles.centerContent,
    },
    logoContainer: {
      ...commonStyles.centerContent,
      marginBottom: spacing.xl,
    },
    icon: {
      marginBottom: spacing.md,
    },
    appName: {
      fontSize: typography.fontSizes.xxxl,
      fontWeight: '700' as const,
      color: theme.colors.text.primary,
      marginTop: spacing.sm,
    },
    loadingContainer: {
      ...commonStyles.centerContent,
      marginTop: spacing.lg,
    },
    loadingText: {
      fontSize: typography.fontSizes.md,
      color: theme.colors.text.secondary,
      marginTop: spacing.sm,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={commonStyles.centerContent}>
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <View style={styles.icon}>
            <Ionicons 
              name="card" 
              size={120} 
              color={theme.colors.primary} 
            />
          </View>
          <Text style={styles.appName}>MeishiBox</Text>
        </Animated.View>

        <Animated.View style={[styles.loadingContainer, loadingAnimatedStyle]}>
          <ActivityIndicator 
            size="large" 
            color={theme.colors.primary} 
          />
          <Text style={styles.loadingText}>Loading...</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}; 