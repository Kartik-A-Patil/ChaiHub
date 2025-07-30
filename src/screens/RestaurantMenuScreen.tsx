import React, { useState, useMemo } from 'react';
import imageMap from '../utils/imageMap';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addItemAsync } from '../store/cartSlice';
import { Picker } from '@react-native-picker/picker';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import RestaurantMenuStyles from '../styles/RestaurantMenuStyles';
import { useFirestore } from '../contexts/FirestoreContext';

import Ionicons from 'react-native-vector-icons/Ionicons';
// Type for route params
interface MenuScreenRouteParams {
  id: string;
}

type MenuScreenRouteProp = RouteProp<
  { params: MenuScreenRouteParams },
  'params'
>;

const TABS = [
  { key: 'tea', label: 'Chai' },
  { key: 'coffee', label: 'Coffee' },
  { key: 'snacks', label: 'Snacks' },
];

const RestaurantMenuScreen = () => {
  const route = useRoute<MenuScreenRouteProp>();
  const { id } = route.params;
  const { products ,restaurants} = useFirestore();
  const navigation = useNavigation();
  const restaurant = restaurants.find(r => r.id === id);
  const [activeTab, setActiveTab] = useState('tea');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const dispatch = useDispatch();

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const handleAddToCart = (product: any) => {
    dispatch(addItemAsync({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    }));
    setSnackbarVisible(true);
  };

  if (!restaurant) {
    return (
      <View style={RestaurantMenuStyles.centered}>
        <Text>Restaurant not found.</Text>
      </View>
    );
  }

  // Best selling: top 3 products by price (mock logic)
  const bestSelling = useMemo(
    () =>
      products
        .filter(p => p.restaurantId === id)
        .sort((a, b) => b.price - a.price)
        .slice(0, 3),
    [id],
  );

  // Menu items by tab
  let menuItems = useMemo(() => {
    let items = products.filter(
      p => p.restaurantId === id && p.type === activeTab,
    );
    return items;
  }, [id, activeTab]);

  // Header, image, best selling, menu title
  const listHeader = (
    <>
      
      <Image
        source={
          typeof restaurant.image === 'string' && imageMap[restaurant.image]
            ? imageMap[restaurant.image]
            : restaurant.image
        }
        style={RestaurantMenuStyles.image}
        resizeMode="cover"
      />
      {/* Best Selling */}
      <Text
        style={[
          RestaurantMenuStyles.menuTitle,
          { fontSize: 18, marginLeft: 0, marginTop: 0 },
        ]}
      >
        Best Selling
      </Text>
      <FlatList
        data={bestSelling}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 8, marginLeft: 0 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Product', { id: item.id })}
            activeOpacity={0.8}
          >
            <View
              style={{
                width: 140,
                marginRight: 12,
                backgroundColor: '#f8f8f8',
                borderRadius: 12,
                padding: 8,
              }}
            >
              <Image
                source={
                  typeof item.image === 'string' && imageMap[item.image]
                    ? imageMap[item.image]
                    : item.image
                }
                style={{ width: '100%', height: 70, borderRadius: 8 }}
              />

              <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 4 }}>
                {item.name}
              </Text>
              <Text style={{ color: '#888', fontSize: 12 }}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* Menu section title */}
      <Text style={RestaurantMenuStyles.menuTitle}>Menu</Text>
    </>
  );

  // Sticky filter/tabs bar as a separate component for FlatList stickyHeaderIndices
  const StickyFilterBar = () => (
    <View
      style={{
        backgroundColor: '#fff',
        paddingHorizontal: 0,
        paddingTop: 4,
        paddingBottom: 8,
        zIndex: 10,
      }}
    >
      {/* Tabs */}
      <View style={{ flexDirection: 'row' }}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={{
              borderBottomWidth: activeTab === tab.key ? 2 : 0,
              borderBottomColor: '#222',
              marginRight: 18,
              paddingBottom: 4,
            }}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={{
                color: activeTab === tab.key ? '#222' : '#888',
                fontWeight: activeTab === tab.key ? 'bold' : 'normal',
                fontSize: 15,
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // FlatList data: add a dummy item at index 0 for sticky filter bar, type safe
  type FlatListItem = (typeof menuItems)[number] | { type: 'sticky' };
  const flatListData: FlatListItem[] = [{ type: 'sticky' }, ...menuItems];

  return (
    <View style={RestaurantMenuStyles.container}>
      <FlatList
        data={flatListData}
        keyExtractor={(item, idx) => {
          if ('type' in item && item.type === 'sticky') return `sticky-${idx}`;
          // Product type
          return (item as (typeof products)[number]).id;
        }}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListHeaderComponent={listHeader}
        stickyHeaderIndices={[1]}
        renderItem={({ item, index }) => {
          if ('type' in item && item.type === 'sticky') {
            return <StickyFilterBar />;
          }
          // Product type guard
          const product = item as (typeof products)[number];
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Product', { id: product.id })}
              activeOpacity={0.8}
            >
              <View style={RestaurantMenuStyles.menuItem}>
                <Image
                  source={
                    typeof product.image === 'string' && imageMap[product.image]
                      ? imageMap[product.image]
                      : product.image
                  }
                  style={RestaurantMenuStyles.menuImage}
                  resizeMode="cover"
                />
                <View style={RestaurantMenuStyles.menuInfo}>
                  <Text style={RestaurantMenuStyles.menuName}>
                    {product.name}
                  </Text>
                  <Text style={RestaurantMenuStyles.menuDesc}>
                    {product.description}
                  </Text>
                  <Text style={RestaurantMenuStyles.menuPrice}>
                    ₹{product.price}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#222',
                    borderRadius: 16,
                    paddingHorizontal: 14,
                    paddingVertical: 7,
                    alignSelf: 'center',
                  }}
                  onPress={() => handleAddToCart(product)}
                >
                  <Text
                    style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}
                  >
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={{ color: '#888', textAlign: 'center', marginTop: 24 }}>
            No items found.
          </Text>
        }
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        duration={1000} // Adjust duration as needed
        action={{
          label: 'View Cart',
          onPress: () => {
            navigation.navigate('Cart');
          },
        }}
        style={{
          backgroundColor: '#222',
        }}
        textColor={'#fff'}
        >
        Item added to cart!
      </Snackbar>
    </View>
  );
};

export default RestaurantMenuScreen;
