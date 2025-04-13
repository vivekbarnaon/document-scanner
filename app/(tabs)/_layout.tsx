import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4cc9f0',
        tabBarInactiveTintColor: '#9BA1A6',
        tabBarStyle: {
          backgroundColor: 'rgba(20, 20, 40, 0.9)',
          borderTopWidth: 0,
          elevation: 0,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="view-dashboard-outline" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <FontAwesome5 name="home" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Scanner',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="scanner" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="history" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginBottom: -2,
  },
  scannerIcon: {
    backgroundColor: 'rgba(76, 201, 240, 0.1)', 
    padding: 10,
    borderRadius: 22,
    marginTop: -14,
    borderWidth: 1,
    borderColor: 'rgba(76, 201, 240, 0.2)',
    elevation: 3,
    shadowColor: '#4cc9f0',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
