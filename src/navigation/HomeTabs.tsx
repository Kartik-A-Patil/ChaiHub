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
const HeaderRightBtn = (navigation: any) => {
  return (
    <MaterialCommunityIcons
      name="cog-outline"
      size={26}
      color="#222"
      style={{ marginRight: 16 }}
      onPress={() => navigation.navigate('Settings')}
    />
  );
};
const HeaderStyle = {
  backgroundColor: '#fff',
  borderBottomWidth: 0,
  elevation: 0,
  shadowOpacity: 0,
};
// No shared HeaderTitleStyle object; use inline style for correct type inference
const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
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
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightBtn navigation={navigation} />, 
          headerStyle: HeaderStyle,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32,
            fontFamily: 'Rubik_Wet_Paint',
            color: '#D2691E', // chocolate color for extra appeal
            letterSpacing: 2,
            textShadowColor: '#b8860b',
            textShadowOffset: { width: 1, height: 2 },
            textShadowRadius: 4,
          },
          headerTitle: 'ChaiHub',
        })}
      />
      <Tab.Screen
        name="Nearby"
        component={NearbyRestaurantsScreen}
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightBtn navigation={navigation} />, 
          headerStyle: HeaderStyle,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 21, fontFamily: 'Raleway' },
        })}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightBtn navigation={navigation} />, 
          headerStyle: HeaderStyle,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 21, fontFamily: 'Raleway' },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightBtn navigation={navigation} />, 
          headerStyle: HeaderStyle,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 21, fontFamily: 'Raleway' },
        })}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
