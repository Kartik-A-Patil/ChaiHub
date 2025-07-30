import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const OrderScreen = () => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  React.useEffect(() => {
    // Only allow access if paymentSuccess param is true
    if (!route.params || !(route.params as any).paymentSuccess) {
      Alert.alert('Error', 'Please complete payment first.');
      navigation.goBack();
    }
  }, [route.params, navigation]);

  const handleOrder = async () => {
    setLoading(true);
    try {
      const user = auth().currentUser;
      if (!user) {
        Alert.alert('Error', 'User not logged in');
        setLoading(false);
        return;
      }
      const userDetails = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
      };
      const order = {
        userId: user.uid,
        address,
        phone,
        userDetails,
        status: 'pending',
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
      await firestore().collection('orders').add(order);
      Alert.alert('Success', 'Order placed successfully!');
      navigation.goBack();
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert('Error', errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button title={loading ? 'Placing Order...' : 'Pay & Place Order'} onPress={handleOrder} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});

export default OrderScreen;
