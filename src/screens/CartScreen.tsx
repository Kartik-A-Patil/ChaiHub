import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { AppDispatch } from '../store/store';
import { selectCartItems, selectCartLoading } from '../store/cartSelectors';
import { updateQuantity, loadCart } from '../store/cartSlice';
import styles from '../styles/CartScreenStyles';
import imageMap from '../utils/imageMap';
import { useFirestore } from '../contexts/FirestoreContext';
import { useNavigation } from '@react-navigation/native';
import { hapticActions } from '../utils/hapticUtils';
import AnimatedScreenWrapper from '../components/AnimatedScreenWrapper';
import AnimatedButton from '../components/AnimatedButton';
const CartScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const items = useSelector(selectCartItems);
  const loading = useSelector(selectCartLoading);
  const { products } = useFirestore();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  const onRefresh = () => {
    hapticActions.refresh();
    dispatch(loadCart());
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    const newQuantity = Math.max(1, item.quantity + delta);

    // Add haptic feedback for quantity changes
    if (delta > 0) {
      hapticActions.quantityChange();
    } else if (delta < 0 && newQuantity === 1) {
      hapticActions.removeFromCart();
    } else {
      hapticActions.quantityChange();
    }

    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };
  return (
    <AnimatedScreenWrapper animationType="fadeIn" duration={250}>
      <SafeAreaView style={[styles.root, { backgroundColor: '#f7f8fa' }]}>
        <View style={styles.container}>
          {/* Cart Items Section */}
          {items.length === 0 ? (
            <View style={styles.emptyCartContainer}>
              <Ionicons
                name="cart-outline"
                size={80}
                color="#e0e0e0"
                style={styles.emptyCartIcon}
              />
              <Text
                style={[
                  styles.emptyCartText,
                  {
                    fontSize: 22,
                    color: '#888',
                    fontWeight: '600',
                    marginTop: 12,
                  },
                ]}
              >
                Your cart is empty!
              </Text>
              <Text
                style={[
                  styles.emptyCartSubText,
                  { color: '#aaa', marginTop: 4 },
                ]}
              >
                Start adding some delicious items to your cart.
              </Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={onRefresh} />
              }
              contentContainerStyle={{ paddingBottom: 16 }}
            >
              {items.map((item, index) => {
                const product = products.find(p => p.id === item.id);

                return (
                  <TouchableOpacity
                    key={item.id}
                    style={{
                      ...styles.cartItemRow,
                      backgroundColor: '#fff',
                      borderRadius: 16,
                      marginBottom: 6,
                    }}
                    onPress={() => {
                      hapticActions.navigate();
                      (navigation as any).navigate('Product', {
                        id: item.id,
                      });
                    }}
                  >
                    <View style={styles.cartItemLeft}>
                      <Image
                        source={imageMap[product?.image]}
                        style={[
                          styles.cartItemImage,
                          {
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: '#eee',
                          },
                        ]}
                      />
                      <View style={styles.cartItemTextWrap}>
                        <Text
                          style={[
                            styles.cartItemName,
                            { fontWeight: '600', fontSize: 17, color: '#222' },
                          ]}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            styles.cartItemDesc,
                            { color: '#888', fontSize: 13 },
                          ]}
                        >
                          {item.quantity} item
                        </Text>
                      </View>
                    </View>
                    <View style={styles.cartItemRight}>
                      <AnimatedButton
                        animationType="fade"
                        style={{
                          ...styles.qtyBtn,
                          backgroundColor: '#f0f0f0',
                          borderRadius: 8,
                        }}
                        onPress={() => handleUpdateQuantity(item.id, -1)}
                      >
                        <Text
                          style={[
                            styles.qtyBtnText,
                            { fontSize: 18, color: '#555' },
                          ]}
                        >
                          -
                        </Text>
                      </AnimatedButton>
                      <TextInput
                        style={[
                          styles.qtyInput,
                          {
                            fontWeight: '500',
                            color: '#222',
                            backgroundColor: '#f7f7f7',
                            borderRadius: 8,
                          },
                        ]}
                        value={String(item.quantity)}
                        keyboardType="number-pad"
                        editable={false}
                      />
                      <AnimatedButton
                        animationType="fade"
                        style={{
                          ...styles.qtyBtn,
                          backgroundColor: '#f0f0f0',
                          borderRadius: 8,
                        }}
                        onPress={() => handleUpdateQuantity(item.id, 1)}
                      >
                        <Text
                          style={[
                            styles.qtyBtnText,
                            { fontSize: 18, color: '#555' },
                          ]}
                        >
                          +
                        </Text>
                      </AnimatedButton>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

          {/* Payment Section*/}
          <View
            style={{
              ...styles.checkoutContainer,
              backgroundColor: '#fff',
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <View style={styles.totalContainer}>
              <Text
                style={[
                  styles.totalLabel,
                  { color: '#888', fontWeight: '500', fontSize: 16 },
                ]}
              >
                Total
              </Text>
              <Text
                style={[
                  styles.totalValue,
                  { color: '#222', fontWeight: '700', fontSize: 20 },
                ]}
              >
                ${total.toFixed(2)}
              </Text>
            </View>
            <AnimatedButton
              animationType="fade"
              style={{
                ...styles.orderButton,
                backgroundColor: items.length === 0 ? '#eee' : '#ff7043',
                borderRadius: 12,
                shadowColor: '#ff7043',
                shadowOpacity: items.length === 0 ? 0 : 0.12,
                shadowRadius: 8,
                elevation: items.length === 0 ? 0 : 3,
              }}
              onPress={() => {
                hapticActions.navigate();
                (navigation as any).navigate('Order');
              }}
              disabled={items.length === 0}
            >
              <Text
                style={[
                  styles.checkoutBtnText,
                  {
                    color: items.length === 0 ? '#aaa' : '#fff',
                    fontWeight: '600',
                    fontSize: 17,
                  },
                ]}
              >
                Order
              </Text>
            </AnimatedButton>
          </View>
        </View>
      </SafeAreaView>
    </AnimatedScreenWrapper>
  );
};

export default CartScreen;
