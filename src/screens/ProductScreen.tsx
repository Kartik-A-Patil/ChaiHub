import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import ProductScreenStyles from '../styles/ProductScreenStyles';
import { products } from '../data/restaurants';

type RootStackParamList = {
  Product: { id: string };
  [key: string]: any;
};


const SIZES = ['Small', 'Medium', 'Large'];
const SWEETNESS = ['Less Sweet', 'Regular', 'Extra Sweet'];

const ProductScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Product'>>();
  const { id } = route.params;

  // Find product by id from products array
  const product = products.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedSweetness, setSelectedSweetness] = useState('Regular');

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
          source={typeof product.image === 'string' ? { uri: product.image } : product.image}
          style={ProductScreenStyles.image}
          resizeMode="cover"
        />
        <Text style={ProductScreenStyles.title}>{product.name}</Text>
        <Text style={ProductScreenStyles.description}>{product.description}</Text>

        {/* Optionally, you can add more product details here if available in the data */}

        <Text style={ProductScreenStyles.sectionLabel}>Size</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 12 }}
        >
          <View style={ProductScreenStyles.optionRow}>
            {SIZES.map(size => (
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

        <Text style={ProductScreenStyles.sectionLabel}>Sweetness</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 12 }}
        >
          <View style={ProductScreenStyles.optionRow}>
            {SWEETNESS.map(level => (
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
      </ScrollView>
      <TouchableOpacity style={ProductScreenStyles.addToCartBtnFixed}>
        <Text style={ProductScreenStyles.addToCartBtnText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductScreen;
