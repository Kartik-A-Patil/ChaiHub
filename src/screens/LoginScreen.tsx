import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', // Get this from your Google Cloud project
});

const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Login Error', 'Error logging in. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // Get the user's ID token
      const userInfo = await GoogleSignin.signIn();
      const { idToken, accessToken } = userInfo;
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error with Google sign-in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    try {
      await auth().signInAnonymously();
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error with guest sign-in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>Login</Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Login
          </Button>
          <Button
            mode="contained"
            onPress={handleGoogleSignIn}
            style={styles.button}
            disabled={loading}>
            Continue with Google
          </Button>
          <Button onPress={handleGuestSignIn} style={styles.button}>
            Continue as Guest
          </Button>
          <Button onPress={() => navigation.navigate('Seeding')} style={styles.button}>
            Go to Seeding Page
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    width: '90%',
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
});

export default LoginScreen;
