import React from 'react';
import { StyleSheet, ViewProps, View, Platform } from 'react-native';

interface GradientBackgroundProps extends ViewProps {
  colors?: string[];
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  style,
  colors,
  ...rest
}) => {
  return (
    <View
      style={[styles.container, style]}
      {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.select({
      ios: '#1a1a2e',
      android: '#1a1a2e',
      web: '#1a1a2e',
      default: '#1a1a2e'
    }),
    ...Platform.select({
      web: {
        background: 'linear-gradient(to bottom, #1a1a2e, #16213e, #0f3460)',
      }
    })
  },
}); 