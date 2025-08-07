import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import NearbyRestaurantsStyles from '../styles/NearbyRestaurantsStyles';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useFirestore } from '../contexts/FirestoreContext';
import imageMap from '../utils/imageMap';
import { hapticActions } from '../utils/hapticUtils';

type RootStackParamList = {
  RestaurantMenu: { id: string };
};

type SortType = 'distance' | 'rating';
type SortOrder = 'asc' | 'desc';

const NearbyRestaurantsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { restaurants } = useFirestore();
  const [sortType, setSortType] = useState<SortType>('distance');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const sortedRestaurants = useMemo(() => {
    return [...restaurants].sort((a, b) => {
      if (sortType === 'distance') {
        const distanceA = parseFloat(a.distance.split(' ')[0]);
        const distanceB = parseFloat(b.distance.split(' ')[0]);
        return sortOrder === 'asc' ? distanceA - distanceB : distanceB - distanceA;
      } else {
        return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      }
    });
  }, [restaurants, sortType, sortOrder]);

  const handleSort = (type: SortType) => {
    hapticActions.filterChange();
    if (type === sortType) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortType(type);
      setSortOrder('asc');
    }
  };

  return (
    <View style={NearbyRestaurantsStyles.container}>
      {/* Modern sorting header */}
      <View style={NearbyRestaurantsStyles.headerContainer}>
        <View style={NearbyRestaurantsStyles.sortContainer}>
          <TouchableOpacity 
            style={[
              NearbyRestaurantsStyles.sortButton, 
              sortType === 'distance' && NearbyRestaurantsStyles.activeSortButton
            ]}
            onPress={() => handleSort('distance')}
          >
            <Text style={[
              NearbyRestaurantsStyles.sortButtonText, 
              sortType === 'distance' && NearbyRestaurantsStyles.activeSortButtonText
            ]}>
              Distance
            </Text>
            {sortType === 'distance' && (
              <Text style={NearbyRestaurantsStyles.sortIcon}>
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              NearbyRestaurantsStyles.sortButton, 
              sortType === 'rating' && NearbyRestaurantsStyles.activeSortButton
            ]}
            onPress={() => handleSort('rating')}
          >
            <Text style={[
              NearbyRestaurantsStyles.sortButtonText, 
              sortType === 'rating' && NearbyRestaurantsStyles.activeSortButtonText
            ]}>
              Rating
            </Text>
            {sortType === 'rating' && (
              <Text style={NearbyRestaurantsStyles.sortIcon}>
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={sortedRestaurants}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={NearbyRestaurantsStyles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={NearbyRestaurantsStyles.restaurantCard}
            onPress={() => {
              hapticActions.navigate();
              navigation.navigate('RestaurantMenu', { id: item.id });
            }}
            activeOpacity={0.7}
          >
            <Image
              source={imageMap[item.image]}
              style={NearbyRestaurantsStyles.restaurantImage}
              resizeMode="cover"
            />
            <View style={NearbyRestaurantsStyles.restaurantInfo}>
              <Text style={NearbyRestaurantsStyles.restaurantName}>{item.name}</Text>
              <View style={NearbyRestaurantsStyles.metaInfo}>
                <View style={NearbyRestaurantsStyles.ratingContainer}>
                  <Text style={NearbyRestaurantsStyles.ratingIcon}>★</Text>
                  <Text style={NearbyRestaurantsStyles.ratingText}>{item.rating}</Text>
                  <Text style={NearbyRestaurantsStyles.reviewText}>({item.reviews}+)</Text>
                </View>
                <View style={NearbyRestaurantsStyles.distanceContainer}>
                  <Text style={NearbyRestaurantsStyles.distanceText}>{item.distance}</Text>
                </View>
              </View>
              <Text style={NearbyRestaurantsStyles.openHours}>
                Open until {item.openUntil}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NearbyRestaurantsScreen;
