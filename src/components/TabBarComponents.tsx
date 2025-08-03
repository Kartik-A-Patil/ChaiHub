import React from 'react';
import { Text, StyleSheet } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

export const HeaderRightBtn = ({ navigation }: { navigation: any }) => (
  <SimpleLineIcons
    name="settings"
    size={26}
    color="#222"
    style={styles.headerRight}
    onPress={() => navigation.navigate('Settings')}
  />
);

export const TabBarIcon = ({ route, color, focused }: { route: any, color: string, focused: boolean }) => {
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
};

export const TabBarLabel = ({ route, color, focused }: { route: any, color: string, focused: boolean }) => (
  <Text
    style={[styles.tabBarLabel, focused ? styles.tabBarLabelFocused : { color }]}
  >
    {route.name}
  </Text>
);

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 16,
  },
  tabBarLabel: {
    fontSize: 13,
  },
  tabBarLabelFocused: {
    color: '#111',
    fontWeight: 'bold',
  },
});
