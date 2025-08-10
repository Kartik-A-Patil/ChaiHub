import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useFirestore } from '../contexts/FirestoreContext';
import imageMap from '../utils/imageMap';
type RootStackParamList = {
  ProductType: { type: string };
  Product: { id: string };
};
import { styles } from '../styles/ProductTypeScreenStyles';
const ProductTypeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { fetchProductsByType, restaurants, loading } = useFirestore();
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const type = (route.params as any)?.type;

  // Animation values
  const [slideAnim] = useState(new Animated.Value(-100));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [pourAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (type) {
      const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
      navigation.setOptions({ title: capitalizedType });

      // Reset animation values
      slideAnim.setValue(-100);
      fadeAnim.setValue(0);
      pourAnim.setValue(0);

      // Start animations
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();

      // Pour animation for tea/coffee
      if (type === 'tea' || type === 'coffee') {
        setTimeout(() => {
          Animated.loop(
            Animated.sequence([
              Animated.timing(pourAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true,
              }),
              Animated.timing(pourAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
              }),
            ]),
          ).start();
        }, 800);
      }

      fetchProductsByType(type)
        .then(fetchedProducts => {
          // Combine products with restaurant info and sort by restaurant rating
          const enrichedProducts = fetchedProducts
            .map(product => {
              const restaurant = restaurants.find(
                r => r.id === product.restaurantId,
              );
              return {
                ...product,
                restaurant,
                restaurantRating: restaurant?.rating
                  ? parseFloat(restaurant.rating)
                  : 0,
              };
            })
            .filter(product => product.restaurant) // Only include products with valid restaurants
            .sort((a, b) => b.restaurantRating - a.restaurantRating); // Sort by restaurant rating descending

          setProducts(enrichedProducts);
        })
        .catch(() => setError('Failed to fetch products.'));
    }
  }, [type, restaurants, navigation, slideAnim, fadeAnim, pourAnim]);

  const renderAnimatedHeader = () => {
    const getAnimationEmoji = () => {
      switch (type?.toLowerCase()) {
        case 'tea':
          return '🫖';
        case 'coffee':
          return '☕';
        case 'snacks':
          return '🍿';
        case 'desserts':
          return '🧁';
        case 'beverages':
          return '🥤';
        default:
          return '🍽️';
      }
    };

    const getAnimationText = () => {
      switch (type?.toLowerCase()) {
        case 'tea':
          return 'Brewing the perfect cup';
        case 'coffee':
          return 'Grinding fresh beans';
        case 'snacks':
          return 'Crispy & delicious';
        case 'desserts':
          return 'Sweet indulgence';
        case 'beverages':
          return 'Refreshing drinks';
        default:
          return 'Delicious options';
      }
    };
    if (!type) return null;

    return (
      <Animated.View
        style={[
          styles.animatedHeader,
          {
            transform: [{ translateY: slideAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.animatedEmoji,
            {
              transform: [
                {
                  rotate:
                    type === 'tea' || type === 'coffee'
                      ? pourAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '15deg'],
                        })
                      : '0deg',
                },
              ],
            },
          ]}
        >
          {getAnimationEmoji()}
        </Animated.Text>
        <Animated.Text style={[styles.animatedText, { opacity: fadeAnim }]}>
          {getAnimationText()}
        </Animated.Text>
        <View style={styles.separator} />
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          {renderAnimatedHeader()}
          <ActivityIndicator size="large" color="#C99E71" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Oops! Something went wrong</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
        </View>
      </View>
    );
  }

  const renderProductItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Product', { id: item.id })}
    >
      <View style={styles.productImageContainer}>
        <Image
          source={
            typeof item.image === 'string' && imageMap[item.image]
              ? imageMap[item.image]
              : item.image
          }
          style={styles.productImage}
        />
      </View>

      <View style={[styles.productInfo, { paddingLeft: 2, paddingRight: 8, justifyContent: 'center' }]}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
          <Text style={styles.restaurantName}>{item.restaurant?.name}</Text>
          <Text style={styles.distance}>
            ({item.restaurant?.distance || ''})
          </Text>
        </View>
        <Text style={styles.productDescription} numberOfLines={1}>
          {item.description}
        </Text>

        <View style={styles.productFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.currency}>$</Text>
            <Text style={styles.price}>{item.price.toFixed(2)}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              ★ {item.rating || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No delicious items found
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Try browsing other categories
              </Text>
            </View>
          )
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};



export default ProductTypeScreen;
