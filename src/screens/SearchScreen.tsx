import React, { useState, useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Platform,
} from 'react-native';
import { useFirestore } from '../contexts/FirestoreContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import type { StackNavigationProp } from '@react-navigation/stack';
import { searchScreenStyles as styles } from '../styles/SearchScreenStyles';
import imageMap from '../utils/imageMap';

type RootStackParamList = {
  Product: { id: string };
};

const SearchScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { products, loading } = useFirestore();
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredItems([]);
      return;
    }

    const filtered = products
      .filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(query.toLowerCase());
        const bStarts = b.name.toLowerCase().startsWith(query.toLowerCase());
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.name.localeCompare(b.name);
      })
      .slice(0, 10);

    setFilteredItems(filtered);
  }, [query, products]);

  const SearchResultItem = ({ item, index }: { item: any; index: number }) => {
    const itemFadeAnim = useRef(new Animated.Value(0)).current;
    const itemSlideAnim = useRef(new Animated.Value(30)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(itemFadeAnim, {
          toValue: 1,
          duration: 400,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(itemSlideAnim, {
          toValue: 0,
          duration: 400,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View
        style={[
          {
            opacity: itemFadeAnim,
            transform: [
              { translateY: itemSlideAnim },
              { scale: scaleAnim }
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.itemContainer, { backgroundColor: theme.card, borderBottomColor: theme.border }]}
          onPress={() => navigation.navigate('Product', { id: item.id })}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <View style={styles.itemImageWrapper}>
            <Image
              source={
                typeof item.image === 'string' && imageMap[item.image]
                  ? imageMap[item.image]
                  : typeof item.image === 'string'
                  ? { uri: item.image }
                  : item.image
              }
              style={styles.itemImage}
            />
          </View>
          <View style={styles.itemInfoContainer}>
            <Text style={[styles.itemName, { color: theme.text }]} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={[styles.itemDescription, { color: theme.textSecondary }]} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.priceRow}>
              <Text style={[styles.itemPrice, { color: theme.primary }]}>₹{item.price}</Text>
              <Icon name="arrow-forward-ios" size={16} color={theme.textSecondary} />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  useEffect(() => {
    if (!query.trim()) {
      setFilteredItems([]);
      return;
    }

    const filtered = products
      .filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(query.toLowerCase());
        const bStarts = b.name.toLowerCase().startsWith(query.toLowerCase());
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.name.localeCompare(b.name);
      })
      .slice(0, 10);

    setFilteredItems(filtered);
  }, [query, products]);

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          backgroundColor: theme.background,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <View style={[styles.searchBox, { 
        backgroundColor: theme.card, 
        borderColor: theme.border,
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          android: {
            elevation: 4,
          },
        }),
      }]}>
        <Icon name="search" size={22} color={theme.textSecondary} style={{ marginRight: 12 }} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search for tea, coffee, or snacks..."
          placeholderTextColor={theme.textSecondary}
          value={query}
          onChangeText={setQuery}
          autoFocus
          selectionColor={theme.primary}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} style={styles.clearButton}>
            <Icon name="close" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      
      {loading && query.trim() && (
        <Animated.View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
            Searching...
          </Text>
        </Animated.View>
      )}
      
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <SearchResultItem item={item} index={index} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          query.trim() && !loading ? (
            <Animated.View style={styles.emptyContainer}>
              <Icon name="search-off" size={64} color={theme.textSecondary} style={styles.emptyIcon} />
              <Text style={[styles.emptyTitle, { color: theme.text }]}>
                No Results Found
              </Text>
              <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
                We couldn't find any products matching "{query}".{'\n'}
                Try different keywords or check spelling.
              </Text>
            </Animated.View>
          ) : !query.trim() ? (
            <Animated.View style={styles.emptyContainer}>
              <Icon name="coffee" size={64} color={theme.primary} style={styles.emptyIcon} />
              <Text style={[styles.emptyTitle, { color: theme.text }]}>
                Find Your Perfect Brew
              </Text>
              <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
                Start typing to discover amazing teas, coffees, and snacks
              </Text>
            </Animated.View>
          ) : null
        }
      />
    </Animated.View>
  );
};

export default SearchScreen;

