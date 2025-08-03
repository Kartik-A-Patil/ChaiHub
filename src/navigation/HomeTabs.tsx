import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NearbyRestaurantsScreen from '../screens/NearbyRestaurantsScreen';
import { HeaderRightBtn, TabBarIcon, TabBarLabel } from '../components/TabBarComponents';

const Tab = createBottomTabNavigator();

const HeaderStyle = {
  backgroundColor: '#fff',
  borderBottomWidth: 0,
  elevation: 0,
  shadowOpacity: 0,
};

const screenOptions = ({ route }) => ({
  tabBarActiveTintColor: '#222222',
  tabBarInactiveTintColor: '#575757',
  tabBarStyle: { backgroundColor: '#fff' },
  tabBarLabelStyle: { fontSize: 13 },
  tabBarIcon: ({ color, focused }) => (
    <TabBarIcon route={route} color={color} focused={focused} />
  ),
  tabBarLabel: ({ focused, color }) => (
    <TabBarLabel route={route} color={color} focused={focused} />
  ),
});

const homeScreenOptions = ({ navigation }) => ({
  headerRight: () => <HeaderRightBtn navigation={navigation} />, 
  headerStyle: HeaderStyle,
  headerTitleStyle: {
    fontWeight: 'regular',
    fontSize: 32,
    fontFamily: 'PlaywriteHU-VariableFont_wght',
    color: '#000000',
    letterSpacing: 2,
              },
  headerTitle: 'ChaiHub',
});

const nearbyScreenOptions = ({ navigation }) => ({
  headerRight: () => <HeaderRightBtn navigation={navigation} />, 
  headerStyle: HeaderStyle,
  headerTitleStyle: { fontWeight: 'regular', fontSize: 21, fontFamily: 'PlaywriteHU-VariableFont_wght' },
});

const cartScreenOptions = ({ navigation }) => ({
  headerRight: () => <HeaderRightBtn navigation={navigation} />, 
  headerStyle: HeaderStyle,
  headerTitleStyle: { fontWeight: 'regular', fontSize: 21, fontFamily: 'PlaywriteHU-VariableFont_wght' },
});

const profileScreenOptions = ({ navigation }) => ({
  headerRight: () => <HeaderRightBtn navigation={navigation} />, 
  headerStyle: HeaderStyle,
  headerTitleStyle: { fontWeight: 'regular', fontSize: 21, fontFamily: 'PlaywriteHU-VariableFont_wght' },
});

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={homeScreenOptions}
      />
      <Tab.Screen
        name="Nearby"
        component={NearbyRestaurantsScreen}
        options={nearbyScreenOptions}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={profileScreenOptions}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
