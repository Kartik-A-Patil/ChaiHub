import React, { useState, useLayoutEffect, useEffect } from 'react';
import ProductScreenCustomization from '../components/ProductScreenCustomization';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
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
import { getSnackbarStyle, snackbarTextStyle, snackbarActionStyle } from '../utils/snackbarUtils';
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

  const [selectedSize, setSelectedSize] = useState(availableSizes[1] || 'Medium');
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
  useEffect(() => {
    console.log('ProductScreen mounted with product:', product);
  }, [product]);

  // Reset customization options when product type changes
  useEffect(() => {
    if (product) {
      // Reset to defaults based on product type
      if (product.type === 'snacks' || product.type === 'others') {
        // For snacks and others, reset all non-size options
        setSelectedMilk('Regular');
        setSelectedSpices({ Ginger: 'None', Elaichi: 'None' });
        setSelectedStrength('Regular');
        setSelectedAddons([]);
        setSelectedSweetness('Regular');
      } else if (product.type === 'coffee') {
        // For coffee, reset spices
        setSelectedSpices({ Ginger: 'None', Elaichi: 'None' });
      }
    }
  }, [product?.type]);
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
    let basePrice = product?.price || 0;
    
    // Size multipliers - affects all product types
    const sizeMultipliers = {
      'Small': 0.85,
      'Medium': 1.0,
      'Large': 1.25,
    };
    
    let price = basePrice * (sizeMultipliers[selectedSize as keyof typeof sizeMultipliers] || 1.0);
    
    // Product type specific customizations
    if (product?.type === 'tea') {
      // Tea customizations
      if (selectedMilk === 'Soy') price += 0.5;
      if (selectedMilk === 'Regular') price += 0.25;
      // No charge for 'No Milk'
      
      if (selectedSpices.Ginger === 'Regular') price += 0.3;
      if (selectedSpices.Elaichi === 'Regular') price += 0.3;
      
      if (selectedStrength === 'Strong') price += 0.25;
      // No charge for 'Mild' and 'Regular'
      
      // Tea addons (Mint, Lemon)
      price += selectedAddons.length * 0.4;
      
      // Sweetness adjustment for tea
      if (selectedSweetness === 'Extra Sweet') price += 0.2;
      // No charge for 'Less Sweet' and 'Regular'
      
    } else if (product?.type === 'coffee') {
      // Coffee customizations
      if (selectedMilk === 'Soy') price += 0.6;
      if (selectedMilk === 'Regular') price += 0.3;
      // No charge for 'No Milk'
      
      if (selectedStrength === 'Strong') price += 0.4;
      // No charge for 'Mild' and 'Regular'
      
      // Coffee addons are more expensive (Extra Shot, Vanilla Syrup, etc.)
      const coffeeAddonPrices = {
        'Extra Shot': 1.0,
        'Vanilla Syrup': 0.5,
        'Caramel Syrup': 0.5,
        'Whipped Cream': 0.75,
      };
      
      selectedAddons.forEach(addon => {
        price += coffeeAddonPrices[addon as keyof typeof coffeeAddonPrices] || 0.5;
      });
      
      // Sweetness adjustment for coffee
      if (selectedSweetness === 'Extra Sweet') price += 0.25;
      // No charge for 'Less Sweet' and 'Regular'
      
    } else if (product?.type === 'snacks' || product?.type === 'others') {
      // For snacks and others, only size affects price
      // No additional customization charges
    }

    return price * quantity;
  };

  const handleAddToCart = async () => {
    if (product) {
      hapticActions.addToCart();
      
      // Build cart item based on product type
      const baseItem = {
        id: product.id,
        name: product.name,
        price: getCustomizedPrice(),
        quantity: quantity,
        size: selectedSize,
      };

      let cartItem;
      if (product.type === 'tea') {
        // Tea gets all options
        cartItem = {
          ...baseItem,
          sweetness: selectedSweetness,
          milk: selectedMilk,
          spices: selectedSpices,
          strength: selectedStrength,
          addons: selectedAddons,
        };
      } else if (product.type === 'coffee') {
        // Coffee gets everything except spices
        cartItem = {
          ...baseItem,
          sweetness: selectedSweetness,
          milk: selectedMilk,
          strength: selectedStrength,
          addons: selectedAddons,
        };
      } else {
        // Snacks and others only get size
        cartItem = baseItem;
      }

      await dispatch(addItemAsync(cartItem));
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
              ${getCustomizedPrice().toFixed(2)}
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
              <Text style={ProductScreenStyles.deliveryMainText}>Delivery</Text>
            </View>

            <View style={ProductScreenStyles.deliveryInfoItem}>
              <View style={ProductScreenStyles.deliveryIconContainer}>
                <Icon name="star" size={20} color="#FFD700" />
              </View>
              <Text style={ProductScreenStyles.deliverySubText}>{product.reviews}+</Text>
              <Text style={ProductScreenStyles.deliveryMainText}>Reviews</Text>
            </View>

            <View style={ProductScreenStyles.deliveryInfoItem}>
              <View style={ProductScreenStyles.deliveryIconContainer}>
                <Text style={ProductScreenStyles.ratingText}>{product.rating}</Text>
              </View>
              <Text style={ProductScreenStyles.deliverySubText}>Rating</Text>
            </View>
          </View>

          <ProductScreenCustomization
            productType={product.type}
            basePrice={product.price}
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
              <Text style={ProductScreenStyles.quantityButtonText}>-</Text>
            </TouchableOpacity>

            <Text style={ProductScreenStyles.quantityText}>{quantity}</Text>

            <TouchableOpacity
              style={ProductScreenStyles.quantityButton}
              onPress={() => {
                hapticActions.quantityChange();
                setQuantity(q => q + 1);
              }}
            >
              <Text style={ProductScreenStyles.quantityButtonText}>+</Text>
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
        style={getSnackbarStyle('success')}
        action={{
          label: 'View Cart',
          labelStyle: snackbarActionStyle,
          onPress: () => {
            navigation.navigate('Cart');
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

export default ProductScreen;
