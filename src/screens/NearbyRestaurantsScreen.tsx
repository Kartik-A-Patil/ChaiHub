import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Resto from '../assets/Resto.webp';

import NearbyRestaurantsStyles from '../styles/NearbyRestaurantsStyles';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useFirestore } from '../contexts/FirestoreContext';

type RootStackParamList = {
  RestaurantMenu: { id: string };
};
const NearbyRestaurantsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { restaurants } = useFirestore();
  return (
    <View style={NearbyRestaurantsStyles.container}>
      <View style={NearbyRestaurantsStyles.filterRow}>
        <TouchableOpacity style={NearbyRestaurantsStyles.filterBtn}>
          <Text style={NearbyRestaurantsStyles.filterBtnText}>Distance ▼</Text>
        </TouchableOpacity>
        <TouchableOpacity style={NearbyRestaurantsStyles.filterBtn}>
          <Text style={NearbyRestaurantsStyles.filterBtnText}>Rating ▼</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate('RestaurantMenu', { id: item.id })
            }
          >
            <View style={NearbyRestaurantsStyles.card}>
              <Image
                source={Resto}
                style={NearbyRestaurantsStyles.image}
                resizeMode="cover"
              />
              <View style={NearbyRestaurantsStyles.info}>
                <Text style={NearbyRestaurantsStyles.name}>{item.name}</Text>
                <Text style={NearbyRestaurantsStyles.details}>
                  {item.distance} · ★ {item.rating} ({item.reviews}+)
                </Text>
                <Text style={NearbyRestaurantsStyles.openHours}>
                  Open until {item.openUntil}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default NearbyRestaurantsScreen;
