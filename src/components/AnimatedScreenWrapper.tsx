import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface AnimatedScreenWrapperProps {
  children: React.ReactNode;
  animationType?: 'fadeIn' | 'slideInUp' | 'slideInDown' | 'slideInLeft' | 'slideInRight' | 'zoomIn' | 'bounceIn';
  duration?: number;
  delay?: number;
  style?: ViewStyle;
}

const AnimatedScreenWrapper: React.FC<AnimatedScreenWrapperProps> = ({
  children,
  animationType = 'fadeIn',
  duration = 400,
  delay = 0,
  style,
}) => {
  return (
    <Animatable.View
      animation={animationType}
      duration={duration}
      delay={delay}
      easing="ease-out-quart"
      style={[{ flex: 1 }, style]}
    >
      {children}
    </Animatable.View>
  );
};

export const useFadeAnimation = (duration: number = 300) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  return { fadeAnim, fadeIn, fadeOut };
};

export const useScaleAnimation = (duration: number = 300, initialScale: number = 0.9) => {
  const scaleAnim = useRef(new Animated.Value(initialScale)).current;

  const scaleIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      useNativeDriver: true,
    }).start();
  };

  const scaleOut = () => {
    Animated.timing(scaleAnim, {
      toValue: initialScale,
      duration,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    scaleIn();
  }, []);

  return { scaleAnim, scaleIn, scaleOut };
};

export const useSlideAnimation = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  duration: number = 400,
  distance: number = 50
) => {
  const slideAnim = useRef(new Animated.Value(distance)).current;

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: distance,
      duration,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slideIn();
  }, []);

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return [{ translateY: slideAnim }];
      case 'down':
        return [{ translateY: slideAnim.interpolate({ inputRange: [0, distance], outputRange: [0, -distance] }) }];
      case 'left':
        return [{ translateX: slideAnim }];
      case 'right':
        return [{ translateX: slideAnim.interpolate({ inputRange: [0, distance], outputRange: [0, -distance] }) }];
      default:
        return [{ translateY: slideAnim }];
    }
  };

  return { slideAnim, slideIn, slideOut, transform: getTransform() };
};

export default AnimatedScreenWrapper;
