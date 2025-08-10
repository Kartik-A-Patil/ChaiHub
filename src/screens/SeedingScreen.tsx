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
  const seedRestaurants = async () => {
    try {
      const restaurantsCollection = firestore().collection('restaurants');
      const restaurantIdMapping: { [key: string]: string } = {};
      
      // First, seed restaurants and store their Firebase document IDs
      for (let i = 0; i < seedRestaurantsData.length; i++) {
        const restaurant = seedRestaurantsData[i];
        const docRef = await restaurantsCollection.add(restaurant);
        // Map old ID (r1, r2, etc.) to new Firebase document ID
        restaurantIdMapping[`r${i + 1}`] = docRef.id;
      }
      
      Alert.alert('Success', 'Restaurants seeded successfully!');
      return restaurantIdMapping;
    } catch (error) {
      console.error('Error seeding restaurants:', error);
      Alert.alert('Error', 'Error seeding restaurants.');
      throw error;
    }
  };

  const seedProducts = async (restaurantIdMapping?: { [key: string]: string }) => {
    try {
      const productsCollection = firestore().collection('products');
      
      // If no mapping provided, try to get existing restaurants
      if (!restaurantIdMapping) {
        const restaurantsSnapshot = await firestore().collection('restaurants').get();
        if (restaurantsSnapshot.empty) {
          Alert.alert('Error', 'Please seed restaurants first!');
          return;
        }
        
        // Create mapping from restaurant names to IDs (fallback approach)
        const tempMapping: { [key: string]: string } = {};
        restaurantsSnapshot.docs.forEach((doc, index) => {
          tempMapping[`r${index + 1}`] = doc.id;
        });
        restaurantIdMapping = tempMapping;
      }
      
      for (const product of seedProductsData) {
        // Replace the old restaurantId with the actual Firebase document ID
        const updatedProduct = {
          ...product,
          restaurantId: restaurantIdMapping[product.restaurantId] || product.restaurantId,
        };
        await productsCollection.add(updatedProduct);
      }
      Alert.alert('Success', 'Products seeded successfully!');
    } catch (error) {
      console.error('Error seeding products:', error);
      Alert.alert('Error', 'Error seeding products.');
    }
  };

  const seedRestaurantsAndProducts = async () => {
    try {
      const restaurantIdMapping = await seedRestaurants();
      if (restaurantIdMapping) {
        await seedProducts(restaurantIdMapping);
        Alert.alert('Success', 'Both restaurants and products seeded successfully!');
      }
    } catch (error) {
      console.error('Error seeding restaurants and products:', error);
      Alert.alert('Error', 'Error seeding data.');
    }
  };

  const clearAllData = async () => {
    try {
      // Clear products
      const productsSnapshot = await firestore().collection('products').get();
      const productDeletePromises = productsSnapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(productDeletePromises);

      // Clear restaurants
      const restaurantsSnapshot = await firestore().collection('restaurants').get();
      const restaurantDeletePromises = restaurantsSnapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(restaurantDeletePromises);

      Alert.alert('Success', 'All data cleared successfully!');
    } catch (error) {
      console.error('Error clearing data:', error);
      Alert.alert('Error', 'Error clearing data.');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>Data Seeding</Text>
          <Button mode="contained" onPress={seedRestaurantsAndProducts} style={styles.button}>
            Seed Restaurants & Products
          </Button>
          <Button mode="contained" onPress={() => seedProducts()} style={styles.button}>
            Seed Products Only
          </Button>
          <Button mode="contained" onPress={() => seedRestaurants()} style={styles.button}>
            Seed Restaurants Only
          </Button>
          <Button mode="outlined" onPress={clearAllData} style={styles.button}>
            Clear All Data
          </Button>
          <Button mode="outlined" onPress={async () => {
            try {
              const restaurantsSnapshot = await firestore().collection('restaurants').get();
              const productsSnapshot = await firestore().collection('products').get();
              
              let message = `Restaurants: ${restaurantsSnapshot.size}\nProducts: ${productsSnapshot.size}\n\nRestaurant IDs:\n`;
              restaurantsSnapshot.docs.forEach((doc, index) => {
                const data = doc.data();
                message += `${data.name}: ${doc.id}\n`;
              });
              
              Alert.alert('Database Status', message);
            } catch (error) {
              console.error('Error checking status:', error);
              Alert.alert('Error', 'Error checking database status.');
            }
          }} style={styles.button}>
            Check Database Status
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