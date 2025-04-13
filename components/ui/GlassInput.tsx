import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View, Text, Platform } from 'react-native';

interface GlassInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  label,
  error,
  style,
  placeholderTextColor = 'rgba(255, 255, 255, 0.6)',
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={placeholderTextColor}
          selectionColor={'#4cc9f0'}
          {...props}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    color: '#e0e0e0',
    marginBottom: 8,
    fontSize: 14,
  },
  inputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(76, 201, 240, 0.5)',
    overflow: 'hidden',
    backgroundColor: 'rgba(20, 20, 40, 0.65)',
    ...Platform.select({
      ios: {
        shadowColor: '#4cc9f0',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 2,
      }
    }),
  },
  input: {
    color: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    fontSize: 16,
  },
  error: {
    color: '#f72585',
    marginTop: 4,
    fontSize: 12,
  },
}); 