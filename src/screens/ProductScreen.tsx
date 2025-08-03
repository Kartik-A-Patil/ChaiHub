import React, { useState, useLayoutEffect } from 'react';
import ProductScreenCustomization from '../components/ProductScreenCustomization';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import {
  RouteProp,
  useRoute,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { addItemAsync, loadCart } from '../store/cartSlice';
import ProductScreenStyles from '../styles/ProductScreenStyles';
import { useFirestore } from '../contexts/FirestoreContext';
import imageMap from '../utils/imageMap';
import Icon from 'react-native-vector-icons/Ionicons';
type RootStackParamList = {
  Product: { id: string };
  [key: string]: any;
};

const SIZES = ['Small', 'Medium', 'Large'];
const SWEETNESS = ['Less Sweet', 'Regular', 'Extra Sweet'];

const ProductScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Product'>>();
  const { id } = route.params;
  const { products, restaurants } = useFirestore();
  // Find product by id from products array
  const product = products.find(p => p.id === id);

  // Determine available options based on product type
  let availableSizes: string[] = [];
  let availableSweetness: string[] = [];
  if (product?.type === 'coffee' || product?.type === 'tea') {
    availableSizes = SIZES;
    availableSweetness = SWEETNESS;
  } else if (product?.type === 'snacks') {
    availableSizes = SIZES;
    availableSweetness = [];
  } else if (product?.type === 'others') {
    availableSizes = SIZES;
    availableSweetness = [];
  }

  // Set default selections based on available options
  // Customization states
  const [selectedSize, setSelectedSize] = useState(availableSizes[1] || '');
  const [selectedSweetness, setSelectedSweetness] = useState(
    availableSweetness[1] || '',
  );
  const [selectedMilk, setSelectedMilk] = useState('Regular');
  const [selectedSpices, setSelectedSpices] = useState<{
    [key: string]: string;
  }>({
    Ginger: 'None',
    Elaichi: 'None',
  });
  const [selectedStrength, setSelectedStrength] = useState('Regular');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Add bookmark button to the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 16,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
          onPress={() => {
            /* TODO: handle bookmark action */
          }}
        >
          <Icon name="bookmark-outline" size={20} color="#1a1a1a" />
        </TouchableOpacity>
      ),
      headerTitle: product?.name || 'Product',
    });
  }, [navigation]);

  const onDismissSnackBar = () => setSnackbarVisible(false);

  // Price calculation based on customizations
  const getCustomizedPrice = () => {
    let price = product?.price || 0;
    // Milk type (except Not Added)
    if (selectedMilk !== 'No Mink') price += 10;

    // Spices
    if (selectedSpices.Ginger === 'Regular') price += 5;
    if (selectedSpices.Elaichi === 'Regular') price += 5;
    // Strength (Strong)
    if (selectedStrength === 'Strong') price += 5;
    // Add-ons
    price += selectedAddons.length * 10;
    return price * quantity;
  };

  const handleAddToCart = async () => {
    if (product) {
      await dispatch(
        addItemAsync({
          id: product.id,
          name: product.name,
          price: getCustomizedPrice(),
          quantity: quantity,
          size: selectedSize,
          sweetness: selectedSweetness,
          milk: selectedMilk,
          spices: selectedSpices,
          strength: selectedStrength,
          addons: selectedAddons,
        }),
      );
      await dispatch(loadCart());
      setSnackbarVisible(true);
    }
  };

  if (!product) {
    return (
      <View style={ProductScreenStyles.container}>
        <Text style={ProductScreenStyles.title}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={ProductScreenStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f7f7" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {/* Product Image */}
        <View
          style={{
            marginHorizontal: 0,
            overflow: 'hidden',
          }}
        >
          <Image
            source={
              typeof product.image === 'string' && imageMap[product.image]
                ? imageMap[product.image]
                : product.image
            }
            style={{ width: '100%', height: 320 }}
            resizeMode="cover"
          />
        </View>

        {/* Product Info Card */}
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 34,
            borderTopRightRadius: 34,
            padding: 24,
            marginTop: -20,
          }}
        >
          {/* Category and Title */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#6c757d',
                  marginBottom: 8,
                  textTransform: 'capitalize',
                }}
              >
                {product.type}
              </Text>

              <Text
                style={{
                  fontSize: 28,
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: 16,
                  lineHeight: 34,
                  flexShrink: 1,
                  flexWrap: 'wrap',
                }}
              >
                {product.name}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 32,
                fontWeight: '700',
                color: '#1a1a1a',
                textAlign: 'right',
                marginBottom: 0,
                marginRight: 15,
                minWidth: 80,
              }}
            >
              ₹{getCustomizedPrice()}
            </Text>
          </View>

          {/* Restaurant Info */}
          {(() => {
            const restaurant = restaurants?.find(
              r => r.id === product.restaurantId,
            );
            if (!restaurant) return null;

            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <Icon name="location-outline" size={16} color="#6c757d" />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#6c757d',
                    marginLeft: 4,
                    flex: 1,
                  }}
                >
                  {restaurant.name} • {restaurant.distance}
                </Text>
              </View>
            );
          })()}

          {/* Delivery Info Row */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <View style={{ alignItems: 'center', flex: 1 }}>
              <View
                style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: 12,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  marginBottom: 4,
                }}
              >
                <Icon name="time-outline" size={20} color="#1a1a1a" />
              </View>
              <Text style={{ fontSize: 12, color: '#6c757d' }}>10 min</Text>
              <Text
                style={{ fontSize: 14, fontWeight: '600', color: '#1a1a1a' }}
              >
                Delivery
              </Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1 }}>
              <View
                style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: 12,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  marginBottom: 4,
                }}
              >
                <Icon name="star" size={20} color="#FFD700" />
              </View>
              <Text style={{ fontSize: 12, color: '#6c757d' }}>26+</Text>
              <Text
                style={{ fontSize: 14, fontWeight: '600', color: '#1a1a1a' }}
              >
                Reviews
              </Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1 }}>
              <View
                style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: 12,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: '700', color: '#1a1a1a' }}
                >
                  4.8
                </Text>
              </View>
              <Text style={{ fontSize: 12, color: '#6c757d' }}>Rating</Text>
            </View>
          </View>

          {/* Customization Options */}
          <ProductScreenCustomization
            selectedMilk={selectedMilk}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            setSelectedMilk={setSelectedMilk}
            selectedSpices={selectedSpices}
            setSelectedSpices={setSelectedSpices}
            selectedStrength={selectedStrength}
            setSelectedStrength={setSelectedStrength}
            selectedAddons={selectedAddons}
            setSelectedAddons={setSelectedAddons}
            selectedSweetness={selectedSweetness}
            setSelectedSweetness={setSelectedSweetness}
            showSweetness={availableSweetness.length > 0}
          />
        </View>

      </ScrollView>

      {/* Bottom Cart Section */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#fff',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingTop: 20,
          paddingBottom: 34,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Quantity Controls */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              borderRadius: 16,
              paddingHorizontal: 4,
              paddingVertical: 4,
            }}
          >
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: '#1a1a1a',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setQuantity(q => Math.max(1, q - 1))}
            >
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600' }}>
                -
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#1a1a1a',
                marginHorizontal: 20,
                minWidth: 20,
                textAlign: 'center',
              }}
            >
              {quantity}
            </Text>

            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: '#1a1a1a',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setQuantity(q => q + 1)}
            >
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600' }}>
                +
              </Text>
            </TouchableOpacity>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={{
              flex: 1,
              height: 56,
              borderRadius: 16,
              backgroundColor: '#FF6B35',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 16,
              shadowColor: '#FF6B35',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '700',
              }}
            >
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        duration={1000}
        action={{
          label: 'View Cart',
          onPress: () => {
            navigation.navigate('Cart');
          },
        }}
      >
        Item added to cart!
      </Snackbar>
    </View>
  );
};

export default ProductScreen;
