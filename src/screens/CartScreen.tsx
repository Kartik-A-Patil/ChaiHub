import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { cartItems as cartItemsMock } from '../data/data';
import styles from '../styles/CartScreenStyles';

const CartScreen = () => {
  const [items, setItems] = useState<typeof cartItemsMock>(cartItemsMock);

  const total = 18.5;

  const updateQuantity = (id: number, delta: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconBtn}>
            {/* Replace with icon library in production */}
            <Text style={{ fontSize: 24, color: '#161412' }}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cart</Text>

        </View>

        {/* Cart Items Scrollable Section */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {items.map((item: (typeof cartItemsMock)[0]) => (
            <View key={item.id} style={styles.cartItemRow}>
              <View style={styles.cartItemLeft}>
                <Image
                  source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                  style={styles.cartItemImage}
                />
                <View
                  style={
                    styles.cartItemTextWrap || { justifyContent: 'center' }
                  }
                >
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemDesc}>{item.quantity} item</Text>
                </View>
              </View>
              <View style={styles.cartItemRight}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.id, -1)}
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
                  onPress={() => updateQuantity(item.id, 1)}
                >
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Payment Section at Bottom - Total and Order button in a single row */}
        <View
          style={[
            styles.checkoutContainer,
            {
              borderTopWidth: 1,
              borderColor: '#eee',
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingVertical: 16,
            },
          ]}
        >
          <View style={{ flexDirection: 'column' }}>
            <Text style={[styles.paymentLabel, { maxWidth: 80 }]} numberOfLines={1} ellipsizeMode="tail">Total</Text>
            <Text
              style={[
                styles.paymentValue,
                { fontSize: 18, fontWeight: 'bold', maxWidth: 100 },
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              ${total.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity style={[styles.checkoutBtn, { maxWidth: 180, marginLeft: 16 }]}>
            <Text style={styles.checkoutBtnText}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
