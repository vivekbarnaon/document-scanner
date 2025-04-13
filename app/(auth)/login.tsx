import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { GradientButton } from '@/components/ui/GradientButton';
import { GlassInput } from '@/components/ui/GlassInput';
import { BlurView } from 'expo-blur';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }
    
    // For demo purpose - direct login to dashboard
    router.replace('/(tabs)/dashboard');
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Document Scanner</Text>
          <Text style={styles.subtitle}>Login to your account</Text>
        </View>

        <GlassmorphicCard style={styles.card}>
          <View style={styles.form}>
            <GlassInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <GlassInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <GradientButton
              title="Login"
              onPress={handleLogin}
              style={styles.button}
            />
            
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Don't have an account? </Text>
              <Link href="/(auth)/signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.link}>Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </GlassmorphicCard>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e0e0',
  },
  card: {
    width: '100%',
  },
  form: {
    width: '100%',
    gap: 16,
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    color: '#f72585',
    marginTop: 10,
    textAlign: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#e0e0e0',
  },
  link: {
    color: '#4cc9f0',
    fontWeight: 'bold',
  },
}); 