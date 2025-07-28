
import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { globalStyles } from '../styles/globalStyles';
import ProfileScreenStyles from '../styles/ProfileScreenStyles';
import { profileData } from '../data/data';

const ProfileScreen = ({ navigation }: any) => {
  const { name, avatar, rating, ratingsCount, joined, menu } = profileData;

  const renderMenuItem = ({ item }: any) => (
    <TouchableOpacity style={ProfileScreenStyles.menuItem}>
      <Icon name={item.icon} size={24} style={ProfileScreenStyles.menuIcon} />
      <Text style={ProfileScreenStyles.menuText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[globalStyles.container, { backgroundColor: '#fff', paddingTop: 16 }]}>  
      {/* Header */}
      <Text style={ProfileScreenStyles.headerTitle}>Account</Text>
      <View style={ProfileScreenStyles.header}>
        <View style={ProfileScreenStyles.avatarWrapper}>
          <Image
            source={{ uri: avatar }}
            style={ProfileScreenStyles.avatar}
          />
        </View>
        <Text style={ProfileScreenStyles.name}>{name}</Text>
        <Text style={ProfileScreenStyles.subtitle}>
          {rating} • {ratingsCount}+
          {' ratings'}
        </Text>
        <Text style={ProfileScreenStyles.joined}>Joined {joined}</Text>
      </View>

      {/* Account Section */}
      <Text style={ProfileScreenStyles.sectionTitle}>Account</Text>
      <FlatList
        data={menu}
        keyExtractor={item => item.id}
        renderItem={renderMenuItem}
        contentContainerStyle={ProfileScreenStyles.menuList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProfileScreen;
