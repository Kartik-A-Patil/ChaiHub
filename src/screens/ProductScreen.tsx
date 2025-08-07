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
import { hapticActions } from '../utils/hapticUtils';
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
  const product = products.find(p => p.id === id);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={ProductScreenStyles.headerBookmarkButton}
          onPress={() => {}}
        >
          <Icon name="bookmark-outline" size={20} color="#1a1a1a" />
        </TouchableOpacity>
      ),
      headerTitle: product?.name || 'Product',
    });
  }, [navigation]);

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const getCustomizedPrice = () => {
    let price = product?.price || 0;
    if (selectedMilk !== 'No Mink') price += 10;

    if (selectedSpices.Ginger === 'Regular') price += 5;
    if (selectedSpices.Elaichi === 'Regular') price += 5;
    if (selectedStrength === 'Strong') price += 5;
    price += selectedAddons.length * 10;
    return price * quantity;
  };

  const handleAddToCart = async () => {
    if (product) {
      hapticActions.addToCart();
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
        <Text style={ProductScreenStyles.productTitle}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={ProductScreenStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f7f7" />

      <ScrollView
        contentContainerStyle={ProductScreenStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={ProductScreenStyles.scrollContainer}
      >
        <View style={ProductScreenStyles.imageContainer}>
          <Image
            source={
              typeof product.image === 'string' && imageMap[product.image]
                ? imageMap[product.image]
                : product.image
            }
            style={ProductScreenStyles.productImage}
            resizeMode="cover"
          />
        </View>

        <View style={ProductScreenStyles.productInfoCard}>
          <View style={ProductScreenStyles.categoryTitleRow}>
            <View style={ProductScreenStyles.titleContainer}>
              <Text style={ProductScreenStyles.categoryText}>
                {product.type}
              </Text>

              <Text style={ProductScreenStyles.productTitle}>
                {product.name}
              </Text>
            </View>
            <Text style={ProductScreenStyles.priceText}>
              ₹{getCustomizedPrice()}
            </Text>
          </View>

          {(() => {
            const restaurant = restaurants?.find(
              r => r.id === product.restaurantId,
            );
            if (!restaurant) return null;

            return (
              <View style={ProductScreenStyles.restaurantInfo}>
                <Icon name="location-outline" size={16} color="#6c757d" />
                <Text style={ProductScreenStyles.restaurantText}>
                  {restaurant.name} • {restaurant.distance}
                </Text>
              </View>
            );
          })()}

          <View style={ProductScreenStyles.deliveryInfoRow}>
            <View style={ProductScreenStyles.deliveryInfoItem}>
              <View style={ProductScreenStyles.deliveryIconContainer}>
                <Icon name="time-outline" size={20} color="#1a1a1a" />
              </View>
              <Text style={ProductScreenStyles.deliverySubText}>10 min</Text>
              <Text style={ProductScreenStyles.deliveryMainText}>
                Delivery
              </Text>
            </View>

            <View style={ProductScreenStyles.deliveryInfoItem}>
              <View style={ProductScreenStyles.deliveryIconContainer}>
                <Icon name="star" size={20} color="#FFD700" />
              </View>
              <Text style={ProductScreenStyles.deliverySubText}>26+</Text>
              <Text style={ProductScreenStyles.deliveryMainText}>
                Reviews
              </Text>
            </View>

            <View style={ProductScreenStyles.deliveryInfoItem}>
              <View style={ProductScreenStyles.deliveryIconContainer}>
                <Text style={ProductScreenStyles.ratingText}>
                  4.8
                </Text>
              </View>
              <Text style={ProductScreenStyles.deliverySubText}>Rating</Text>
            </View>
          </View>

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

      <View style={ProductScreenStyles.bottomCartSection}>
        <View style={ProductScreenStyles.cartControlsRow}>
          <View style={ProductScreenStyles.quantityControls}>
            <TouchableOpacity
              style={ProductScreenStyles.quantityButton}
              onPress={() => {
                hapticActions.quantityChange();
                setQuantity(q => Math.max(1, q - 1));
              }}
            >
              <Text style={ProductScreenStyles.quantityButtonText}>
                -
              </Text>
            </TouchableOpacity>

            <Text style={ProductScreenStyles.quantityText}>
              {quantity}
            </Text>

            <TouchableOpacity
              style={ProductScreenStyles.quantityButton}
              onPress={() => {
                hapticActions.quantityChange();
                setQuantity(q => q + 1);
              }}
            >
              <Text style={ProductScreenStyles.quantityButtonText}>
                +
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={ProductScreenStyles.addToCartButton}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Text style={ProductScreenStyles.addToCartButtonText}>
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
