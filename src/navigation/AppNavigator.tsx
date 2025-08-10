import React, { useEffect, useState } from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

const { width: screenWidth } = Dimensions.get('window');

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
  CardStyleInterpolators,
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
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(usr => {
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
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 300,
                easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 250,
                easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
              },
            },
          },
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
            options={{
              headerShown: false,
              cardStyleInterpolator:
                CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
          />
        )}
        {/* App screens */}
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="RecentOrders"
          component={RecentOrdersScreen}
          options={{
            title: 'Recent Orders',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="OrderDetailScreen"
          component={OrderDetailScreen}
          options={{
            title: 'Order Details',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
        />
        <Stack.Screen
          name="ProductType"
          component={ProductTypeScreen}
          options={{
            title: 'Product Type',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="RestaurantMenu"
          component={RestaurantMenuScreen}
          options={{
            title: 'Menu',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: 'Search Products',
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            title: 'Cart',
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{
            title: 'Order',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Account',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Nearby"
          component={NearbyRestaurantsScreen}
          options={{
            title: 'Nearby',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
        />
        <Stack.Screen
          name="Seeding"
          component={SeedingScreen}
          options={{
            title: 'Seeding',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="NotificationSettings"
          component={NotificationSettingsScreen}
          options={{
            title: 'Notification Settings',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
