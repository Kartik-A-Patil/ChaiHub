import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../styles/globalStyles';
import ProfileScreenStyles from '../styles/ProfileScreenStyles';
import { hapticActions } from '../utils/hapticUtils';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ProfileSkeleton from '../components/ProfileSkeleton';

const ProfileScreen = ({ navigation }: any) => {
  const [userProfile, setUserProfile] = useState({
    name: 'Guest User',
    displayName: '',
    email: '',
    rating: 4.5,
    ratingsCount: 0,
    joinedDate: '',
    orderCount: 0,
  });
  const [loading, setLoading] = useState(true);

  const user = auth().currentUser;

  const menuItems = [
    {
      label: 'Recent Orders',
      icon: 'clock',
      route: 'RecentOrders',
    },
    {
      label: 'Settings',
      icon: 'settings',
      route: 'Settings',
    },
    {
      label: 'Help & Support',
      icon: 'help-circle',
      route: 'Help',
    },
  ];

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      if (!user) {
        setLoading(false);
        return;
      }

      let displayName = 'Guest User';
      let email = '';
      let joinedDate = 'Recently';
      
      if (user.isAnonymous) {
        displayName = 'Guest User';
        email = 'Anonymous Account';
      } else {
        displayName = user.displayName || user.email?.split('@')[0] || 'User';
        email = user.email || '';
      }

      if (user.metadata.creationTime) {
        const createdAt = new Date(user.metadata.creationTime);
        const now = new Date();
        const diffInDays = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
        if (diffInDays === 0) {
          joinedDate = 'Today';
        } else if (diffInDays === 1) {
          joinedDate = '1d ago';
        } else if (diffInDays < 30) {
          joinedDate = `${diffInDays}d ago`;
        } else if (diffInDays < 365) {
          const months = Math.floor(diffInDays / 30);
          joinedDate = `${months}mo ago`;
        } else {
          const years = Math.floor(diffInDays / 365);
          joinedDate = `${years}y ago`;
        }
      }

      let orderCount = 0;
      try {
        const orderSnapshot = await firestore()
          .collection('orders')
          .where('userId', '==', user.uid)
          .get();
        orderCount = orderSnapshot.size;
      } catch (error) {
        console.log('Error fetching order count:', error);
      }

      setUserProfile({
        name: displayName,
        displayName,
        email,
        rating: orderCount > 0 ? 4.5 : 0,
        ratingsCount: orderCount,
        joinedDate,
        orderCount,
      });
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    if (user?.isAnonymous) {
      Alert.alert(
        'Account Required',
        'To edit your profile, you need to create an account. Currently you are signed in as a guest.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Sign Up', 
            style: 'default',
            onPress: () => {
              // You can implement account upgrade here
              Alert.alert('Feature Coming Soon', 'Account upgrade will be available soon!');
            }
          },
        ]
      );
      return;
    }
    
    hapticActions.navigate();
    navigation.navigate('ProfileEdit');
  };
  const renderMenuItem = ({ item }: any) => (
    <TouchableOpacity
      style={ProfileScreenStyles.menuItem}
      onPress={() => {
        hapticActions.navigate();
        navigation.navigate(item.route);
      }}
    >
      <Icon name={item.icon} size={24} style={ProfileScreenStyles.menuIcon} />
      <Text style={ProfileScreenStyles.menuText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <View
      style={[
        globalStyles.container,
        { backgroundColor: '#fff', paddingTop: 16 },
      ]}
    >
      <View style={ProfileScreenStyles.header}>
        <View style={ProfileScreenStyles.avatarWrapper}>
          <Image 
            source={require('../assets/Profile.png')} 
            style={ProfileScreenStyles.avatar} 
          />
          <TouchableOpacity 
            style={ProfileScreenStyles.editButton}
            onPress={handleEditProfile}
          >
            <MaterialIcons name="edit" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <Text style={ProfileScreenStyles.greeting}>{getGreeting()},</Text>
        <Text style={ProfileScreenStyles.name}>{userProfile.name}</Text>

        <View style={ProfileScreenStyles.statsContainer}>
          <View style={ProfileScreenStyles.statItem}>
            <Text style={ProfileScreenStyles.statNumber}>{userProfile.orderCount}</Text>
            <Text style={ProfileScreenStyles.statLabel}>Orders</Text>
          </View>
          {userProfile.rating > 0 && (
            <View style={ProfileScreenStyles.statItem}>
              <Text style={ProfileScreenStyles.statNumber}>{userProfile.rating.toFixed(1)}</Text>
              <Text style={ProfileScreenStyles.statLabel}>Rating</Text>
            </View>
          )}
          <View style={ProfileScreenStyles.statItem}>
            <Text style={ProfileScreenStyles.statNumber}>{userProfile.joinedDate}</Text>
            <Text style={ProfileScreenStyles.statLabel}>Member since</Text>
          </View>
        </View>
      </View>

      <Text style={ProfileScreenStyles.sectionTitle}>Account</Text>
      <FlatList
        data={menuItems}
        keyExtractor={item => item.label}
        renderItem={renderMenuItem}
        contentContainerStyle={ProfileScreenStyles.menuList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProfileScreen;
