import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Platform, Share } from 'react-native';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';

type DocumentData = {
  uri: string;
  name?: string;
  mimeType?: string;
} | null;

export default function ScannerScreen() {
  const router = useRouter();
  const [scannedDocument, setScannedDocument] = useState<DocumentData>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // Mock user data - would come from auth context in real app
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com"
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });
      
      if (result.canceled === false) {
        // Document picked
        setScannedDocument(result.assets[0]);
        setShowPreview(true);
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  const takePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        alert('Camera permission is required to take photos!');
        return;
      }
      
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
      });
      
      if (!result.canceled) {
        setScannedDocument(result.assets[0]);
        setShowPreview(true);
      }
    } catch (error) {
      console.log('Error taking photo:', error);
    }
  };

  const convertToCSV = () => {
    // Simulated conversion
    alert('CSV conversion completed successfully!');
    setShowPreview(false);
  };

  const saveDocument = async () => {
    if (!scannedDocument) return;
    
    try {
      // Request permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Sorry, we need media library permissions to save files.');
        return;
      }
      
      // For images, save directly
      if (scannedDocument.mimeType?.includes('image')) {
        const asset = await MediaLibrary.createAssetAsync(scannedDocument.uri);
        await MediaLibrary.createAlbumAsync('DocumentScanner', asset, false);
        alert('Image saved to gallery!');
      } else {
        // For documents, create a copy in app's documents directory
        const documentName = scannedDocument.name || 'document.pdf';
        const destinationUri = FileSystem.documentDirectory + documentName;
        
        await FileSystem.copyAsync({
          from: scannedDocument.uri,
          to: destinationUri
        });
        
        alert(`Document saved as ${documentName}\nLocation: App Documents folder`);
      }
    } catch (error) {
      console.log('Error saving document:', error);
      alert('Failed to save document.');
    }
  };

  const shareDocument = async () => {
    if (!scannedDocument) return;
    
    try {
      const result = await Share.share({
        url: scannedDocument.uri,
        title: scannedDocument.name || 'Scanned Document',
      });
    } catch (error) {
      console.log('Error sharing document:', error);
      alert('Failed to share document.');
    }
  };

  const navigateToProfile = () => {
    // For mobile compatibility, use push instead of navigate
    router.push("/profile");
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Document Scanner</Text>
          <TouchableOpacity 
            style={styles.profileButton} 
            onPress={navigateToProfile}
          >
            <View style={styles.profileIconContainer}>
              <Text style={styles.profileInitials}>{userData.name.charAt(0)}</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {showPreview ? (
            <View style={styles.previewContainer}>
              <GlassmorphicCard style={styles.previewCard}>
                <Text style={styles.previewTitle}>Document Preview</Text>
                {scannedDocument?.mimeType?.includes('image') ? (
                  <Image 
                    source={{ uri: scannedDocument.uri }} 
                    style={styles.previewImage}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={styles.pdfPreview}>
                    <MaterialCommunityIcons 
                      name={scannedDocument?.mimeType?.includes('pdf') ? "file-pdf-box" : "file-word-box"} 
                      size={80} 
                      color="#4cc9f0" 
                    />
                    <Text style={styles.pdfText}>{scannedDocument?.name || 'Document'}</Text>
                  </View>
                )}
                
                <View style={styles.divider} />
                
                <View style={styles.actionButtonRow}>
                  <TouchableOpacity style={styles.actionButton} onPress={saveDocument}>
                    <View style={styles.actionIconContainer}>
                      <MaterialCommunityIcons name="content-save-outline" size={20} color="#4cc9f0" />
                    </View>
                    <Text style={styles.actionButtonText}>Save</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.actionButton} onPress={shareDocument}>
                    <View style={styles.actionIconContainer}>
                      <Feather name="share-2" size={20} color="#4cc9f0" />
                    </View>
                    <Text style={styles.actionButtonText}>Share</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.actionButton} onPress={convertToCSV}>
                    <View style={styles.actionIconContainer}>
                      <MaterialCommunityIcons name="file-delimited-outline" size={20} color="#4cc9f0" />
                    </View>
                    <Text style={styles.actionButtonText}>Export</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.buttonRow}>
                  <GradientButton
                    title="Process Document"
                    onPress={convertToCSV}
                    style={styles.button}
                  />
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => setShowPreview(false)}>
                    <Text style={styles.cancelText}>Close Preview</Text>
                  </TouchableOpacity>
                </View>
              </GlassmorphicCard>
            </View>
          ) : (
            <>
              <GlassmorphicCard style={styles.welcomeCard}>
                <View style={styles.welcomeTextContainer}>
                  <Text style={styles.welcomeText}>Welcome, {userData.name}</Text>
                  <Text style={styles.welcomeSubtext}>Upload or scan documents to extract data</Text>
                </View>
              </GlassmorphicCard>
              
              <Text style={styles.sectionTitle}>Upload Document</Text>
              <View style={styles.cardContainer}>
                <GlassmorphicCard style={styles.actionCard} onPress={pickDocument}>
                  <View style={styles.actionCardContent}>
                    <View style={[styles.iconBackground, {marginLeft: 'auto', marginRight: 'auto'}]}>
                      <MaterialCommunityIcons name="file-upload-outline" size={26} color="#4cc9f0" />
                    </View>
                    <Text style={styles.actionTitle}>Upload File</Text>
                    <Text style={styles.actionSubtitle}>PDF or Word Document</Text>
                  </View>
                </GlassmorphicCard>
                
                <GlassmorphicCard style={styles.actionCard} onPress={takePhoto}>
                  <View style={styles.actionCardContent}>
                    <View style={[styles.iconBackground, {marginLeft: 'auto', marginRight: 'auto'}]}>
                      <Ionicons name="camera-outline" size={26} color="#4cc9f0" />
                    </View>
                    <Text style={styles.actionTitle}>Scan Document</Text>
                    <Text style={styles.actionSubtitle}>Using Camera</Text>
                  </View>
                </GlassmorphicCard>
              </View>
              
              <Text style={styles.sectionTitle}>Recent Conversions</Text>
              <GlassmorphicCard style={styles.historyCard}>
                <View style={styles.documentItem}>
                  <MaterialCommunityIcons name="file-pdf-box" size={32} color="#4cc9f0" />
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentTitle}>ExamResults_Spring2023.pdf</Text>
                    <Text style={styles.documentDate}>Converted on 2023-05-15</Text>
                  </View>
                  <TouchableOpacity style={styles.redownloadButton}>
                    <MaterialCommunityIcons name="download" size={24} color="#4cc9f0" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.documentItem}>
                  <MaterialCommunityIcons name="file-word-box" size={32} color="#4cc9f0" />
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentTitle}>Midterm_Results.docx</Text>
                    <Text style={styles.documentDate}>Converted on 2023-03-22</Text>
                  </View>
                  <TouchableOpacity style={styles.redownloadButton}>
                    <MaterialCommunityIcons name="download" size={24} color="#4cc9f0" />
                  </TouchableOpacity>
                </View>
              </GlassmorphicCard>
            </>
          )}
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileButton: {
    padding: 4,
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 201, 240, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(76, 201, 240, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  welcomeCard: {
    marginBottom: 24,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(76, 201, 240, 0.15)',
    width: '100%',
    flexDirection: 'column',
  },
  welcomeTextContainer: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
    display: 'flex',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
    alignSelf: 'center',
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    opacity: 0.9,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    marginLeft: 4,
  },
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: isSmallScreen ? 8 : 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  actionCard: {
    flex: 0.48,
    height: 120,
    justifyContent: 'center',
  },
  actionCardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: isSmallScreen ? 6 : 8,
    display: 'flex',
    flexDirection: 'column',
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(76, 201, 240, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    display: 'flex',
    alignSelf: 'center',
  },
  actionTitle: {
    fontSize: isSmallScreen ? 13 : 15,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 5,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: isSmallScreen ? 10 : 12,
    color: '#e0e0e0',
    marginTop: 2,
    textAlign: 'center',
  },
  historyCard: {
    marginBottom: 20,
    padding: 0,
    overflow: 'hidden',
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  documentTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  documentDate: {
    fontSize: 13,
    color: '#e0e0e0',
    marginTop: 4,
  },
  redownloadButton: {
    padding: 8,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  previewContainer: {
    marginVertical: 16,
  },
  previewCard: {
    padding: 16,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  previewImage: {
    width: '100%',
    height: 380,
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
  },
  pdfPreview: {
    width: '100%',
    height: 280,
    backgroundColor: 'rgba(15, 20, 40, 0.6)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  pdfText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 3,
  },
  cancelButton: {
    flex: 2,
    paddingVertical: 16,
    alignItems: 'center',
    marginLeft: 12,
  },
  cancelText: {
    color: '#e0e0e0',
    fontWeight: 'bold',
  },
  actionButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(76, 201, 240, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(76, 201, 240, 0.2)',
    width: 75,
    shadowColor: '#4cc9f0',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  actionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(76, 201, 240, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
}); 