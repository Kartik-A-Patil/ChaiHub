import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { products as seedProductsData, restaurants as seedRestaurantsData } from '../data/seedData';
import {
  cartItems,
  featuredItems,
  specialOffers,
  quickMenu,
  profileData,
} from '../data/data';

const SeedingScreen = () => {

  // Helper to get random restaurantId from available restaurants
  const getRandomRestaurantId = () => {
    // Assume restaurant IDs are r1, r2, ... based on seedData
    const ids = seedRestaurantsData.map((_, idx) => `r${idx + 1}`);
    return ids[Math.floor(Math.random() * ids.length)];
  };


  const seedProducts = async () => {
    try {
      const productsCollection = firestore().collection('products');
      for (const product of seedProductsData) {
        // Use product as is from seedData (image and restaurantId already set)
        await productsCollection.add(product);
      }
      Alert.alert('Success', 'Products seeded successfully!');
    } catch (error) {
      console.error('Error seeding products:', error);
      Alert.alert('Error', 'Error seeding products.');
    }
  };


  const seedRestaurants = async () => {
    try {
      const restaurantsCollection = firestore().collection('restaurants');
      for (const restaurant of seedRestaurantsData) {
        // Use restaurant as is from seedData (image already set)
        await restaurantsCollection.add(restaurant);
      }
      Alert.alert('Success', 'Restaurants seeded successfully!');
    } catch (error) {
      console.error('Error seeding restaurants:', error);
      Alert.alert('Error seeding restaurants.');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>Data Seeding</Text>
          <Button mode="contained" onPress={seedProducts} style={styles.button}>
            Seed Products
          </Button>
          <Button mode="contained" onPress={seedRestaurants} style={styles.button}>
            Seed Restaurants
          </Button>
          <Button mode="contained" onPress={async () => {
            try {
              const cartRef = firestore().collection('cartItems');
              for (const item of cartItems) {
                await cartRef.add(item);
              }
              Alert.alert('Success', 'Cart items seeded successfully!');
            } catch (error) {
              console.error('Error seeding cart items:', error);
              Alert.alert('Error', 'Error seeding cart items.');
            }
          }} style={styles.button}>
            Seed Cart Items
          </Button>
          <Button mode="contained" onPress={async () => {
            try {
              const featuredRef = firestore().collection('featuredItems');
              for (const item of featuredItems) {
                await featuredRef.add(item);
              }
              Alert.alert('Success', 'Featured items seeded successfully!');
            } catch (error) {
              console.error('Error seeding featured items:', error);
              Alert.alert('Error', 'Error seeding featured items.');
            }
          }} style={styles.button}>
            Seed Featured Items
          </Button>
          <Button mode="contained" onPress={async () => {
            try {
              const offersRef = firestore().collection('specialOffers');
              for (const offer of specialOffers) {
                await offersRef.add(offer);
              }
              Alert.alert('Success', 'Special offers seeded successfully!');
            } catch (error) {
              console.error('Error seeding special offers:', error);
              Alert.alert('Error', 'Error seeding special offers.');
            }
          }} style={styles.button}>
            Seed Special Offers
          </Button>
          <Button mode="contained" onPress={async () => {
            try {
              const quickMenuRef = firestore().collection('quickMenu');
              for (const item of quickMenu) {
                await quickMenuRef.add(item);
              }
              Alert.alert('Success', 'Quick menu seeded successfully!');
            } catch (error) {
              console.error('Error seeding quick menu:', error);
              Alert.alert('Error', 'Error seeding quick menu.');
            }
          }} style={styles.button}>
            Seed Quick Menu
          </Button>
          <Button mode="contained" onPress={async () => {
            try {
              const profileRef = firestore().collection('profileData');
              await profileRef.add(profileData);
              Alert.alert('Success', 'Profile data seeded successfully!');
            } catch (error) {
              console.error('Error seeding profile data:', error);
              Alert.alert('Error', 'Error seeding profile data.');
            }
          }} style={styles.button}>
            Seed Profile Data
          </Button>
         
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    width: '90%',
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
  },
});

export default SeedingScreen;