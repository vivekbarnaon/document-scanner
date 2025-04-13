import React from 'react';
import { Text, StyleSheet, Pressable, ViewStyle, TextStyle, View, Platform } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradientColors?: string[];
  hapticFeedback?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  gradientColors,
  hapticFeedback = true,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
  };

  const handlePress = () => {
    // Only use haptics on iOS and Android, not on web
    if (hapticFeedback && Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {
          // Silently fail if haptics not available
        });
      } catch (error) {
        // Ignore haptics errors
      }
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        styles.container,
        pressed && Platform.OS !== 'web' ? { opacity: 0.9 } : {}
      ]}>
      <Animated.View style={[styles.animatedContainer, animatedStyle, style]}>
        <View style={styles.gradient}>
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  animatedContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: Platform.select({
      ios: '#4cc9f0',
      android: '#4cc9f0',
      web: '#4cc9f0',
      default: '#4cc9f0'
    }),
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#4cc9f0',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      web: {
        boxShadow: '0 0 10px rgba(76, 201, 240, 0.5)',
      }
    }),
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 