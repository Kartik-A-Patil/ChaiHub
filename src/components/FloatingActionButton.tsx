import React, { useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width: screenWidth } = Dimensions.get('window');

interface FloatingActionButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  visible?: boolean;
  position?: 'bottomRight' | 'bottomLeft' | 'bottomCenter';
  backgroundColor?: string;
  size?: number;
  shadowColor?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon,
  visible = true,
  position = 'bottomRight',
  backgroundColor = '#FF6B6B',
  size = 56,
  shadowColor = '#000',
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const animatableRef = useRef<any>(null);

  useEffect(() => {
    if (visible) {
      // Scale in animation
      Animated.spring(scaleAnim, {
        toValue: 1,
        damping: 12,
        mass: 1,
        stiffness: 200,
        useNativeDriver: true,
      }).start();

      // Gentle rotation animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      Animated.spring(scaleAnim, {
        toValue: 0,
        damping: 12,
        mass: 1,
        stiffness: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handlePress = () => {
    // Add a bounce animation on press
    if (animatableRef.current) {
      animatableRef.current.pulse(500);
    }
    onPress();
  };

  const getPositionStyle = () => {
    const basePosition = {
      position: 'absolute' as const,
      bottom: 20,
      zIndex: 1000,
    };

    switch (position) {
      case 'bottomRight':
        return { ...basePosition, right: 20 };
      case 'bottomLeft':
        return { ...basePosition, left: 20 };
      case 'bottomCenter':
        return { ...basePosition, left: screenWidth / 2 - size / 2 };
      default:
        return { ...basePosition, right: 20 };
    }
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        getPositionStyle(),
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Animatable.View
        ref={animatableRef}
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            shadowColor,
          },
        ]}
      >
        <TouchableOpacity
          onPress={handlePress}
          style={styles.touchable}
          activeOpacity={0.8}
        >
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          >
            {icon}
          </Animated.View>
        </TouchableOpacity>
      </Animatable.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  touchable: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingActionButton;
