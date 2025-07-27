import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NearbyRestaurantsScreen from '../screens/NearbyRestaurantsScreen';
// import SearchScreen from '../screens/SearchScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#222222',
        tabBarInactiveTintColor: '#575757',
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarLabelStyle: { fontSize: 13 },
        tabBarIcon: ({ color, focused }) => {
          let iconName = '';
          if (route.name === 'Cart')
            iconName = focused ? 'cart' : 'cart-outline';
          else if (route.name === 'Home')
            iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Profile')
            iconName = focused ? 'account' : 'account-outline';
          if (route.name === 'Nearby')
            iconName = focused ? 'map-marker' : 'map-marker-outline';
          return (
            <MaterialCommunityIcons
              name={iconName}
              color={focused ? '#111' : color}
              size={24}
            />
          );
        },
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              color: focused ? '#111' : color,
              fontWeight: focused ? 'bold' : 'normal',
              fontSize: 13,
            }}
          >
            {route.name}
          </Text>
        ),
      })}
    >
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Nearby" component={NearbyRestaurantsScreen} />
  <Tab.Screen name="Cart" component={CartScreen} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
