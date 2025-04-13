import React from 'react';
import { View, ViewProps, StyleSheet, Pressable, Platform } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { DeepSiteColors, DeepSiteStyles } from '@/constants/DeepSiteTheme';

interface GlassmorphicCardProps extends ViewProps {
  onPress?: () => void;
  noBorder?: boolean;
  noShadow?: boolean;
  animated?: boolean;
}

export const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  style,
  onPress,
  noBorder = false,
  noShadow = false,
  animated = true,
  ...rest
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (animated && onPress) {
      scale.value = withSpring(0.98, { damping: 10, stiffness: 100 });
    }
  };

  const handlePressOut = () => {
    if (animated && onPress) {
      scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    }
  };

  const cardContent = (
    <View
      style={[
        styles.card,
        !noShadow && Platform.OS === 'ios' ? styles.shadowIOS : null,
        !noShadow && Platform.OS === 'android' ? styles.shadowAndroid : null,
        !noShadow && Platform.OS === 'web' ? styles.shadowWeb : null,
        noBorder ? {} : styles.border,
        style,
      ]}
      {...rest}>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );

  if (!onPress) {
    return cardContent;
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        styles.pressable,
        pressed && Platform.OS !== 'web' ? { opacity: 0.9 } : {}
      ]}>
      <Animated.View style={animated ? animatedStyle : undefined}>
        {cardContent}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Platform.select({
      ios: 'rgba(30, 30, 60, 0.65)',
      android: 'rgba(30, 30, 60, 0.85)', // Less transparent on Android
      web: 'rgba(30, 30, 60, 0.65)',
      default: 'rgba(30, 30, 60, 0.75)',
    }),
  },
  border: {
    borderWidth: 1,
    borderColor: 'rgba(76, 201, 240, 0.3)',
  },
  content: {
    padding: 16,
    overflow: 'hidden',
  },
  shadowIOS: {
    shadowColor: '#4cc9f0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  shadowAndroid: {
    elevation: 4,
  },
  shadowWeb: {
    boxShadow: '0 0 10px rgba(76, 201, 240, 0.5)',
  },
  pressable: {
    // Additional styles for the pressable container
  }
}); 