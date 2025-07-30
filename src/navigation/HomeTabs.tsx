import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NearbyRestaurantsScreen from '../screens/NearbyRestaurantsScreen';
import { Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Tab = createBottomTabNavigator();
const HeaderRightBtn = ({ navigation }: { navigation: any }) => (
  <SimpleLineIcons
    name="settings"
    size={26}
    color="#222"
    style={{ marginRight: 16 }}
    onPress={() => navigation.navigate('Settings')}
  />
);
const HeaderStyle = {
  backgroundColor: '#fff',
  borderBottomWidth: 0,
  elevation: 0,
  shadowOpacity: 0,
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#222222',
        tabBarInactiveTintColor: '#575757',
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarLabelStyle: { fontSize: 13 },
        tabBarIcon: ({ color, focused }) => {
          let iconName = '';
          if (route.name === 'Cart')
            iconName = focused ? 'cart' : 'cart-outline';
          else if (route.name === 'HomeTab')
            iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Profile')
            iconName = focused ? 'account' : 'account-outline';
          if (route.name === 'Nearby')
            iconName = focused ? 'map-marker' : 'map-marker-outline';
          return (
            <Animatable.View animation={focused ? 'pulse' : ''} iterationCount="infinite">
              <MaterialCommunityIcons
                name={iconName}
                color={focused ? '#111' : color}
                size={24}
              />
            </Animatable.View>
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
        name="HomeTab"
        component={HomeScreen}
        options={({ navigation }) => ({
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
        })}
      />
      <Tab.Screen
        name="Nearby"
        component={NearbyRestaurantsScreen}
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightBtn navigation={navigation} />, 
          headerStyle: HeaderStyle,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 21, fontFamily: 'Raleway-Regular' },
        })}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightBtn navigation={navigation} />, 
          headerStyle: HeaderStyle,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 21, fontFamily: 'Raleway-Regular' },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightBtn navigation={navigation} />, 
          headerStyle: HeaderStyle,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 21, fontFamily: 'Raleway-Regular' },
        })}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
