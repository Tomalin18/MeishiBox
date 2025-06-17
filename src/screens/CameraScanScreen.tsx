import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { NavigationProps } from '@/types';
import { getTheme, typography, spacing, borderRadius, commonStyles } from '@/constants/theme';
import { processBusinessCard } from '@/services/ocrService';
import { useContactActions } from '@/store/contactStore';
import { useSubscriptionActions } from '@/store/subscriptionStore';

type CameraScanScreenProps = NavigationProps<'CameraScan'>;

export const CameraScanScreen: React.FC<CameraScanScreenProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');
  
  const [isLandscape, setIsLandscape] = useState(false);
  const [flashMode, setFlashMode] = useState<'off' | 'on' | 'auto'>('off');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { addContact } = useContactActions();
  const { updateScansRemaining } = useSubscriptionActions();

  // Animation for camera frame
  const frameOpacity = useSharedValue(0.5);
  const { width, height } = Dimensions.get('window');

  React.useEffect(() => {
    frameOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0.5, { duration: 1500 })
      ),
      -1,
      false
    );
  }, []);

  const frameAnimatedStyle = useAnimatedStyle(() => ({
    opacity: frameOpacity.value,
  }));

  const handleClose = () => {
    navigation.goBack();
  };

  const handleCapture = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      
      // Simulate camera capture and OCR processing
      const mockImageUri = 'mock://business-card-image.jpg';
      const contact = await processBusinessCard(mockImageUri);
      
      // Add contact to store
      addContact(contact);
      
      // Update scan count
      updateScansRemaining(-1);
      
      // Navigate to edit screen
      navigation.replace('ContactEdit', { contactId: contact.id });
      
    } catch (error) {
      Alert.alert('エラー', '名刺の処理中にエラーが発生しました。');
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleFlash = () => {
    const modes: Array<'off' | 'on' | 'auto'> = ['off', 'on', 'auto'];
    const currentIndex = modes.indexOf(flashMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setFlashMode(modes[nextIndex]);
  };

  const getFlashIcon = () => {
    switch (flashMode) {
      case 'on':
        return 'flash';
      case 'auto':
        return 'flash-off';
      default:
        return 'flash-off';
    }
  };

  const styles = StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: '#000000',
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingTop: spacing.xl,
    },
    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraViewport: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    instructionText: {
      fontSize: typography.fontSizes.lg,
      color: theme.colors.cameraGuide,
      textAlign: 'center',
      marginBottom: spacing.lg,
      paddingHorizontal: spacing.lg,
    },
    cardFrame: {
      width: isLandscape ? 300 : 280,
      height: isLandscape ? 180 : 160,
      borderWidth: 2,
      borderColor: theme.colors.cameraGuide,
      borderRadius: borderRadius.md,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
    },
    frameCorner: {
      position: 'absolute',
      width: 20,
      height: 20,
      borderColor: theme.colors.cameraGuide,
      borderWidth: 3,
    },
    cornerTopLeft: {
      top: -3,
      left: -3,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    cornerTopRight: {
      top: -3,
      right: -3,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
    },
    cornerBottomLeft: {
      bottom: -3,
      left: -3,
      borderRightWidth: 0,
      borderTopWidth: 0,
    },
    cornerBottomRight: {
      bottom: -3,
      right: -3,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    bottomControls: {
      position: 'absolute',
      bottom: spacing.xl,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.xl,
    },
    controlButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    captureButton: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 4,
      borderColor: theme.colors.cameraGuide,
    },
    captureButtonInner: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.primary,
    },
    orientationToggle: {
      position: 'absolute',
      bottom: spacing.xxxl,
      alignSelf: 'center',
      flexDirection: 'row',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: borderRadius.full,
      padding: spacing.xs,
    },
    orientationOption: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.full,
    },
    orientationText: {
      color: theme.colors.cameraGuide,
      fontSize: typography.fontSizes.sm,
    },
    processingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
    processingText: {
      color: theme.colors.cameraGuide,
      fontSize: typography.fontSizes.lg,
      marginTop: spacing.md,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={24} color={theme.colors.cameraGuide} />
        </TouchableOpacity>
      </View>

      {/* Camera Viewport */}
      <View style={styles.cameraViewport}>
        <Text style={styles.instructionText}>
          枠内に名刺を置いてください
        </Text>
        
        {/* Card Frame with animation */}
        <Animated.View style={[styles.cardFrame, frameAnimatedStyle]}>
          <View style={[styles.frameCorner, styles.cornerTopLeft]} />
          <View style={[styles.frameCorner, styles.cornerTopRight]} />
          <View style={[styles.frameCorner, styles.cornerBottomLeft]} />
          <View style={[styles.frameCorner, styles.cornerBottomRight]} />
        </Animated.View>
      </View>

      {/* Orientation Toggle */}
      <View style={styles.orientationToggle}>
        <TouchableOpacity 
          style={[
            styles.orientationOption,
            { backgroundColor: isLandscape ? theme.colors.primary : 'transparent' }
          ]}
          onPress={() => setIsLandscape(true)}
        >
          <Text style={styles.orientationText}>横向き</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.orientationOption,
            { backgroundColor: !isLandscape ? theme.colors.primary : 'transparent' }
          ]}
          onPress={() => setIsLandscape(false)}
        >
          <Text style={styles.orientationText}>縦向き</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="images" size={24} color={theme.colors.cameraGuide} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.captureButton} 
          onPress={handleCapture}
          disabled={isProcessing}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
          <Ionicons name={getFlashIcon()} size={24} color={theme.colors.cameraGuide} />
        </TouchableOpacity>
      </View>

      {/* Processing Overlay */}
      {isProcessing && (
        <View style={styles.processingOverlay}>
          <Ionicons name="scan" size={64} color={theme.colors.primary} />
          <Text style={styles.processingText}>名刺を処理中...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}; 