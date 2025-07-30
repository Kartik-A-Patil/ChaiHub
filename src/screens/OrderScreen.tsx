import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { orderScreenStyles as styles } from '../styles/OrderScreenStyles';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../store/cartSelectors';
import { clearCartAsync } from '../store/cartSlice';
import type { AppDispatch } from '../store/store';

const OrderScreen = () => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // Snackbar state
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarType, setSnackbarType] = useState<'error' | 'success'>('success');

  const handleProceedToPayment = () => {
    if (!address || !phone) {
      setSnackbarMsg('Please fill in all fields.');
      setSnackbarType('error');
      setSnackbarVisible(true);
      return;
    }
    setModalVisible(true);
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      createOrder();
    }, 1500);
  };

  const createOrder = async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        setSnackbarMsg('User not logged in');
        setSnackbarType('error');
        setSnackbarVisible(true);
        setLoading(false);
        return;
      }
      const order = {
        userId: user.uid,
        address,
        phone,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size || null,
          sweetness: item.sweetness || null,
        })),
        total: cartTotal,
        status: 'pending',
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
      await firestore().collection('orders').add(order);
      dispatch(clearCartAsync());
      setLoading(false);
      setModalVisible(false);
      setSnackbarMsg('Your order has been placed successfully!');
      setSnackbarType('success');
      setSnackbarVisible(true);
      setTimeout(() => {
        navigation.navigate('RecentOrders');
      }, 1500);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      setSnackbarMsg(errMsg);
      setSnackbarType('error');
      setSnackbarVisible(true);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Delivery Address"
        value={address}
        onChangeText={setAddress}
        placeholderTextColor="#888888"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholderTextColor="#888888"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleProceedToPayment}
        disabled={cartItems.length === 0}
      >
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Simulated Payment</Text>
            <Text style={styles.modalSubtitle}>
              This is for demonstration only. Card details are pre-filled with
              random data.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              value="**** **** **** 1234"
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Card Holder"
              value="John Doe"
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Expiry Date"
              value="12/25"
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder="CVV"
              value="***"
              editable={false}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handlePayment}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.confirmButtonText}>Pay Now</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={{ backgroundColor: snackbarType === 'error' ? '#d32f2f' : '#388e3c' }}
        action={snackbarType === 'error' ? undefined : {
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMsg}
      </Snackbar>
    </View>
  );
};

export default OrderScreen;
