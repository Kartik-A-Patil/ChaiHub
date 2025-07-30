import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp, useRoute } from '@react-navigation/native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Types
export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string | null;
  sweetness?: string | null;
};

export type Order = {
  id: string;
  address: string;
  phone: string;
  status: string;
  createdAt?: { toDate: () => Date } | Date | string;
  items?: OrderItem[];
  total?: number;
};

// Status steps for the vertical bar
const STATUS_STEPS = [
  { key: 'pending', label: 'Pending', icon: 'clock-outline' },
  { key: 'confirmed', label: 'Confirmed', icon: 'check-circle-outline' },
  { key: 'preparing', label: 'Preparing', icon: 'pot-steam-outline' },
  { key: 'out_for_delivery', label: 'On the Way', icon: 'truck-delivery-outline' },
  { key: 'delivered', label: 'Delivered', icon: 'package-variant-closed-check' },
];

const getStatusIndex = (status: string) => {
  const index = STATUS_STEPS.findIndex(s => s.key === status);
  return index === -1 ? 0 : index;
};

const OrderDetailScreen = () => {
  const route = useRoute<RouteProp<any, any>>();
  const order: Order = route.params?.order;

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  if (!order) {
    return (
      <View style={styles.centered}>
        <Icon name="alert-circle-outline" size={60} color="#E0E0E0" />
        <Text style={styles.emptyText}>Order not found.</Text>
      </View>
    );
  }

  const statusIndex = getStatusIndex(order.status);

  const formatDate = (createdAt: any) => {
    if (!createdAt) return 'N/A';
    const date = typeof createdAt.toDate === 'function' ? createdAt.toDate() : new Date(createdAt);
    return date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Order Summary</Text>
        <Text style={styles.orderId}>#{order.id.substring(0, 6)}</Text>
      </View>

      {/* Status Tracker */}
      <View style={styles.statusSection}>
        <View style={styles.statusTracker}>
          {STATUS_STEPS.map((step, idx) => {
            const isActive = idx <= statusIndex;
            const isCurrent = idx === statusIndex;
            return (
              <React.Fragment key={step.key}>
                <View style={styles.statusStep}>
                  <View style={[styles.statusIconContainer, isActive && styles.statusIconContainerActive]}>
                    <Icon name={step.icon} size={22} color={isActive ? '#fff' : '#BDBDBD'} />
                  </View>
                  <Text style={[styles.statusLabel, isCurrent && styles.statusLabelCurrent]}>
                    {step.label}
                  </Text>
                </View>
                {idx < STATUS_STEPS.length - 1 && (
                  <View style={[styles.statusLine, isActive && styles.statusLineActive]} />
                )}
              </React.Fragment>
            );
          })}
        </View>
      </View>

      {/* Order Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Details</Text>
        <View style={styles.detailRow}>
          <Icon name="map-marker-outline" style={styles.detailIcon} />
          <Text style={styles.detailText}>{order.address}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="phone-outline" style={styles.detailIcon} />
          <Text style={styles.detailText}>{order.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="calendar-clock" style={styles.detailIcon} />
          <Text style={styles.detailText}>{formatDate(order.createdAt)}</Text>
        </View>
      </View>

      {/* Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items Ordered</Text>
        {order.items?.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemMeta}>
                    {item.quantity}x {item.size ? `(${item.size})` : ''} {item.sweetness ? `- ${item.sweetness}`: ''}
                </Text>
            </View>
            <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalAmount}>₹{order.total?.toFixed(2) ?? 'N/A'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  emptyText: {
    fontSize: 18,
    color: '#6c757d',
    marginTop: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#343a40',
  },
  orderId: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 4,
  },
  statusSection: {
    marginBottom: 24,
  },
  statusTracker: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  statusStep: {
    alignItems: 'center',
    flex: 1,
  },
  statusIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIconContainerActive: {
    backgroundColor: '#4CAF50',
  },
  statusLabel: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
    fontWeight: '500',
  },
  statusLabelCurrent: {
    color: '#343a40',
    fontWeight: 'bold',
  },
  statusLine: {
    flex: 1,
    height: 4,
    backgroundColor: '#E9ECEF',
    marginTop: 20, // Align with center of icons
  },
  statusLineActive: {
    backgroundColor: '#4CAF50',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    fontSize: 20,
    color: '#868e96',
    marginRight: 12,
  },
  detailText: {
    fontSize: 15,
    color: '#495057',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#343a40',
  },
  itemMeta: {
    fontSize: 13,
    color: '#868e96',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#343a40',
  },
  totalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default OrderDetailScreen;

