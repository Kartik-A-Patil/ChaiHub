import React, { useRef, useEffect } from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface LoadingAnimationProps {
  visible: boolean;
  type?: 'spinner' | 'dots' | 'wave' | 'pulse' | 'chai';
  message?: string;
  backgroundColor?: string;
  color?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  visible,
  type = 'chai',
  message = 'Loading...',
  backgroundColor = 'rgba(255, 255, 255, 0.9)',
  color = '#B8860B',
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.2,
            duration: 800,
            easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 800,
            easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      Animated.timing(fadeValue, {
        toValue: 0,
        duration: 300,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const renderChaiLoader = () => (
    <View style={styles.chaiContainer}>
      <Animatable.Text
        animation="pulse"
        iterationCount="infinite"
        duration={1500}
        style={[styles.chaiEmoji, { color }]}
      >
        ☕
      </Animatable.Text>
      <Animated.View
        style={[
          styles.chaiSteam,
          {
            opacity: pulseValue.interpolate({
              inputRange: [1, 1.2],
              outputRange: [0.3, 0.8],
            }),
          },
        ]}
      >
        <Text style={[styles.steamText, { color }]}>~</Text>
        <Text style={[styles.steamText, { color }]}>~</Text>
        <Text style={[styles.steamText, { color }]}>~</Text>
      </Animated.View>
    </View>
  );

  const renderSpinner = () => (
    <Animated.View
      style={[
        styles.spinner,
        {
          borderTopColor: color,
          transform: [{ rotate: spin }],
        },
      ]}
    />
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {[0, 1, 2].map((index) => (
        <Animatable.View
          key={index}
          animation="bounceIn"
          duration={600}
          delay={index * 200}
          iterationCount="infinite"
          style={[styles.dot, { backgroundColor: color }]}
        />
      ))}
    </View>
  );

  const renderWave = () => (
    <View style={styles.waveContainer}>
      {[0, 1, 2, 3, 4].map((index) => (
        <Animatable.View
          key={index}
          animation={{
            0: { scaleY: 1 },
            0.5: { scaleY: 1.5 },
            1: { scaleY: 1 },
          }}
          duration={1000}
          delay={index * 100}
          iterationCount="infinite"
          style={[styles.waveLine, { backgroundColor: color }]}
        />
      ))}
    </View>
  );

  const renderPulse = () => (
    <Animated.View
      style={[
        styles.pulseCircle,
        {
          backgroundColor: color,
          transform: [{ scale: pulseValue }],
        },
      ]}
    />
  );

  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return renderSpinner();
      case 'dots':
        return renderDots();
      case 'wave':
        return renderWave();
      case 'pulse':
        return renderPulse();
      case 'chai':
      default:
        return renderChaiLoader();
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          backgroundColor,
          opacity: fadeValue,
        },
      ]}
    >
      <View style={styles.container}>
        {renderLoader()}
        {message && (
          <Animatable.Text
            animation="fadeInUp"
            delay={300}
            style={[styles.message, { color }]}
          >
            {message}
          </Animatable.Text>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  chaiContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chaiEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  chaiSteam: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 40,
    marginBottom: 20,
  },
  steamText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#B8860B',
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
    marginBottom: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  waveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
    alignItems: 'flex-end',
    height: 40,
    marginBottom: 20,
  },
  waveLine: {
    width: 4,
    height: 20,
    borderRadius: 2,
  },
  pulseCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    fontFamily: 'PlaywriteHU-VariableFont_wght',
    textAlign: 'center',
  },
});

export default LoadingAnimation;
