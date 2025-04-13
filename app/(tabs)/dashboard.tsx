import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();
  const [recentDocuments, setRecentDocuments] = useState([
    { id: 1, name: 'Exam Results 2023.pdf', date: '2023-10-15', type: 'pdf' },
    { id: 2, name: 'Student Marksheet.docx', date: '2023-09-22', type: 'word' },
    { id: 3, name: 'Class Results.jpg', date: '2023-08-12', type: 'image' },
  ]);
  
  const [stats, setStats] = useState({
    scanned: 24,
    converted: 18,
    pending: 3
  });

  const navigateToScanner = () => {
    router.push('/(tabs)/scanner');
  };

  const getIconForDocType = (type: string) => {
    switch(type) {
      case 'pdf':
        return <MaterialCommunityIcons name="file-pdf-box" size={28} color="#FF5252" />;
      case 'word':
        return <MaterialCommunityIcons name="file-word-box" size={28} color="#4285F4" />;
      case 'image':
        return <MaterialCommunityIcons name="file-image-outline" size={28} color="#43A047" />;
      default:
        return <MaterialCommunityIcons name="file-outline" size={28} color="#9E9E9E" />;
    }
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, John!</Text>
          <TouchableOpacity onPress={() => router.push('/profile')} style={styles.profileButton}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileInitial}>J</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <GlassmorphicCard style={styles.statCard}>
            <View style={styles.statContent}>
              <MaterialCommunityIcons name="file-document-outline" size={24} color="#56CCF2" />
              <Text style={styles.statValue}>{stats.scanned}</Text>
              <Text style={styles.statLabel}>Scanned</Text>
            </View>
          </GlassmorphicCard>
          
          <GlassmorphicCard style={styles.statCard}>
            <View style={styles.statContent}>
              <MaterialCommunityIcons name="file-export-outline" size={24} color="#B76EFF" />
              <Text style={styles.statValue}>{stats.converted}</Text>
              <Text style={styles.statLabel}>Converted</Text>
            </View>
          </GlassmorphicCard>
          
          <GlassmorphicCard style={styles.statCard}>
            <View style={styles.statContent}>
              <MaterialCommunityIcons name="clock-outline" size={24} color="#FFA726" />
              <Text style={styles.statValue}>{stats.pending}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </GlassmorphicCard>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={navigateToScanner}>
            <GlassmorphicCard style={styles.actionCard}>
              <View style={styles.actionContent}>
                <View style={styles.actionIconContainer}>
                  <MaterialCommunityIcons name="file-document-outline" size={32} color="#56CCF2" />
                </View>
                <Text style={styles.actionLabel}>New Scan</Text>
              </View>
            </GlassmorphicCard>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <GlassmorphicCard style={styles.actionCard}>
              <View style={styles.actionContent}>
                <View style={styles.actionIconContainer}>
                  <MaterialCommunityIcons name="upload-outline" size={32} color="#B76EFF" />
                </View>
                <Text style={styles.actionLabel}>Upload</Text>
              </View>
            </GlassmorphicCard>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <GlassmorphicCard style={styles.actionCard}>
              <View style={styles.actionContent}>
                <View style={styles.actionIconContainer}>
                  <MaterialCommunityIcons name="file-table-outline" size={32} color="#FFA726" />
                </View>
                <Text style={styles.actionLabel}>Templates</Text>
              </View>
            </GlassmorphicCard>
          </TouchableOpacity>
        </View>

        {/* Recent Documents */}
        <Text style={styles.sectionTitle}>Recent Documents</Text>
        <GlassmorphicCard style={styles.documentsCard}>
          {recentDocuments.map((doc) => (
            <View key={doc.id} style={styles.documentItem}>
              {getIconForDocType(doc.type)}
              <View style={styles.documentInfo}>
                <Text style={styles.documentName}>{doc.name}</Text>
                <Text style={styles.documentDate}>Processed on {doc.date}</Text>
              </View>
              <TouchableOpacity style={styles.documentAction}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color="#e0e0e0" />
              </TouchableOpacity>
            </View>
          ))}
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Documents</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#56CCF2" />
          </TouchableOpacity>
        </GlassmorphicCard>
      </ScrollView>
    </GradientBackground>
  );
}

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileButton: {
    padding: 4,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(183, 110, 255, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(183, 110, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    minHeight: 90,
  },
  statContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#e0e0e0',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    marginLeft: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionCard: {
    width: (width - 32 - 16) / 3,
    padding: 12,
    minHeight: 100,
  },
  actionContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  documentsCard: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: 16,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  documentName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  documentDate: {
    fontSize: 12,
    color: '#e0e0e0',
    marginTop: 2,
  },
  documentAction: {
    padding: 4,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
  },
  viewAllText: {
    fontSize: 14,
    color: '#56CCF2',
    fontWeight: '500',
    marginRight: 4,
  },
}); 