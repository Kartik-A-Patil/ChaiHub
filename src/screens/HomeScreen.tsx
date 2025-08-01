import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { homeScreenStyles as styles } from '../styles/HomeScreenStyles';
import { useFirestore } from '../contexts/FirestoreContext';
import { quickMenu } from '../data/data';
import imageMap from '../utils/imageMap';
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Product: { id: string };
  Search: undefined;
  ProductType: { type: string };
};

const FeaturedLoader = () => (
  <ContentLoader
    speed={1.5}
    width={250}
    height={180}
    viewBox="0 0 250 180"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <Rect x="0" y="0" rx="20" ry="20" width="250" height="140" />
    <Rect x="10" y="150" rx="5" ry="5" width="200" height="15" />
  </ContentLoader>
);

const OfferLoader = () => (
  <ContentLoader
    speed={1.5}
    width={350}
    height={100}
    viewBox="0 0 350 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <Rect x="10" y="15" rx="5" ry="5" width="200" height="20" />
    <Rect x="10" y="45" rx="5" ry="5" width="150" height="15" />
    <Rect x="250" y="10" rx="10" ry="10" width="80" height="60" />
  </ContentLoader>
);

const QuickMenuLoader = () => (
  <ContentLoader
    speed={1.5}
    width={180}
    height={70}
    viewBox="0 0 180 70"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <Rect x="0" y="5" rx="10" ry="10" width="60" height="60" />
    <Rect x="70" y="25" rx="5" ry="5" width="100" height="20" />
  </ContentLoader>
);

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {
    products,
    specialOffers,
    loading,
    fetchProducts,
    fetchSpecialOffers,
  } = useFirestore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchProducts(), fetchSpecialOffers()]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchProducts, fetchSpecialOffers]);

  // Helper to get 3 random products

  function getRandomProducts<T>(arr: T[], n: number): T[] {
    if (!Array.isArray(arr) || arr.length <= n) return arr;
    const result: T[] = [];
    const used = new Set<number>();
    while (result.length < n) {
      const idx = Math.floor(Math.random() * arr.length);
      if (!used.has(idx)) {
        used.add(idx);
        result.push(arr[idx]);
      }
    }
    return result;
  }

  const featuredProducts = getRandomProducts(products, 3);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <TouchableOpacity
        style={styles.searchBox}
        onPress={() => navigation.navigate('Search')}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="magnify" size={24} color="#8B857B" />
        <Text style={styles.searchInput}>
          Search for tea, coffee, or snacks
        </Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Featured</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.featuredRow}
        contentContainerStyle={{ paddingRight: 30, paddingLeft: 10 }}
      >
        {loading && !refreshing
          ? Array.from({ length: 3 }).map((_, i) => (
              <View key={i} style={styles.featuredItemContainer}>
                <FeaturedLoader />
              </View>
            ))
          : featuredProducts.map((item: (typeof products)[number]) => (
              <TouchableOpacity
                style={styles.featuredItemContainer}
                key={item.id}
                onPress={() => navigation.navigate('Product', { id: item.id })}
              >
                <View style={styles.featuredItem}>
                  <Image
                    source={
                      typeof item.image === 'string' && imageMap[item.image]
                        ? imageMap[item.image]
                        : item.image
                    }
                    style={styles.featuredImage}
                  />
                </View>
                <Text style={styles.featuredName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Special Offers</Text>
      {loading && !refreshing
        ? Array.from({ length: 2 }).map((_, i) => (
            <View style={styles.offerRow} key={i}>
              <OfferLoader />
            </View>
          ))
        : specialOffers.map(offer => (
            <View style={styles.offerRow} key={offer.id}>
              <View style={styles.offerText}>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
              </View>
              <Image source={offer.image} style={styles.offerImage} />
            </View>
          ))}

      <Text style={styles.quickMenuTitle}>Quick Menu</Text>
      <View style={styles.quickMenuGrid}>
        {loading && !refreshing
          ? Array.from({ length: Math.ceil(quickMenu.length / 2) }).map(
              (_, rowIdx) => (
                <View style={styles.quickMenuRow} key={rowIdx}>
                  {Array.from({ length: 2 }).map((_, i) => (
                    <View style={styles.quickMenuItem} key={i}>
                      <QuickMenuLoader />
                    </View>
                  ))}
                </View>
              ),
            )
          : Array.from({ length: Math.ceil(quickMenu.length / 2) }).map(
              (_, rowIdx) => {
                const firstIdx = rowIdx * 2;
                const rowItems = quickMenu.slice(firstIdx, firstIdx + 2);
                return (
                  <View style={styles.quickMenuRow} key={rowIdx}>
                    {rowItems.map(item => (
                      <TouchableOpacity
                        style={styles.quickMenuItem}
                        key={item.type}
                        onPress={() =>
                          navigation.navigate('ProductType', {
                            type: item.type,
                          })
                        }
                      >
                        <Image
                          source={item.image}
                          style={styles.quickMenuImage}
                        />
                        <Text style={styles.quickMenuName}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                    {rowItems.length === 1 && (
                      <View style={[styles.quickMenuItem, { opacity: 0 }]} />
                    )}
                  </View>
                );
              },
            )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
