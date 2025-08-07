import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { AppDispatch } from '../store/store';
import { selectCartItems, selectCartLoading } from '../store/cartSelectors';
import {
  updateQuantity,
  loadCart,
} from '../store/cartSlice';
import styles from '../styles/CartScreenStyles';
import imageMap from '../utils/imageMap';
import { useFirestore } from '../contexts/FirestoreContext';
import { useNavigation } from '@react-navigation/native';
import { hapticActions } from '../utils/hapticUtils';
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
    <SafeAreaView style={styles.root}> 
      <View style={styles.container}>
        {/* Cart Items Scrollable Section */}
        {items.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Ionicons name="cart-outline" size={72} color="#bbb" style={styles.emptyCartIcon} />
            <Text style={styles.emptyCartText}>
              Your cart is empty!
            </Text>
            <Text style={styles.emptyCartSubText}>
              Start adding some delicious items to your cart.
            </Text>
          </View>
        ) : (
          <ScrollView
            
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
          >
            {items.map(item => {
              const product = products.find(p => p.id === item.id);
              let imageSource = { uri: 'https://via.placeholder.com/60' };
              if (product && product.image) {
                if (typeof product.image === 'string' && imageMap[product.image]) {
                  imageSource = imageMap[product.image];
                } else if (typeof product.image === 'object' && product.image.uri) {
                  imageSource = { uri: product.image.uri };
                } else if (typeof product.image === 'string' && product.image.startsWith('http')) {
                  imageSource = { uri: product.image };
                }
              }
              return (
                <View key={item.id} style={styles.cartItemRow}>
                  <View style={styles.cartItemLeft}>
                    <Image
                      source={imageSource}
                      style={styles.cartItemImage}
                    />
                    <View
                      style={styles.cartItemTextWrap}
                    >
                      <Text style={styles.cartItemName}>{item.name}</Text>
                      <Text style={styles.cartItemDesc}>{item.quantity} item</Text>
                    </View>
                  </View>
                  <View style={styles.cartItemRight}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => handleUpdateQuantity(item.id, -1)}
                    >
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.qtyInput}
                      value={String(item.quantity)}
                      keyboardType="number-pad"
                      editable={false}
                    />
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => handleUpdateQuantity(item.id, 1)}
                    >
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}

        {/* Payment Section*/}
        <View
          style={styles.checkoutContainer}
        >
          <View style={styles.totalContainer}>
            <Text
              style={styles.totalLabel}
              numberOfLines={1}
            >
              Total
            </Text>
            <Text
              style={styles.totalValue}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              ${total.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => {
              hapticActions.navigate();
              (navigation as any).navigate('Order');
            }}
            disabled={items.length === 0}
          >
            <Text style={styles.checkoutBtnText}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
