import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView,
  Alert 
} from 'react-native';
import { 
  Text, 
  Switch, 
  List,
  Card,
  Button 
} from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import { hapticActions } from '../utils/hapticUtils';

const NotificationSettingsScreen = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    orderUpdates: true,
    promotions: false,
    newRestaurants: true,
    specialOffers: false,
    newsletter: false,
    sound: true,
    vibration: true,
  });

  const updateNotification = (key: string, value: boolean) => {
    hapticActions.toggle();
    
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    Alert.alert(
      'Settings Saved',
      'Your notification preferences have been saved successfully.',
      [{ text: 'OK' }]
    );
    navigation.goBack();
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
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
    saveButton: {
      backgroundColor: theme.primary,
      marginHorizontal: 16,
      marginTop: 20,
      marginBottom: 30,
      borderRadius: 12,
    },
    description: {
      color: theme.textSecondary,
      fontSize: 14,
      marginHorizontal: 20,
      marginBottom: 20,
      lineHeight: 20,
    },
  });

  return (
    <ScrollView style={dynamicStyles.container}>
      <Text style={dynamicStyles.description}>
        Customize your notification preferences to stay updated with what matters most to you.
      </Text>

      {/* General Notifications */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>General</Text>
        
        <List.Item
          title="Push Notifications"
          description="Enable all push notifications"
          left={(props) => <List.Icon {...props} icon="bell" color={theme.text} />}
          right={() => (
            <Switch 
              value={notifications.pushNotifications} 
              onValueChange={(value) => updateNotification('pushNotifications', value)}
              thumbColor={notifications.pushNotifications ? theme.primary : '#f4f3f4'}
              trackColor={{ false: '#767577', true: theme.primary }}
            />
          )}
          titleStyle={dynamicStyles.listItemText}
          descriptionStyle={dynamicStyles.listItemDescription}
          style={dynamicStyles.listItem}
        />
      </View>

      {/* Order Notifications */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Orders</Text>
        
        <List.Item
          title="Order Updates"
          description="Get notified about order status changes"
          left={(props) => <List.Icon {...props} icon="package-variant" color={theme.text} />}
          right={() => (
            <Switch 
              value={notifications.orderUpdates} 
              onValueChange={(value) => updateNotification('orderUpdates', value)}
              thumbColor={notifications.orderUpdates ? theme.primary : '#f4f3f4'}
              trackColor={{ false: '#767577', true: theme.primary }}
            />
          )}
          titleStyle={dynamicStyles.listItemText}
          descriptionStyle={dynamicStyles.listItemDescription}
          style={dynamicStyles.listItem}
        />
      </View>

      {/* Marketing Notifications */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Marketing</Text>
        
        <List.Item
          title="Promotions"
          description="Special deals and discounts"
          left={(props) => <List.Icon {...props} icon="tag" color={theme.text} />}
          right={() => (
            <Switch 
              value={notifications.promotions} 
              onValueChange={(value) => updateNotification('promotions', value)}
              thumbColor={notifications.promotions ? theme.primary : '#f4f3f4'}
              trackColor={{ false: '#767577', true: theme.primary }}
            />
          )}
          titleStyle={dynamicStyles.listItemText}
          descriptionStyle={dynamicStyles.listItemDescription}
          style={dynamicStyles.listItem}
        />

        <List.Item
          title="New Restaurants"
          description="When new restaurants join ChaiHub"
          left={(props) => <List.Icon {...props} icon="store" color={theme.text} />}
          right={() => (
            <Switch 
              value={notifications.newRestaurants} 
              onValueChange={(value) => updateNotification('newRestaurants', value)}
              thumbColor={notifications.newRestaurants ? theme.primary : '#f4f3f4'}
              trackColor={{ false: '#767577', true: theme.primary }}
            />
          )}
          titleStyle={dynamicStyles.listItemText}
          descriptionStyle={dynamicStyles.listItemDescription}
          style={dynamicStyles.listItem}
        />

        <List.Item
          title="Special Offers"
          description="Limited time offers and flash sales"
          left={(props) => <List.Icon {...props} icon="flash" color={theme.text} />}
          right={() => (
            <Switch 
              value={notifications.specialOffers} 
              onValueChange={(value) => updateNotification('specialOffers', value)}
              thumbColor={notifications.specialOffers ? theme.primary : '#f4f3f4'}
              trackColor={{ false: '#767577', true: theme.primary }}
            />
          )}
          titleStyle={dynamicStyles.listItemText}
          descriptionStyle={dynamicStyles.listItemDescription}
          style={dynamicStyles.listItem}
        />

        <List.Item
          title="Newsletter"
          description="Weekly food updates and news"
          left={(props) => <List.Icon {...props} icon="email" color={theme.text} />}
          right={() => (
            <Switch 
              value={notifications.newsletter} 
              onValueChange={(value) => updateNotification('newsletter', value)}
              thumbColor={notifications.newsletter ? theme.primary : '#f4f3f4'}
              trackColor={{ false: '#767577', true: theme.primary }}
            />
          )}
          titleStyle={dynamicStyles.listItemText}
          descriptionStyle={dynamicStyles.listItemDescription}
          style={dynamicStyles.listItem}
        />
      </View>

      {/* Sound & Vibration */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Sound & Vibration</Text>
        
        <List.Item
          title="Sound"
          description="Play sound for notifications"
          left={(props) => <List.Icon {...props} icon="volume-high" color={theme.text} />}
          right={() => (
            <Switch 
              value={notifications.sound} 
              onValueChange={(value) => updateNotification('sound', value)}
              thumbColor={notifications.sound ? theme.primary : '#f4f3f4'}
              trackColor={{ false: '#767577', true: theme.primary }}
            />
          )}
          titleStyle={dynamicStyles.listItemText}
          descriptionStyle={dynamicStyles.listItemDescription}
          style={dynamicStyles.listItem}
        />

        <List.Item
          title="Vibration"
          description="Vibrate for notifications"
          left={(props) => <List.Icon {...props} icon="vibrate" color={theme.text} />}
          right={() => (
            <Switch 
              value={notifications.vibration} 
              onValueChange={(value) => updateNotification('vibration', value)}
              thumbColor={notifications.vibration ? theme.primary : '#f4f3f4'}
              trackColor={{ false: '#767577', true: theme.primary }}
            />
          )}
          titleStyle={dynamicStyles.listItemText}
          descriptionStyle={dynamicStyles.listItemDescription}
          style={dynamicStyles.listItem}
        />
      </View>

      {/* save button */}
      <Button 
        mode="contained" 
        onPress={handleSaveSettings}
        style={dynamicStyles.saveButton}
        labelStyle={{ color: 'white' }}
      >
        Save Settings
      </Button>
    </ScrollView>
  );
};

export default NotificationSettingsScreen;
