import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { products } from '../data/restaurants';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { homeScreenStyles as styles } from '../styles/HomeScreenStyles';

type RootStackParamList = {
  Product: { id: string };
};

const SearchScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');

  const filteredItems = products.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for tea, coffee, or snacks"
          placeholderTextColor="#8B857B"
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
      </View>
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.featuredItemContainer}
            onPress={() => navigation.navigate('Product', { id: item.id })}
          >
            <View style={styles.featuredItem}>
              <Image
                source={
                  typeof item.image === 'string'
                    ? { uri: item.image }
                    : item.image
                }
                style={styles.featuredImage}
              />
            </View>
            <Text style={styles.featuredName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No products found.
          </Text>
        }
      />
    </View>
  );
};

export default SearchScreen;
