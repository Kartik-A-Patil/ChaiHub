import React, { useState, useMemo } from 'react';
import imageMap from '../utils/imageMap';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { addItemAsync } from '../store/cartSlice';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import RestaurantMenuStyles from '../styles/RestaurantMenuStyles';
import { useFirestore } from '../contexts/FirestoreContext';
import StickyFilterBar from '../components/StickyFilterBar';
import { hapticActions } from '../utils/hapticUtils';
import { getSnackbarStyle, snackbarTextStyle, snackbarActionStyle } from '../utils/snackbarUtils';

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
  const { products, restaurants } = useFirestore();
  const navigation = useNavigation();
  const restaurant = restaurants.find(r => r.id === id);
  const [activeTab, setActiveTab] = useState('tea');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const handleAddToCart = (product: any) => {
    hapticActions.addToCart();
    dispatch(
      addItemAsync({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      }),
    );
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
    return products.filter(p => p.restaurantId === id && p.type === activeTab);
  }, [id, activeTab, products]);

  if (!restaurant) {
    return (
      <View style={RestaurantMenuStyles.centered}>
        <Text>Restaurant not found.</Text>
      </View>
    );
  }

  const listHeader = (
    <>
      <Image
        source={
          typeof restaurant.image === 'string' && imageMap[restaurant.image]
            ? imageMap[restaurant.image]
            : restaurant.image
        }
        style={RestaurantMenuStyles.headerImage}
        resizeMode="cover"
      />
      <View style={RestaurantMenuStyles.headerDetailsContainer}>
        <Text style={RestaurantMenuStyles.title}>{restaurant.name}</Text>
        <Text style={RestaurantMenuStyles.address}>{restaurant.address}</Text>
        <Text style={RestaurantMenuStyles.details}>
          {restaurant.rating} ★ ({restaurant.reviews} reviews)
        </Text>
        <Text style={RestaurantMenuStyles.openHours}>
          Open until {restaurant.openUntil}
        </Text>
      </View>

      <Text style={RestaurantMenuStyles.menuTitle}>Best Selling</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={RestaurantMenuStyles.bestSellingList}
        contentContainerStyle={{ paddingRight: 10, paddingLeft: 10 }}
      >
        {bestSelling.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => (navigation as any).navigate('Product', { id: item.id })}
            activeOpacity={0.8}
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
            <View style={RestaurantMenuStyles.bestSellingInfo}>
              <Text style={RestaurantMenuStyles.bestSellingName} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={RestaurantMenuStyles.menuPrice}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={RestaurantMenuStyles.addToCartButton}
                  onPress={() => handleAddToCart(item)}
                  activeOpacity={0.8}
                >
                  <Text style={RestaurantMenuStyles.addToCartButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <StickyFilterBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Text style={RestaurantMenuStyles.menuTitle}>Menu</Text>
    </>
  );

  const EmptyList = () => {
    return (
      <View style={{ alignItems: 'center', marginTop: 48, marginBottom: 48 }}>
        <Image
          source={require('../assets/spllied.png')}
          style={{ width: 146, height: 146 }}
        />
        <Text
          style={{
            color: '#555',
            fontSize: 16,
            marginTop: 18,
            fontWeight: '500',
            letterSpacing: 0.2,
          }}
        >
          Nothing brewing here yet
        </Text>
        <Text
          style={{
            color: '#AAA',
            fontSize: 13,
            marginTop: 4,
            fontWeight: '400',
          }}
        >
          Try another category
        </Text>
      </View>
    );
  };

  type FlatListItem = (typeof menuItems)[number];
  const flatListData: FlatListItem[] = menuItems;

  return (
    <View style={RestaurantMenuStyles.container}>
      <FlatList
        data={flatListData}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 180 }}
        ListHeaderComponent={listHeader}
        renderItem={({ item }) => {
          const product = item;
          return (
            <TouchableOpacity
              onPress={() =>
                (navigation as any).navigate('Product', { id: product.id })
              }
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
                  <View>
                    <Text style={RestaurantMenuStyles.menuName}>
                      {product.name}
                    </Text>
                    <Text style={RestaurantMenuStyles.menuDesc}>
                      {product.description}
                    </Text>
                  </View>
                  <View style={RestaurantMenuStyles.menuBottomRow}>
                    <Text style={RestaurantMenuStyles.menuPrice}>
                      ${product.price.toFixed(2)}
                    </Text>
                    <TouchableOpacity
                      style={RestaurantMenuStyles.addToCartButton}
                      onPress={() => handleAddToCart(product)}
                    >
                      <Text style={RestaurantMenuStyles.addToCartButtonText}>
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={<EmptyList />}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        duration={1000}
        style={getSnackbarStyle('success')}
        action={{
          label: 'View Cart',
          labelStyle: snackbarActionStyle,
          onPress: () => {
            (navigation as any).navigate('Cart');
          },
        }}
      >
        <Text style={snackbarTextStyle}>
          Item added to cart!
        </Text>
      </Snackbar>
    </View>
  );
};

export default RestaurantMenuScreen;
