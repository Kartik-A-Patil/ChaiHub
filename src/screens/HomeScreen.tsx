import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Icon = MaterialCommunityIcons;
import { featuredItems, specialOffers, quickMenu } from '../data/data';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { homeScreenStyles as styles } from '../styles/HomeScreenStyles';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Product: { id: string };
  Search: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
  
      {/* Search Bar */}
      <TouchableOpacity
        style={styles.searchBox}
        onPress={() => navigation.navigate('Search')}
        activeOpacity={0.8}
      >
        <Icon name="magnify" size={24} color="#8B857B" />
        <Text style={styles.searchInput}>
          Search for tea, coffee, or snacks
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Featured</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.featuredRow}
      >
        {featuredItems.map(item => (
          <TouchableOpacity
            style={styles.featuredItemContainer}
            key={item.id}
            onPress={() => navigation.navigate('Product', { id: item.id })}
          >
            <View style={styles.featuredItem}>
              <Image source={item.image} style={styles.featuredImage} />
            </View>
            <Text style={styles.featuredName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Special Offers */}
      <Text style={styles.sectionTitle}>Special Offers</Text>
      {specialOffers.map(offer => (
        <View style={styles.offerRow} key={offer.id}>
          <View style={styles.offerText}>
            <Text style={styles.offerTitle}>{offer.title}</Text>
            <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
          </View>
          <Image source={offer.image} style={styles.offerImage} />
        </View>
      ))}

      {/* Quick Menu */}
      <Text style={styles.quickMenuTitle}>Quick Menu</Text>
      <View style={styles.quickMenuGrid}>
        {Array.from({ length: Math.ceil(quickMenu.length / 2) }).map((_, rowIdx) => {
          const firstIdx = rowIdx * 2;
          const rowItems = quickMenu.slice(firstIdx, firstIdx + 2);
          return (
            <View style={styles.quickMenuRow} key={rowIdx}>
              {rowItems.map(item => (
                <TouchableOpacity style={styles.quickMenuItem} key={item.id}>
                  <Image source={item.image} style={styles.quickMenuImage} />
                  <Text style={styles.quickMenuName}>{item.name}</Text>
                </TouchableOpacity>
              ))}
              {rowItems.length === 1 && (
                <View style={[styles.quickMenuItem, { opacity: 0 }]} />
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
