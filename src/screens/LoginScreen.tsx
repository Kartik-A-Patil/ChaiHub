import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, Animated, Easing, Dimensions } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import auth, {
  signInAnonymously,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// New color scheme
const colors = {
  primary: '#D4AF37',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: '#212529',
  textSecondary: '#6C757D',
  border: '#E9ECEF',
  card: '#FFFFFF',
  error: '#F44336',
};

GoogleSignin.configure({
  webClientId: 'WEB_CLIENT_ID',
});

const { width, height } = Dimensions.get('window');

type ChaiCupProps = {
  icon: string;
  size: number;
  color: string;
  initialPosition: { x: number; y: number };
};

const ChaiCup: React.FC<ChaiCupProps> = ({ icon, size, color, initialPosition }) => {
  // Minimal, subtle animation: gentle fade-in and slight scale pulse
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.cup,
        {
          left: initialPosition.x,
          top: initialPosition.y,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <MaterialCommunityIcons name={icon} size={size} color={color} />
    </Animated.View>
  );
};

const LoginScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation<any>();

  // const handleGoogleSignIn = async () => {
  //   if (loading) return;
  //   setLoading(true);
  //   try {
  // const userInfo = await GoogleSignin.signIn();
  // const idToken = userInfo.idToken;
  // const googleCredential = GoogleAuthProvider.credential(idToken, null);
  // await signInWithCredential(auth(), googleCredential);
  //     navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  //   } catch (error) {
  //     console.error('Error with Google sign-in:', error);
  //     Alert.alert('Sign-in Error', 'Could not sign in with Google.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleGuestSignIn = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await signInAnonymously(auth());
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (error) {
      console.error('Error with guest sign-in:', error);
      Alert.alert('Sign-in Error', 'Could not sign in as a guest.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ChaiCup icon="coffee-outline" size={40} color="#A0522D" initialPosition={{ x: width * 0.1, y: height * 0.1 }} />
      <ChaiCup icon="cup-outline" size={35} color="#D4AF37" initialPosition={{ x: width * 0.7, y: height * 0.2 }} />
      <ChaiCup icon="leaf" size={30} color="#228B22" initialPosition={{ x: width * 0.8, y: height * 0.6 }} />
      <ChaiCup icon="cookie-outline" size={38} color="#D2691E" initialPosition={{ x: width * 0.2, y: height * 0.8 }} />

      <View style={styles.content}>
        <Animatable.View animation="fadeInDown" duration={1200} style={styles.header}>
          <Text style={styles.title}>ChaiHub</Text>
          <Text style={styles.subtitle}>Your Daily Dose of Chai</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={1200} delay={300} style={styles.buttonContainer}>
          {/* <Button
            mode="contained"
            onPress={handleGoogleSignIn}
            style={styles.button}
            disabled={loading}
            icon={loading ? undefined : "google"}
            loading={loading}
            labelStyle={styles.buttonLabel}
            contentStyle={styles.buttonContent}
          >
            {loading ? "Signing in..." : "Continue with Google"}
          </Button> */}
          <Button
            onPress={handleGuestSignIn}
            style={[styles.button, styles.guestButton]}
            labelStyle={styles.guestButtonLabel}
            disabled={loading}
            loading={loading}
          >
            {loading ? "Signing in..." : "Continue as Guest"}
          </Button>
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  cup: {
    position: 'absolute',
    opacity: 0.5,
    zIndex: 0,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontFamily: 'PlaywriteHU-Regular',
    fontSize: 52,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Light',
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
  },
  button: {
    marginTop: 15,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
    elevation: 0,
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
  guestButton: {
    backgroundColor: '#000',
    borderColor: '#000',
    borderWidth: 2,
    elevation: 0,
  },
  guestButtonLabel: {
    color: '#fff',
  },
});

export default LoginScreen;