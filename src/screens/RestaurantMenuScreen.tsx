import React, { useState, useMemo } from 'react';
import imageMap from '../utils/imageMap';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addItemAsync } from '../store/cartSlice';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import RestaurantMenuStyles from '../styles/RestaurantMenuStyles';
import { useFirestore } from '../contexts/FirestoreContext';
import StickyFilterBar from '../components/StickyFilterBar';

// Type for route params
interface MenuScreenRouteParams {
  id: string;
}

type MenuScreenRouteProp = RouteProp<
  { params: MenuScreenRouteParams },
  'params'
>;

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

  const bestSelling = useMemo(
    () =>
      products
        .filter(p => p.restaurantId === id)
        .sort((a, b) => b.price - a.price)
        .slice(0, 3),
    [id, products],
  );

  const menuItems = useMemo(() => {
    return products.filter(
      p => p.restaurantId === id && p.type === activeTab,
    );
  }, [id, activeTab, products]);

  if (!restaurant) {
    return (
      <View style={RestaurantMenuStyles.centered}>
        <Text>Restaurant not found.</Text>
      </View>
    );
  }

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
        style={[RestaurantMenuStyles.menuTitle, RestaurantMenuStyles.bestSellingTitle]}
      >
        Best Selling
      </Text>
      <FlatList
        data={bestSelling}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={RestaurantMenuStyles.bestSellingList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Product', { id: item.id })}
            activeOpacity={0.8}
          >
            <View
              style={RestaurantMenuStyles.bestSellingItem}
            >
              <Image
                source={
                  typeof item.image === 'string' && imageMap[item.image]
                    ? imageMap[item.image]
                    : item.image
                }
                style={RestaurantMenuStyles.bestSellingImage}
              />

              <Text style={RestaurantMenuStyles.bestSellingName}>
                {item.name}
              </Text>
              <Text style={RestaurantMenuStyles.bestSellingDescription}>
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
        renderItem={({ item }) => {
          if ('type' in item && item.type === 'sticky') {
            return <StickyFilterBar activeTab={activeTab} setActiveTab={setActiveTab} />;
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
                  style={RestaurantMenuStyles.addToCartButton}
                  onPress={() => handleAddToCart(product)}
                >
                  <Text
                    style={RestaurantMenuStyles.addToCartButtonText}
                  >
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={RestaurantMenuStyles.emptyList}>
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
        style={RestaurantMenuStyles.snackbar}
        textColor={'#fff'}
        >
        Item added to cart!
      </Snackbar>
    </View>
  );
};

export default RestaurantMenuScreen;
