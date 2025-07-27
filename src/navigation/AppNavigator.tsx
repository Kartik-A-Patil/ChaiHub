import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeTabs from './HomeTabs';
import ProductScreen from '../screens/ProductScreen';
import RestaurantMenuScreen from '../screens/RestaurantMenuScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Product" component={ProductScreen} options={{ title: 'Product' }} />
        <Stack.Screen name="RestaurantMenu" component={RestaurantMenuScreen} options={{ title: 'Menu' }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search Products' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
