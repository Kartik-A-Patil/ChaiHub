import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SectionList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useFirestore } from '../contexts/FirestoreContext';
import { homeScreenStyles as styles } from '../styles/HomeScreenStyles';
import imageMap from '../utils/imageMap';
type RootStackParamList = {
  ProductType: { type: string };
  Product: { id: string };
};

const ProductTypeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { fetchProductsByType, restaurants, loading } = useFirestore();
  const [sections, setSections] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const type = (route.params as any)?.type;

  useEffect(() => {
    if (type) {
      const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
      navigation.setOptions({ title: capitalizedType });
      fetchProductsByType(type)
        .then(products => {
          // Group products by restaurantId
          const grouped: { [key: string]: any[] } = {};
          products.forEach(prod => {
            if (!grouped[prod.restaurantId]) grouped[prod.restaurantId] = [];
            grouped[prod.restaurantId].push(prod);
          });
          // Build sections with restaurant info
          let sections = Object.keys(grouped)
            .map(rid => {
              const restaurant = restaurants.find(r => r.id === rid);
              return {
                restaurant,
                data: grouped[rid],
              };
            })
            .filter(section => section.restaurant); // Only show if restaurant exists
          // Sort by distance (assuming distance is a string like '0.5 km')
          sections = sections.sort((a, b) => {
            const getDist = (r: any) => {
              const d = r?.restaurant?.distance;
              if (!d) return 9999;
              const num = parseFloat(d);
              return isNaN(num) ? 9999 : num;
            };
            return getDist(a) - getDist(b);
          });
          setSections(sections);
        })
        .catch(() => setError('Failed to fetch products.'));
    }
  }, [type, restaurants, navigation]);

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, marginTop: 40 }}
        size="large"
        color="#8B857B"
      />
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: '#FAFAFA' }]}> 
      <SectionList
        sections={sections}
        style={{ paddingHorizontal: 5}}
        keyExtractor={item => item.id}
        renderSectionHeader={({ section }) => {
          const sectionIndex = sections.findIndex(s => s.restaurant?.id === section.restaurant?.id);
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
                marginTop: 20,
                marginHorizontal: 18,
                backgroundColor: 'transparent',
                // Add border between sections except the first
                borderTopWidth: sectionIndex !== 0 ? 1 : 0,
                borderTopColor: sectionIndex !== 0 ? '#ECECEC' : 'transparent',
                paddingTop: sectionIndex !== 0 ? 18 : 0,
              }}
            >
              <Image
                source={
                  typeof section.restaurant.image === 'string' &&
                  imageMap[section.restaurant.image]
                    ? imageMap[section.restaurant.image]
                    : section.restaurant.image
                }
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 10,
                  marginRight: 12,
                  backgroundColor: '#F0F0F0',
                }}
              />
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '700',
                      color: '#232323',
                      letterSpacing: 0.2,
                    }}
                  >
                    {section.restaurant.name}
                  </Text>
                  <Text
                    style={{
                      color: '#B0AFAF',
                      fontSize: 12,
                      marginLeft: 10,
                      fontWeight: '500',
                    }}
                  >
                    {section.restaurant.distance}
                  </Text>
                </View>
                <Text style={{ color: '#8B857B', fontSize: 12, marginTop: 2 }}>
                  {section.restaurant.address}
                </Text>
                <Text style={{ color: '#B0AFAF', fontSize: 11, marginTop: 2 }}>
                  Open until {section.restaurant.openUntil} |{' '}
                  <Text style={{ color: '#FFC107', fontWeight: 'bold' }}>
                    {section.restaurant.rating}★
                  </Text>{' '}
                  ({section.restaurant.reviews} reviews)
                </Text>
              </View>
            </View>
          );
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              borderRadius: 16,
              marginHorizontal: 18,
              marginBottom: 14,
              padding: 0,
              flexDirection: 'row',
              alignItems: 'center',
              minHeight: 110,
            }}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Product', { id: item.id })}
          >
            <View
              style={{
                flex: 1,
                paddingLeft: 16,
                paddingVertical: 12,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  color: '#232323',
                  marginBottom: 2,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{ color: '#8B857B', fontSize: 12, marginBottom: 4 }}
                numberOfLines={2}
              >
                {item.description}
              </Text>
              <Text
                style={{ color: '#232323', fontWeight: 'bold', fontSize: 15 }}
              >
                ₹{item.price}
              </Text>
            </View>
            <Image
              source={
                typeof item.image === 'string' && imageMap[item.image]
                  ? imageMap[item.image]
                  : item.image
              }
              style={{
                width: 90,
                height: 90,
                borderRadius: 16,
                marginRight: 16,
                backgroundColor: '#F0F0F0',
              }}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: 'center',
              marginTop: 60,
              color: '#B0AFAF',
              fontSize: 16,
            }}
          >
            No products found.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductTypeScreen;
