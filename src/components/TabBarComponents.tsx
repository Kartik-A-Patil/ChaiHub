import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Animated, Easing } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

export const HeaderRightBtn = ({ navigation }: { navigation: any }) => {
  const handlePress = () => {
    navigation.navigate('Settings');
  };

  return (
    <Animatable.View animation="fadeInRight" duration={800}>
      <SimpleLineIcons
        name="settings"
        size={26}
        color="#222"
        style={styles.headerRight}
        onPress={handlePress}
      />
    </Animatable.View>
  );
};
export const HeaderRightSearchBtn = ({ navigation }: { navigation: any }) => {
  const handlePress = () => {
    navigation.navigate('Search');
  };
  return (
    <Animatable.View animation="fadeInRight" duration={800}>
      <Feather
        name="search"
        size={26}
        color="#222"
        style={{ marginRight: 20 }}
        onPress={handlePress}
      />
    </Animatable.View>
  );
};

export const TabBarIcon = ({
  route,
  color,
  focused,
}: {
  route: any;
  color: string;
  focused: boolean;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (focused) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 150,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          damping: 10,
          mass: 1,
          stiffness: 400,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      scaleAnim.setValue(1);
      bounceAnim.setValue(0);
    }
  }, [focused]);

  let iconName = '';
  if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
  else if (route.name === 'HomeTab')
    iconName = focused ? 'home' : 'home-outline';
  else if (route.name === 'Profile')
    iconName = focused ? 'account' : 'account-outline';
  if (route.name === 'Nearby')
    iconName = focused ? 'map-marker' : 'map-marker-outline';

  const bounceTranslate = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -2],
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }, { translateY: bounceTranslate }],
      }}
    >
      <MaterialCommunityIcons
        name={iconName}
        color={focused ? '#111' : color}
        size={24}
      />
    </Animated.View>
  );
};

export const TabBarLabel = ({
  route,
  color,
  focused,
}: {
  route: any;
  color: string;
  focused: boolean;
}) => {
  const fadeAnim = useRef(new Animated.Value(focused ? 1 : 0.7)).current;
  const scaleAnim = useRef(new Animated.Value(focused ? 1 : 0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: focused ? 1 : 0.7,
        duration: 200,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: focused ? 1 : 0.9,
        damping: 12,
        mass: 1,
        stiffness: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <Animated.Text
      style={[
        styles.tabBarLabel,
        focused ? styles.tabBarLabelFocused : { color },
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {route.name === 'HomeTab' ? 'Home' : route.name}
    </Animated.Text>
  );
};

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
