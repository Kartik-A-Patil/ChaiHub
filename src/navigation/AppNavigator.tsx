import React, { useEffect, useState } from 'react';
import { View, Animated, Easing, StyleSheet, Text } from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffbe6',
  },
  chaiCup: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  loadingText: {
    fontSize: 18,
    color: '#b8860b',
    fontFamily: 'PlaywriteHU-VariableFont_wght',
    marginTop: 20,
  },
});

const images = [
  require('../assets/tea.jpg'),
  require('../assets/coffee.jpg'),
  require('../assets/Masala_Chai.jpg'),
  require('../assets/lemone_tea.jpeg'),
];


import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import auth from '@react-native-firebase/auth';
import OrderScreen from '../screens/OrderScreen';
import HomeTabs from './HomeTabs';
import ProductScreen from '../screens/ProductScreen';
import RestaurantMenuScreen from '../screens/RestaurantMenuScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NearbyRestaurantsScreen from '../screens/NearbyRestaurantsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SeedingScreen from '../screens/SeedingScreen';
import RecentOrdersScreen from '../screens/RecentOrdersScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import ProductTypeScreen from '../screens/ProductTypeScreen';
const Stack = createStackNavigator();


const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((usr) => {
      setUser(usr);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, [initializing]);


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? 'Home' : 'Login'}
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#ffffff',
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'PlaywriteHU-VariableFont_wght',
          },
        }}
      >
        {!user && (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
        {/* App screens */}
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecentOrders"
          component={RecentOrdersScreen}
          options={{ title: 'Recent Orders' }}
        />
        <Stack.Screen
          name="OrderDetailScreen"
          component={OrderDetailScreen}
          options={{ title: 'Order Details' }}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          
        />
        <Stack.Screen
          name="ProductType"
          component={ProductTypeScreen}
          options={{ title: 'Product Type' }}
        />
        <Stack.Screen
          name="RestaurantMenu"
          component={RestaurantMenuScreen}
          options={{ title: 'Menu' }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: 'Search Products' }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'Cart' }}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{ title: 'Order' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Account' }}
        />
        <Stack.Screen
          name="Nearby"
          component={NearbyRestaurantsScreen}
          options={{ title: 'Nearby' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen
          name="Seeding"
          component={SeedingScreen}
          options={{ title: 'Seeding' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
