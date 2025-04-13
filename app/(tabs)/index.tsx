import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  
  const handleGetStarted = () => {
    router.push('/(auth)/login');
  };
  
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.appTitle, {color: '#56CCF2'}]}>Document </Text>
            <Text style={[styles.appTitle, {color: '#B76EFF'}]}>Scanner</Text>
          </View>
          <MaterialCommunityIcons name="file-document-outline" size={80} color="#56CCF2" style={styles.appIcon} />
        </View>
        
        <GlassmorphicCard style={styles.welcomeCard}>
          <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <ThemedText 
              style={styles.title}
              lightColor={'#ffffff'}
              darkColor={'#ffffff'}
              type="title">
              Welcome!
            </ThemedText>
          </View>
          
          <ThemedText 
            style={styles.subtitle}
            lightColor={'#e0e0e0'}
            darkColor={'#e0e0e0'}>
            Your document scanner powered by AI
          </ThemedText>

          <GradientButton
            title="Get Started"
            onPress={handleGetStarted}
            style={styles.getStartedButton}
          />
        </GlassmorphicCard>
        
        <Text style={styles.featuresTitle}>Key Features</Text>
        
        <GlassmorphicCard style={styles.card}>
          <View style={styles.featureRow}>
            <MaterialCommunityIcons name="file-document-outline" size={24} color="#4cc9f0" />
            <View style={styles.featureTextContainer}>
              <ThemedText 
                type="subtitle"
                style={styles.cardTitle}
                lightColor={'#ffffff'}
                darkColor={'#ffffff'}>
                Scan Documents
              </ThemedText>
              
              <ThemedText
                lightColor={'#e0e0e0'}
                darkColor={'#e0e0e0'}
                style={styles.cardText}>
                Scan images or PDFs and extract structured data with high accuracy
              </ThemedText>
            </View>
          </View>
        </GlassmorphicCard>

        <GlassmorphicCard style={styles.card}>
          <View style={styles.featureRow}>
            <MaterialCommunityIcons name="table" size={24} color="#4cc9f0" />
            <View style={styles.featureTextContainer}>
              <ThemedText 
                type="subtitle"
                style={styles.cardTitle}
                lightColor={'#ffffff'}
                darkColor={'#ffffff'}>
                Generate Tables
              </ThemedText>
              
              <ThemedText
                lightColor={'#e0e0e0'}
                darkColor={'#e0e0e0'}
                style={styles.cardText}>
                Automated semester-wise student marks table generation for exam departments
              </ThemedText>
            </View>
          </View>
        </GlassmorphicCard>

        <GlassmorphicCard style={styles.card}>
          <View style={styles.featureRow}>
            <MaterialCommunityIcons name="file-export-outline" size={24} color="#4cc9f0" />
            <View style={styles.featureTextContainer}>
              <ThemedText 
                type="subtitle"
                style={styles.cardTitle}
                lightColor={'#ffffff'}
                darkColor={'#ffffff'}>
                Export to CSV
              </ThemedText>
              
              <ThemedText
                lightColor={'#e0e0e0'}
                darkColor={'#e0e0e0'}
                style={styles.cardText}>
                Convert extracted data into well-formatted CSV files for easy management
              </ThemedText>
            </View>
          </View>
        </GlassmorphicCard>

        <GlassmorphicCard style={styles.card}>
          <View style={styles.featureRow}>
            <MaterialCommunityIcons name="history" size={24} color="#4cc9f0" />
            <View style={styles.featureTextContainer}>
              <ThemedText 
                type="subtitle"
                style={styles.cardTitle}
                lightColor={'#ffffff'}
                darkColor={'#ffffff'}>
                Smart Reusability
              </ThemedText>
              
              <ThemedText
                lightColor={'#e0e0e0'}
                darkColor={'#e0e0e0'}
                style={styles.cardText}>
                Reuse previously converted CSVs if similar document data is detected
              </ThemedText>
            </View>
          </View>
        </GlassmorphicCard>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  headerContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'column',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: 'rgba(86, 204, 242, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  appIcon: {
    marginBottom: 12,
  },
  welcomeCard: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  featuresTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e0e0',
    marginTop: 8,
    marginBottom: 16,
  },
  getStartedButton: {
    marginTop: 8,
  },
  card: {
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  cardTitle: {
    marginBottom: 8,
    color: '#ffffff',
  },
  cardText: {
    marginBottom: 16,
    color: '#e0e0e0',
  },
  button: {
    marginTop: 8,
  },
});
