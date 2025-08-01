import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
import { searchScreenStyles as styles } from '../styles/SearchScreenStyles';
import imageMap from '../utils/imageMap';

type RootStackParamList = {
  Product: { id: string };
};

const SearchScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');

  const filteredItems = products
    .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      // Prioritize items that start with the query, then by includes
      const aStarts = a.name.toLowerCase().startsWith(query.toLowerCase());
      const bStarts = b.name.toLowerCase().startsWith(query.toLowerCase());
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.name.localeCompare(b.name);
    })
    .slice(0, 10);

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Icon name="search" size={22} color="#888888" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for tea, coffee, or snacks"
          placeholderTextColor="#888888"
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
            style={styles.itemContainer}
            onPress={() => navigation.navigate('Product', { id: item.id })}
          >
            <Image
              source={
                typeof item.image === 'string' && imageMap[item.image]
                  ? imageMap[item.image]
                  : item.image
              }
              style={styles.itemImage}
            />
            <View style={styles.itemInfoContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100,paddingTop: 10 }}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            No products found.
          </Text>
        }
      />
    </View>
  );
};

export default SearchScreen;

