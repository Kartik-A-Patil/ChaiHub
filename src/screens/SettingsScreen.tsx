import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Share,
} from 'react-native';
import {
  Text,
  Switch,
  List,
  Card,
  Button,
  Divider,
  Avatar,
} from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const user = auth().currentUser;

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          auth().signOut();
        },
      },
    ]);
  };

  const handleAbout = () => {
    Alert.alert(
      'About ChaiHub',
      'ChaiHub v1.0.0\n\nYour favorite food delivery app bringing delicious meals right to your doorstep.\n\nDeveloped with ❤️ for food lovers.',
      [{ text: 'OK' }],
    );
  };

  const handlePrivacyPolicy = () => {
    // You can replace with your actual privacy policy URL
    Linking.openURL('https://chaihub.com/privacy-policy');
  };

  const handleTermsOfService = () => {
    // You can replace with your actual terms URL
    Linking.openURL('https://chaihub.com/terms-of-service');
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      backgroundColor: theme.surface,
      padding: 20,
      alignItems: 'center',
      marginBottom: 20,
    },
    userInfo: {
      alignItems: 'center',
      marginTop: 16,
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginTop: 8,
    },
    userEmail: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 4,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginHorizontal: 20,
      marginBottom: 12,
      marginTop: 8,
    },
    listItem: {
      backgroundColor: theme.surface,
      marginHorizontal: 16,
      marginVertical: 2,
      borderRadius: 12,
    },
    listItemText: {
      color: theme.text,
    },
    listItemDescription: {
      color: theme.textSecondary,
    },
    dangerButton: {
      backgroundColor: theme.error,
      marginHorizontal: 16,
      marginTop: 20,
      borderRadius: 12,
    },
    version: {
      textAlign: 'center',
      color: theme.textSecondary,
      fontSize: 12,
      marginTop: 20,
      marginBottom: 10,
    },
  });

  return (
    <ScrollView style={dynamicStyles.container}>
      {/* Preferences Section */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Preferences</Text>

        <List.Item
          title="Notifications"
          description="Manage your notification preferences"
          left={props => (
            <List.Icon {...props} icon="bell" color={theme.text} />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon="chevron-right"
              color={theme.textSecondary}
            />
          )}
          onPress={() => navigation.navigate('NotificationSettings')}
          titleStyle={dynamicStyles.listItemText}
          descriptionStyle={dynamicStyles.listItemDescription}
          style={dynamicStyles.listItem}
        />
      </View>

      {/* Account Section */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Account</Text>

        <List.Item
          title="Edit Profile"
          description="Update your personal information"
          left={props => (
            <List.Icon {...props} icon="account-edit" color={theme.text} />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon="chevron-right"
              color={theme.textSecondary}
            />
          )}
          onPress={() => navigation.navigate('Profile')}
          titleStyle={dynamicStyles.listItemText}
          descriptionStyle={dynamicStyles.listItemDescription}
          style={dynamicStyles.listItem}
        />

        <List.Item
          title="Order History"
          description="View your past orders"
          left={props => (
            <List.Icon {...props} icon="history" color={theme.text} />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon="chevron-right"
              color={theme.textSecondary}
            />
          )}
          onPress={() => navigation.navigate('RecentOrders')}
          titleStyle={dynamicStyles.listItemText}
          descriptionStyle={dynamicStyles.listItemDescription}
          style={dynamicStyles.listItem}
        />
      </View>

      {/* App Section */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>App</Text>

        <List.Item
          title="GitHub Repository"
          description="View the source code on GitHub"
          left={props => (
            <List.Icon {...props} icon="github" color={theme.text} />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon="chevron-right"
              color={theme.textSecondary}
            />
          )}
          onPress={() =>
            Linking.openURL('https://github.com/Kartik-A-Patil/ChaiHub')
          }
          titleStyle={dynamicStyles.listItemText}
          descriptionStyle={dynamicStyles.listItemDescription}
          style={dynamicStyles.listItem}
        />

        <List.Item
          title="Project README"
          description="Read the documentation and usage guide"
          left={props => (
            <List.Icon
              {...props}
              icon="book-open-page-variant"
              color={theme.text}
            />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon="chevron-right"
              color={theme.textSecondary}
            />
          )}
          onPress={() =>
            Linking.openURL('https://github.com/Kartik-A-Patil/ChaiHub#readme')
          }
          titleStyle={dynamicStyles.listItemText}
          descriptionStyle={dynamicStyles.listItemDescription}
          style={dynamicStyles.listItem}
        />
      </View>

      {/* Legal Section */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Legal</Text>

        <List.Item
          title="About"
          description="Learn more about ChaiHub"
          left={props => (
            <List.Icon {...props} icon="information" color={theme.text} />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon="chevron-right"
              color={theme.textSecondary}
            />
          )}
          onPress={handleAbout}
          titleStyle={dynamicStyles.listItemText}
          descriptionStyle={dynamicStyles.listItemDescription}
          style={dynamicStyles.listItem}
        />
        <List.Item
          title="Seeding"
          description="Learn more about ChaiHub"
          left={props => (
            <List.Icon {...props} icon="information" color={theme.text} />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon="chevron-right"
              color={theme.textSecondary}
            />
          )}
          onPress={()=> navigation.navigate('Seeding')}
          titleStyle={dynamicStyles.listItemText}
          descriptionStyle={dynamicStyles.listItemDescription}
          style={dynamicStyles.listItem}
        />
      </View>

      {/* Open Source Notice */}
      <View
        style={{
          marginHorizontal: 16,
          marginTop: 24,
          marginBottom: 8,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: theme.textSecondary,
            fontSize: 14,
            textAlign: 'center',
          }}
        >
          This is an open-source template app. Feel free to use, modify, and
          contribute!
        </Text>
        <Text
          style={{
            color: theme.primary,
            fontSize: 14,
            textAlign: 'center',
            marginTop: 4,
          }}
          onPress={() =>
            Linking.openURL('https://github.com/Kartik-A-Patil/ChaiHub')
          }
        >
          github.com/Kartik-A-Patil/ChaiHub
        </Text>
      </View>

      {/* Logout Button */}
      <Button
        mode="contained"
        onPress={handleLogout}
        style={dynamicStyles.dangerButton}
        labelStyle={{ color: 'white' }}
        icon="logout"
      >
        Logout
      </Button>

      {/* Version Info */}
      <Text style={dynamicStyles.version}>ChaiHub v1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Static styles can be kept here if needed
});

export default SettingsScreen;
