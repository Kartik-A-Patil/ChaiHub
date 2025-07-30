
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string | null;
  sweetness?: string | null;
};

type Order = {
  id: string;
  address: string;
  phone: string;
  status: string;
  createdAt?: { toDate: () => Date };
  items?: OrderItem[];
  total?: number;
};

const RecentOrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const unsubscribe = firestore()
      .collection('orders')
      .where('userId', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .limit(20)
      .onSnapshot(
        snapshot => {
          if (snapshot) {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Order[];
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setOrders(data);
          }
          setLoading(false);
        },
        error => {
          console.error('Firestore error:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'delivered':
        return {
          icon: 'check-circle',
          color: '#4CAF50',
          text: 'Delivered',
        };
      case 'pending':
        return {
          icon: 'clock-time-nine',
          color: '#FFC107',
          text: 'Pending',
        };
      case 'confirmed':
        return {
            icon: 'check-circle-outline',
            color: '#2196F3',
            text: 'Confirmed',
        };
      case 'preparing':
        return {
            icon: 'pot-steam',
            color: '#FF9800',
            text: 'Preparing',
        };
      case 'out_for_delivery':
        return {
            icon: 'truck-delivery',
            color: '#607D8B',
            text: 'Out for Delivery',
        };
      default:
        return {
          icon: 'alert-circle-outline',
          color: '#F44336',
          text: status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        };
    }
  };

  const renderOrderItem = ({ item }: { item: Order }) => {
    const statusStyle = getStatusStyle(item.status);
    return (
      <TouchableOpacity
        style={styles.orderItem}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('OrderDetailScreen', { order: item })}
      >
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>Order #{item.id.substring(0, 6)}</Text>
          <Text style={styles.orderDate}>
            {item.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}
          </Text>
        </View>
        <View style={styles.orderBody}>
            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.orderTotal}>₹{item.total?.toFixed(2) ?? '0.00'}</Text>
            </View>
            <View style={[styles.statusContainer, { backgroundColor: statusStyle.color }]}>
                <Icon name={statusStyle.icon} size={16} color="#fff" />
                <Text style={styles.statusText}>{statusStyle.text}</Text>
            </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#C99E71" />
      </View>
    );
  }

  if (!orders.length) {
    return (
      <View style={styles.centered}>
        <Icon name="receipt" size={60} color="#E0E0E0" />
        <Text style={styles.emptyText}>No orders yet.</Text>
        <Text style={styles.emptySubText}>Your recent orders will appear here.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#777',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  orderItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  orderDate: {
    fontSize: 13,
    color: '#888',
  },
  orderBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalContainer: {
    alignItems: 'flex-start',
  },
  totalLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default RecentOrdersScreen;
