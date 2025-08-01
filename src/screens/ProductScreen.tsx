import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { RouteProp, useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { addItemAsync, loadCart } from '../store/cartSlice';
import ProductScreenStyles from '../styles/ProductScreenStyles';
import { useFirestore } from '../contexts/FirestoreContext';
import imageMap from '../utils/imageMap';
type RootStackParamList = {
  Product: { id: string };
  [key: string]: any;
};

const SIZES = ['Small', 'Medium', 'Large'];
const SWEETNESS = ['Less Sweet', 'Regular', 'Extra Sweet'];

const ProductScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Product'>>();
  const { id } = route.params;
  const { products } = useFirestore();
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
  const [selectedSize, setSelectedSize] = useState(availableSizes[1] || '');
  const [selectedSweetness, setSelectedSweetness] = useState(availableSweetness[1] || '');
  const [quantity, setQuantity] = useState(1);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const handleAddToCart = async () => {
    if (product) {
      await dispatch(addItemAsync({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        size: selectedSize,
        sweetness: selectedSweetness,
      }));
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
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Image
          source={
            typeof product.image === 'string' && imageMap[product.image]
              ? imageMap[product.image]
              : product.image
          }
          style={ProductScreenStyles.image}
          resizeMode="cover"
        />
        <Text style={ProductScreenStyles.title}>{product.name}</Text>
        <Text style={ProductScreenStyles.description}>{product.description}</Text>

        {/* Optionally, you can add more product details here if available in the data */}

        {/* Size Option (always shown if available) */}
        {availableSizes.length > 0 && (
          <>
            <Text style={ProductScreenStyles.sectionLabel}>Size</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 12 }}
            >
              <View style={ProductScreenStyles.optionRow}>
                {availableSizes.map(size => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      ProductScreenStyles.optionBtn,
                      selectedSize === size && ProductScreenStyles.optionBtnActive,
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text
                      style={[
                        ProductScreenStyles.optionBtnText,
                        selectedSize === size && ProductScreenStyles.optionBtnTextActive,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </>
        )}

        {/* Sweetness Option (only for coffee/tea) */}
        {availableSweetness.length > 0 && (
          <>
            <Text style={ProductScreenStyles.sectionLabel}>Sweetness</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 12 }}
            >
              <View style={ProductScreenStyles.optionRow}>
                {availableSweetness.map(level => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      ProductScreenStyles.optionBtn,
                      selectedSweetness === level && ProductScreenStyles.optionBtnActive,
                    ]}
                    onPress={() => setSelectedSweetness(level)}
                  >
                    <Text
                      style={[
                        ProductScreenStyles.optionBtnText,
                        selectedSweetness === level && ProductScreenStyles.optionBtnTextActive,
                      ]}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </>
        )}

        {/* Quantity Selector */}
        <View style={ProductScreenStyles.quantityContainer}>
          <Text style={ProductScreenStyles.sectionLabel}>Quantity</Text>
          <View style={ProductScreenStyles.quantitySelectorRow}>
            <TouchableOpacity
              style={ProductScreenStyles.quantityBtn}
              onPress={() => setQuantity(q => Math.max(1, q - 1))}
            >
              <Text style={ProductScreenStyles.quantityBtnText}>-</Text>
            </TouchableOpacity>
            <Text style={ProductScreenStyles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              style={ProductScreenStyles.quantityBtn}
              onPress={() => setQuantity(q => q + 1)}
            >
              <Text style={ProductScreenStyles.quantityBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={ProductScreenStyles.addToCartBtnFixed} onPress={handleAddToCart}>
          <Text style={ProductScreenStyles.addToCartBtnText}>Add to Cart</Text>
        </TouchableOpacity>
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
      </ScrollView>
    </View>
  );
};

export default ProductScreen;
