import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeTabs from './HomeTabs';
import ProductScreen from '../screens/ProductScreen';
import RestaurantMenuScreen from '../screens/RestaurantMenuScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NearbyRestaurantsScreen from '../screens/NearbyRestaurantsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SeedingScreen from '../screens/SeedingScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          gestureEnabled: true,
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{title: 'Product'}}
        />
        <Stack.Screen
          name="RestaurantMenu"
          component={RestaurantMenuScreen}
          options={{title: 'Menu'}}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{title: 'Search Products'}}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{title: 'Cart'}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{title: 'Account'}}
        />
        <Stack.Screen
          name="Nearby"
          component={NearbyRestaurantsScreen}
          options={{title: 'Nearby'}}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{title: 'Settings'}}
        />
        <Stack.Screen
          name="Seeding"
          component={SeedingScreen}
          options={{title: 'Seeding'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
