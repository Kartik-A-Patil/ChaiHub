import React, { useCallback, useState } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
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
import { StackNavigationProp } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';

import { homeScreenStyles as styles } from '../styles/HomeScreenStyles';
import { useFirestore } from '../contexts/FirestoreContext';
import { quickMenu } from '../data/data';
import imageMap from '../utils/imageMap';
import { hapticActions } from '../utils/hapticUtils';
const Showcase = require('../assets/showcase.png');
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
      {/* Custom Header - Improved to match reference */}
      <Animatable.View
        animation="fadeInDown"
        duration={1000}
        style={{
          marginTop: 18,
          marginBottom: 18,
          position: 'relative',
          minHeight: 260,
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        {/* Right content */}
        <View style={{ flex: 1 }}>
          {/* Decorative icons spread across the header */}
          <Animatable.View animation="bounceInDown" delay={500}>
            <MaterialCommunityIcons
              name="cup"
              size={28}
              color="#ffb7003d"
              style={{ position: 'absolute', left: 30, top: 18, zIndex: 1 }}
            />
          </Animatable.View>
          <Animatable.View animation="bounceInDown" delay={700}>
            <MaterialCommunityIcons
              name="food"
              size={28}
              color="#ff440041"
              style={{ position: 'absolute', right: 28, top: 38, zIndex: 1 }}
            />
          </Animatable.View>
          <Animatable.View animation="bounceInUp" delay={900}>
            <MaterialCommunityIcons
              name="leaf"
              size={34}
              color="#c7c7c7ff"
              style={{ position: 'absolute', left: 105, top: 340, zIndex: 0 }}
            />
          </Animatable.View>
          <Animatable.View animation="bounceIn" delay={1100}>
            <MaterialCommunityIcons
              name="star"
              size={31}
              color="#c7c7c773"
              style={{
                position: 'absolute',
                left: 120,
                top: 160,
                zIndex: 1,
                opacity: 0.4,
              }}
            />
          </Animatable.View>
          <Animatable.View animation="bounceInLeft" delay={1300}>
            <MaterialCommunityIcons
              name="cookie"
              size={24}
              color="#c7c7c773"
              style={{ position: 'absolute', left: 20, bottom: 30, zIndex: 1 }}
            />
          </Animatable.View>
          <Animatable.View animation="bounceInRight" delay={1500}>
            <MaterialCommunityIcons
              name="water"
              size={32}
              color="#c7c7c773"
              style={{ position: 'absolute', right: 20, bottom: 100, zIndex: 1 }}
            />
          </Animatable.View>

          {/* Centered circular image */}
          <Animatable.View
            animation="fadeInUp"
            delay={200}
            style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}
          >
            <View
              style={{
                width: 160,
                height: 170,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image source={Showcase} style={{ width: 160, height: 240 }} />
            </View>
          </Animatable.View>
          {/* Special dish text, right-aligned to the image */}
          <Animatable.View
            animation="fadeInUp"
            delay={400}
            style={{
              alignItems: 'flex-start',

              marginLeft: 30,
              paddingHorizontal: 30,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: '600',
                  color: '#222',
                  textAlign: 'left',
                }}
              >
                <Text>A </Text>
                <MaskedView
                  maskElement={
                    <Text
                      style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                    >
                      special dish
                    </Text>
                  }
                >
                  <LinearGradient
                    colors={['#ff7b00ff', '#ffc355ff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ height: 40 }}
                  >
                    <Text
                      style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        opacity: 0,
                      }}
                    >
                      special dish
                    </Text>
                  </LinearGradient>
                </MaskedView>
                <Text style={{ color: '#222' }}> prepared for you</Text>
              </Text>
              <Text
                style={{
                  color: '#8B857B',
                  fontSize: 15,
                  marginTop: 6,
                  textAlign: 'left',
                  maxWidth: 280,
                }}
              >
                Our food delivery app brings your favourite dishes to you.
              </Text>
            </View>
          </Animatable.View>
        </View>
      </Animatable.View>

      {/* Quick Menu - Circular Style */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 20,
          marginBottom: 24,
          marginTop: 10,
        }}
      >
        {quickMenu.map((item, idx) => (
          <TouchableOpacity
            key={item.type}
            style={{ alignItems: 'center', flex: 1 }}
            onPress={() => {
              navigation.navigate('ProductType', { type: item.type });
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: idx === 0 ? '#f5c242' : '#f5f3f1',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 8,
                borderWidth: idx === 0 ? 2 : 0,
                borderColor: idx === 0 ? '#f5c242' : 'transparent',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Image
                source={item.image}
                style={{ width: 75, height: 75, borderRadius: 50 }}
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                color: '#222',
                fontWeight: idx === 0 ? 'bold' : '500',
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Featured Section */}
      <Text style={styles.sectionTitle}>Popular Foods</Text>
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
                onPress={() => {
                  navigation.navigate('Product', { id: item.id });
                }}
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

      {/* Special Offers Section */}
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
    </ScrollView>
  );
};

export default HomeScreen;
