import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { OrderDetailsStyles as styles } from '../styles/OrderDetailStyle';

UIManager.setLayoutAnimationEnabledExperimental;

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

const STATUS_STEPS = [
  { key: 'pending', label: 'Order Placed', icon: 'clock-outline', time: 0 },
  { key: 'confirmed', label: 'Confirmed', icon: 'check-circle-outline', time: 2 },
  { key: 'preparing', label: 'Preparing', icon: 'pot-steam-outline', time: 5 },
  {
    key: 'out_for_delivery',
    label: 'On the Way',
    icon: 'truck-delivery-outline',
    time: 8,
  },
  {
    key: 'delivered',
    label: 'Delivered',
    icon: 'package-variant-closed-check',
    time: 10,
  },
];

const getStatusIndex = (status: string) => {
  const index = STATUS_STEPS.findIndex(s => s.key === status);
  return index === -1 ? 0 : index;
};

const getEstimatedTime = (currentStatus: string) => {
  const currentIndex = getStatusIndex(currentStatus);
  const totalTime = 10; // Total delivery time in minutes
  const currentTime = STATUS_STEPS[currentIndex]?.time || 0;
  return totalTime - currentTime;
};

const OrderDetailScreen = () => {
  const route = useRoute<RouteProp<any, any>>();
  const order: Order = route.params?.order;
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
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
  const estimatedTime = getEstimatedTime(order.status);

  const formatDate = (createdAt: any) => {
    if (!createdAt) return 'N/A';
    const date =
      typeof createdAt.toDate === 'function'
        ? createdAt.toDate()
        : new Date(createdAt);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.orderId}>Order #{order.id.substring(0, 8)}</Text>
        <Text style={styles.orderTime}>{formatDate(order.createdAt)}</Text>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Text style={styles.currentStatus}>
            {STATUS_STEPS[statusIndex]?.label || 'Unknown'}
          </Text>
          {order.status !== 'delivered' && (
            <View style={styles.timeContainer}>
              <Icon name="clock-outline" size={16} color="#666" />
              <Text style={styles.estimatedTime}>
                {estimatedTime} min remaining
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((statusIndex + 1) / STATUS_STEPS.length) * 100}%` }
            ]} 
          />
        </View>
        
        <View style={styles.statusSteps}>
          {STATUS_STEPS.map((step, idx) => {
            const isActive = idx <= statusIndex;
            return (
              <View key={step.key} style={styles.statusDot}>
                <View
                  style={[
                    styles.dot,
                    isActive && styles.dotActive,
                  ]}
                />
                <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>
                  {step.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Icon name="map-marker" size={18} color="#666" />
          <Text style={styles.infoText}>{order.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="phone" size={18} color="#666" />
          <Text style={styles.infoText}>{order.phone}</Text>
        </View>
      </View>

      <View style={styles.itemsCard}>
        <Text style={styles.cardTitle}>Items ({order.items?.length || 0})</Text>
        {order.items?.map((item, index) => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>
                Qty: {item.quantity}
                {item.size && ` • ${item.size}`}
                {item.sweetness && ` • ${item.sweetness}`}
              </Text>
            </View>
            <Text style={styles.itemPrice}>₹{item.price}</Text>
          </View>
        ))}
        
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>₹{order.total?.toFixed(0) || '0'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetailScreen;
