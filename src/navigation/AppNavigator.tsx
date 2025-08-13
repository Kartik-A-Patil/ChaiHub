import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
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
import ProfileEditScreen from '../screens/ProfileEditScreen';
import HelpScreen from '../screens/HelpScreen';
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
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Stack.Navigator
        initialRouteName={user ? 'Home' : 'Login'}
        screenOptions={{
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
            }}
          />
        )}
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RecentOrders"
          component={RecentOrdersScreen}
          options={{
            title: 'Recent Orders',
          }}
        />
        <Stack.Screen
          name="OrderDetailScreen"
          component={OrderDetailScreen}
          options={{
            title: 'Order Details',
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
          }}
        />
        <Stack.Screen
          name="RestaurantMenu"
          component={RestaurantMenuScreen}
          options={{
            title: 'Menu',
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: 'Search Products',
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
        />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileEditScreen}
          options={{
            title: 'Edit Profile',
          }}
        />
        <Stack.Screen
          name="Help"
          component={HelpScreen}
          options={{
            title: 'Help & Support',
          }}
        />
        <Stack.Screen name="Nearby" component={NearbyRestaurantsScreen} />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
        />
        <Stack.Screen
          name="Seeding"
          component={SeedingScreen}
          options={{
            title: 'Seeding',
          }}
        />
        <Stack.Screen
          name="NotificationSettings"
          component={NotificationSettingsScreen}
          options={{
            title: 'Notification Settings',
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
