import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  UIManager,
  TouchableOpacity,
  Alert,
  Linking,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
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
  deliveryPerson?: {
    name: string;
    phone: string;
    rating: number;
    vehicleNumber: string;
  };
  estimatedDeliveryTime?: Date | string;
  actualDeliveryTime?: Date | string;
  cancelable?: boolean;
};

const STATUS_STEPS = [
  { key: 'pending', label: 'Order Placed', icon: 'clock-outline', time: 0, description: 'Your order has been received and is being processed' },
  { key: 'confirmed', label: 'Confirmed', icon: 'check-circle-outline', time: 2, description: 'Order confirmed! The restaurant is preparing your items' },
  { key: 'preparing', label: 'Preparing', icon: 'pot-steam-outline', time: 5, description: 'Your delicious items are being freshly prepared' },
  {
    key: 'out_for_delivery',
    label: 'On the Way',
    icon: 'truck-delivery-outline',
    time: 8,
    description: 'Your order is on its way to you!'
  },
  {
    key: 'delivered',
    label: 'Delivered',
    icon: 'package-variant-closed-check',
    time: 15,
    description: 'Order delivered successfully! Enjoy your meal!'
  },
];

const getStatusIndex = (status: string) => {
  const index = STATUS_STEPS.findIndex(s => s.key === status);
  return index === -1 ? 0 : index;
};

const getEstimatedTime = (currentStatus: string, createdAt: any) => {
  const currentIndex = getStatusIndex(currentStatus);
  const totalTime = 15; // Total delivery time in minutes (reduced for faster demo)
  
  // Calculate time elapsed since order creation
  const orderDate = typeof createdAt?.toDate === 'function' ? createdAt.toDate() : new Date(createdAt);
  const now = new Date();
  const elapsedMinutes = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60));
  
  // Calculate remaining time based on current status
  let remainingTime = 0;
  switch (currentStatus) {
    case 'pending':
      remainingTime = Math.max(0, 15 - elapsedMinutes);
      break;
    case 'confirmed':
      remainingTime = Math.max(0, 13 - elapsedMinutes);
      break;
    case 'preparing':
      remainingTime = Math.max(0, 10 - elapsedMinutes);
      break;
    case 'out_for_delivery':
      remainingTime = Math.max(0, 7 - elapsedMinutes);
      break;
    case 'delivered':
      remainingTime = 0;
      break;
    default:
      remainingTime = Math.max(0, totalTime - elapsedMinutes);
  }
  
  return remainingTime;
};



const OrderDetailScreen = () => {
  const route = useRoute<RouteProp<any, any>>();
  const order: Order = route.params?.order;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [simulatedStatus, setSimulatedStatus] = useState<string | null>(null);
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const progressAnim = React.useRef(new Animated.Value(0)).current;
  const statusAnimValues = React.useRef(
    STATUS_STEPS.map(() => new Animated.Value(0))
  ).current;

  // Simulate status progression based on elapsed time
  const getSimulatedStatus = (createdAt: any, originalStatus: string) => {
    if (!createdAt) return originalStatus;
    
    const orderDate = typeof createdAt?.toDate === 'function' ? createdAt.toDate() : new Date(createdAt);
    const now = new Date();
    const elapsedMinutes = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60));
    
    // Status progression timeline (in minutes)
    if (elapsedMinutes >= 15) return 'delivered';
    if (elapsedMinutes >= 8) return 'out_for_delivery';
    if (elapsedMinutes >= 5) return 'preparing';
    if (elapsedMinutes >= 2) return 'confirmed';
    return 'pending';
  };

  // Add realistic delivery person data if order is out for delivery
  const enhancedOrder = React.useMemo(() => {
    if (!order) return order;
    
    const currentStatus = simulatedStatus || getSimulatedStatus(order.createdAt, order.status);
    const baseOrder = { ...order, status: currentStatus };
    
    if (currentStatus === 'out_for_delivery' && !baseOrder.deliveryPerson) {
      const deliveryPersons = [
        { name: 'Raj Kumar', phone: '+91 98765 xxxxx', rating: 4.8, vehicleNumber: 'MH 12 AB 1234' },
        { name: 'Priya Sharma', phone: '+91 87654 xxxxx', rating: 4.9, vehicleNumber: 'MH 14 CD 5678' },
        { name: 'Arjun Singh', phone: '+91 76543 xxxxx', rating: 4.7, vehicleNumber: 'MH 15 EF 9012' },
        { name: 'Anita Patel', phone: '+91 65432 xxxxx', rating: 4.8, vehicleNumber: 'MH 16 GH 3456' },
      ];
      const randomPerson = deliveryPersons[Math.floor(Math.random() * deliveryPersons.length)];
      return { ...baseOrder, deliveryPerson: randomPerson };
    }
    
    return baseOrder;
  }, [order, simulatedStatus, currentTime]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    // Pulse animation for live dot
    const pulseAnimation = () => {
      Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.3,
              duration: 1000,
              useNativeDriver: true, // scale/opacity: true is fine
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true, // scale/opacity: true is fine
            }),
      ]).start(() => pulseAnimation());
    };
    
    if (enhancedOrder?.status !== order?.status) {
      pulseAnimation();
    }

    // Animate progress bar and status dots
    if (enhancedOrder) {
      const statusIndex = getStatusIndex(enhancedOrder.status);
      const progressValue = (statusIndex + 1) / STATUS_STEPS.length;
      
      // Animate progress bar
          Animated.timing(progressAnim, {
            toValue: progressValue,
            duration: 800,
            useNativeDriver: false, // width animation: must be false
          }).start();

      // Animate status dots sequentially
      statusAnimValues.forEach((anim, index) => {
        const delay = index * 100;
            Animated.timing(anim, {
              toValue: index <= statusIndex ? 1 : 0,
              duration: 400,
              delay,
              useNativeDriver: false, // width/scale/opacity: set to false for width
            }).start();
      });
    }
    
    // Update time every 30 seconds for more responsive status changes
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Update simulated status
      if (order) {
        const newStatus = getSimulatedStatus(order.createdAt, order.status);
        if (newStatus !== simulatedStatus) {
          setSimulatedStatus(newStatus);
        }
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(timer);
  }, [order, simulatedStatus, enhancedOrder?.status, pulseAnim, progressAnim, statusAnimValues]);

  const handleCallDeliveryPerson = () => {
    if (enhancedOrder.deliveryPerson?.phone) {
      Alert.alert(
        'Call Delivery Person',
        `Call ${enhancedOrder.deliveryPerson.name}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Call', 
            onPress: () => Linking.openURL(`tel:${enhancedOrder.deliveryPerson?.phone}`)
          }
        ]
      );
    }
  };

  // For demo purposes - manually progress status
  const handleProgressStatus = () => {
    if (!enhancedOrder) return;
    
    const currentIndex = getStatusIndex(enhancedOrder.status);
    const nextIndex = Math.min(currentIndex + 1, STATUS_STEPS.length - 1);
    const nextStatus = STATUS_STEPS[nextIndex]?.key;
    
    if (nextStatus && nextStatus !== enhancedOrder.status) {
      setSimulatedStatus(nextStatus);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  if (!enhancedOrder) {
    return (
      <View style={styles.centered}>
        <Icon name="alert-circle-outline" size={60} color="#E0E0E0" />
        <Text style={styles.emptyText}>Order not found.</Text>
      </View>
    );
  }

  const statusIndex = getStatusIndex(enhancedOrder.status);
  const estimatedTime = getEstimatedTime(enhancedOrder.status, enhancedOrder.createdAt);

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
        <Text style={styles.orderId}>Order #{enhancedOrder.id.substring(0, 8)}</Text>
        <Text style={styles.orderTime}>{formatDate(enhancedOrder.createdAt)}</Text>
        
        
        {/* Demo Status Progress Button - Remove in production */}
        {enhancedOrder.status !== 'delivered' && (
          <TouchableOpacity 
            style={styles.demoButton} 
            onPress={handleProgressStatus}
          >
            <Icon name="fast-forward" size={16} color="#666" />
            <Text style={styles.demoButtonText}>Demo: Next Status</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.statusCard}>
        {/* Minimal Status Header */}
        <View style={styles.statusHeaderMinimal}>
          <View style={styles.statusInfo}>
            <Text style={styles.currentStatusMinimal}>
              {STATUS_STEPS[statusIndex]?.label || 'Unknown'}
            </Text>
            <Text style={styles.statusDescriptionMinimal}>
              {STATUS_STEPS[statusIndex]?.description || 'Status update'}
            </Text>
          </View>
          {enhancedOrder.status !== 'delivered' && estimatedTime > 0 && (
            <View style={styles.timeContainerMinimal}>
              <Text style={styles.estimatedTimeMinimal}>
                {estimatedTime}
              </Text>
              <Text style={styles.timeUnitMinimal}>min</Text>
            </View>
          )}
        </View>

        {/* Food Delivery Progress Timeline */}
        <View style={styles.deliveryTimeline}>
          {STATUS_STEPS.map((step, idx) => {
            const isActive = idx <= statusIndex;
            const isCurrent = idx === statusIndex;
            const isPast = idx < statusIndex;
            const isLast = idx === STATUS_STEPS.length - 1;
            
            return (
              <View key={step.key} style={styles.timelineItem}>
                {/* Timeline Line */}
                {!isLast && (
                  <View style={styles.timelineLine}>
                    <Animated.View 
                      style={[
                        styles.timelineLineFill,
                        {
                          height: statusAnimValues[idx + 1] ? 
                            statusAnimValues[idx + 1].interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0%', '100%'],
                            }) : '0%'
                        }
                      ]}
                    />
                  </View>
                )}
                
                {/* Timeline Dot */}
                <Animated.View
                  style={[
                    styles.timelineDot,
                    isActive && styles.timelineDotActive,
                    isCurrent && styles.timelineDotCurrent,
                    {
                      transform: [
                        {
                          scale: statusAnimValues[idx].interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, isCurrent ? 1.1 : 1],
                          })
                        }
                      ],
                    }
                  ]}
                >
                  {isActive && (
                    <Animated.View
                      style={{
                        opacity: statusAnimValues[idx],
                      }}
                    >
                      <Icon 
                        name={isPast ? 'check' : step.icon} 
                        size={isCurrent ? 16 : 14} 
                        color={isCurrent ? '#FFFFFF' : isPast ? '#FFFFFF' : '#4CAF50'} 
                      />
                    </Animated.View>
                  )}
                  
                  {/* Pulse effect for current status */}
                  {isCurrent && (
                    <Animated.View
                      style={[
                        styles.timelinePulse,
                        {
                          transform: [{ scale: pulseAnim }],
                          opacity: pulseAnim.interpolate({
                            inputRange: [1, 1.3],
                            outputRange: [0.3, 0],
                          }),
                        }
                      ]}
                    />
                  )}
                </Animated.View>
                
                {/* Timeline Content */}
                <View style={styles.timelineContent}>
                  <Text style={[
                    styles.timelineLabel,
                    isActive && styles.timelineLabelActive,
                    isCurrent && styles.timelineLabelCurrent
                  ]}>
                    {step.label}
                  </Text>
                  {isCurrent && (
                    <Text style={styles.timelineTime}>
                      {step.time} min ago
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Icon name="map-marker" size={18} color="#666" />
          <Text style={styles.infoText}>{enhancedOrder.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="phone" size={18} color="#666" />
          <Text style={styles.infoText}>{enhancedOrder.phone}</Text>
        </View>
      </View>

      {/* Delivery Person Info */}
      {enhancedOrder.deliveryPerson && enhancedOrder.status === 'out_for_delivery' && (
        <View style={styles.deliveryPersonCard}>
          <Text style={styles.cardTitle}>Delivery Person</Text>
          <View style={styles.deliveryPersonInfo}>
            <Icon name="account-circle" size={40} color="#4CAF50" />
            <View style={styles.deliveryPersonDetails}>
              <Text style={styles.deliveryPersonName}>{enhancedOrder.deliveryPerson.name}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{enhancedOrder.deliveryPerson.rating}</Text>
              </View>
              <Text style={styles.vehicleNumber}>Vehicle: {enhancedOrder.deliveryPerson.vehicleNumber}</Text>
            </View>
            <TouchableOpacity 
              style={styles.callButton}
              onPress={handleCallDeliveryPerson}
            >
              <Icon name="phone" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}

    
      <View style={styles.itemsCard}>
        <Text style={styles.cardTitle}>Items ({enhancedOrder.items?.length || 0})</Text>
        {enhancedOrder.items?.map((item, index) => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>
                Qty: {item.quantity}
                {item.size && ` • ${item.size}`}
                {item.sweetness && ` • ${item.sweetness}`}
              </Text>
            </View>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        ))}
        
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${enhancedOrder.total?.toFixed(2) || '0.00'}</Text>
        </View>
      </View>

    </ScrollView>
  );
};

export default OrderDetailScreen;
