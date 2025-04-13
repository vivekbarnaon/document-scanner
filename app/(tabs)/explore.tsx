import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Sample history data
const historyData = [
  {
    id: '1',
    fileName: 'ExamResults_Spring2023.pdf',
    date: '2023-05-15',
    type: 'pdf',
    status: 'completed',
  },
  {
    id: '2',
    fileName: 'StudentMarks_Fall2023.pdf',
    date: '2023-12-10',
    type: 'pdf',
    status: 'completed',
  },
  {
    id: '3',
    fileName: 'ScanDoc_20240125.jpg',
    date: '2024-01-25',
    type: 'image',
    status: 'completed',
  },
];

export default function HistoryScreen() {
  const renderHistoryItem = ({ item }: { item: typeof historyData[0] }) => {
    return (
      <GlassmorphicCard style={styles.historyCard} onPress={() => alert(`Viewing ${item.fileName}`)}>
        <View style={styles.historyItemContainer}>
          <View style={styles.iconContainer}>
            {item.type === 'pdf' ? (
              <MaterialCommunityIcons name="file-pdf-box" size={40} color="#4cc9f0" />
            ) : (
              <MaterialCommunityIcons name="file-image" size={40} color="#4cc9f0" />
            )}
          </View>
          
          <View style={styles.contentContainer}>
            <Text style={styles.fileName}>{item.fileName}</Text>
            <Text style={styles.fileDate}>Converted on {item.date}</Text>
            <View style={styles.statusContainer}>
              <MaterialCommunityIcons 
                name="check-circle" 
                size={16} 
                color="#4caf50" 
                style={styles.statusIcon} 
              />
              <Text style={styles.statusText}>Converted</Text>
            </View>
          </View>
          
          <MaterialCommunityIcons name="chevron-right" size={24} color="#e0e0e0" />
        </View>
      </GlassmorphicCard>
    );
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Conversion History</Text>
        
        {historyData.length > 0 ? (
          <FlatList
            data={historyData}
            renderItem={renderHistoryItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <GlassmorphicCard style={styles.emptyCard}>
            <MaterialCommunityIcons name="history" size={50} color="#4cc9f0" />
            <Text style={styles.emptyText}>No conversion history yet</Text>
            <Text style={styles.emptySubtext}>
              Your converted documents will appear here
            </Text>
          </GlassmorphicCard>
        )}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  historyCard: {
    marginBottom: 12,
  },
  historyItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  iconContainer: {
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  fileDate: {
    fontSize: 14,
    color: '#e0e0e0',
    marginBottom: 6,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#4caf50',
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 8,
    textAlign: 'center',
  },
});
