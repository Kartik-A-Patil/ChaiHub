import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { products, restaurants, offerBanners } from '../data/seedData';

const SeedingScreen = () => {
  const seedProducts = async () => {
    try {
      const productsCollection = firestore().collection('products');
      for (const product of products) {
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
      for (const restaurant of restaurants) {
        await restaurantsCollection.add(restaurant);
      }
      Alert.alert('Success', 'Restaurants seeded successfully!');
    } catch (error) {
      console.error('Error seeding restaurants:', error);
      Alert.alert('Error', 'Error seeding restaurants.');
    }
  };

  const seedOfferBanners = async () => {
    try {
      const offerBannersCollection = firestore().collection('offerBanners');
      for (const banner of offerBanners) {
        await offerBannersCollection.add(banner);
      }
      Alert.alert('Success', 'Offer banners seeded successfully!');
    } catch (error) {
      console.error('Error seeding offer banners:', error);
      Alert.alert('Error', 'Error seeding offer banners.');
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
          <Button mode="contained" onPress={seedOfferBanners} style={styles.button}>
            Seed Offer Banners
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