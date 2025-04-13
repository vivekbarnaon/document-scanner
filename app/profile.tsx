import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  
  // Mock user data - would come from auth context in real app
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "May 2023",
    documentsConverted: 12
  };

  const handleLogout = () => {
    // In a real app, clear auth tokens/state here
    router.replace('/(auth)/login');
  };

  const navigateBack = () => {
    router.back();
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{userData.name.charAt(0)}</Text>
            </View>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
          </View>

          <GlassmorphicCard style={styles.infoCard}>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="calendar-month" size={24} color="#4cc9f0" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Member Since</Text>
                <Text style={styles.infoValue}>{userData.joinDate}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="file-document-multiple" size={24} color="#4cc9f0" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Documents Converted</Text>
                <Text style={styles.infoValue}>{userData.documentsConverted}</Text>
              </View>
            </View>
          </GlassmorphicCard>

          <GlassmorphicCard style={styles.settingsCard}>
            <Text style={styles.settingsTitle}>Settings</Text>
            
            <TouchableOpacity style={styles.settingsRow}>
              <MaterialCommunityIcons name="bell-outline" size={24} color="#4cc9f0" />
              <Text style={styles.settingsText}>Notifications</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#e0e0e0" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingsRow}>
              <MaterialCommunityIcons name="shield-outline" size={24} color="#4cc9f0" />
              <Text style={styles.settingsText}>Privacy</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#e0e0e0" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingsRow}>
              <MaterialCommunityIcons name="help-circle-outline" size={24} color="#4cc9f0" />
              <Text style={styles.settingsText}>Help & Support</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#e0e0e0" />
            </TouchableOpacity>
          </GlassmorphicCard>

          <GradientButton
            title="Logout"
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(76, 201, 240, 0.3)',
    borderWidth: 2,
    borderColor: 'rgba(76, 201, 240, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  infoCard: {
    marginBottom: 24,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#e0e0e0',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  settingsCard: {
    marginBottom: 24,
    padding: 16,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingsText: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoutButton: {
    marginTop: 8,
  },
}); 