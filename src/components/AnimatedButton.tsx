import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Animated,
  Easing,
  ViewStyle,
  TextStyle,
  Text,
  GestureResponderEvent,
} from 'react-native';

interface AnimatedButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  animationType?: 'scale' | 'bounce' | 'press' | 'fade';
  disabled?: boolean;
  activeOpacity?: number;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onPress,
  children,
  style,
  textStyle,
  animationType = 'scale',
  disabled = false,
  activeOpacity = 0.8,
}) => {
  const animatedValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;

    switch (animationType) {
      case 'scale':
      case 'press':
        Animated.timing(animatedValue, {
          toValue: 0.95,
          duration: 100,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }).start();
        break;
      case 'bounce':
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 0.9,
            duration: 100,
            easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
            useNativeDriver: true,
          }),
          Animated.spring(animatedValue, {
            toValue: 1.05,
            damping: 10,
            mass: 1,
            stiffness: 300,
            useNativeDriver: true,
          }),
        ]).start();
        break;
      case 'fade':
        Animated.timing(opacityValue, {
          toValue: activeOpacity,
          duration: 100,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }).start();
        break;
    }
  };

  const handlePressOut = () => {
    if (disabled) return;

    switch (animationType) {
      case 'scale':
      case 'press':
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 150,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }).start();
        break;
      case 'bounce':
        Animated.spring(animatedValue, {
          toValue: 1,
          damping: 8,
          mass: 1,
          stiffness: 200,
          useNativeDriver: true,
        }).start();
        break;
      case 'fade':
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 150,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }).start();
        break;
    }
  };

  const getAnimatedStyle = () => {
    const baseStyle = {
      opacity: animationType === 'fade' ? opacityValue : 1,
    };

    if (animationType === 'scale' || animationType === 'press' || animationType === 'bounce') {
      return {
        ...baseStyle,
        transform: [{ scale: animatedValue }],
      };
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={1}
      style={style}
    >
      <Animated.View style={getAnimatedStyle()}>
        {typeof children === 'string' ? (
          <Text style={textStyle}>{children}</Text>
        ) : (
          children
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedButton;
