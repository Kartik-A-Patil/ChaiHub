import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { hapticActions } from '../utils/hapticUtils';

const ProfileEditScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    email: '',
    phone: '',
    address: '',
  });

  const user = auth().currentUser;

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    setLoading(true);
    try {
      if (!user) {
        navigation.goBack();
        return;
      }

      // Load current user info
      const currentInfo = {
        displayName: user.displayName || '',
        email: user.email || '',
        phone: '',
        address: '',
      };

      // Try to load additional info from Firestore
      try {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          currentInfo.phone = userData?.phone || '';
          currentInfo.address = userData?.address || '';
        }
      } catch (error) {
        console.log('Error loading user document:', error);
      }

      setUserInfo(currentInfo);
    } catch (error) {
      console.error('Error loading user info:', error);
      Alert.alert('Error', 'Failed to load user information');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!userInfo.displayName.trim()) {
      Alert.alert('Error', 'Display name is required');
      return;
    }

    setSaving(true);
    hapticActions.medium();

    try {
      if (!user) {
        Alert.alert('Error', 'User not found');
        return;
      }

      // Update Firebase Auth profile
      if (userInfo.displayName !== user.displayName) {
        await user.updateProfile({
          displayName: userInfo.displayName,
        });
      }

      // Update or create user document in Firestore
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set(
          {
            displayName: userInfo.displayName,
            email: userInfo.email,
            phone: userInfo.phone,
            address: userInfo.address,
            updatedAt: firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

      hapticActions.orderSuccess();
      Alert.alert(
        'Success',
        'Profile updated successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Error saving profile:', error);
      hapticActions.orderFailure();
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D4AF37" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image 
              source={require('../assets/Profile.png')} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.changePhotoButton}>
              <Icon name="camera-alt" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.changePhotoText}>Tap to change photo</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Display Name *</Text>
            <TextInput
              style={styles.input}
              value={userInfo.displayName}
              onChangeText={(text) => setUserInfo({ ...userInfo, displayName: text })}
              placeholder="Enter your display name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#f5f5f5', color: '#666' }]}
              value={userInfo.email}
              editable={false}
              placeholder="Email address"
              placeholderTextColor="#999"
            />
            <Text style={styles.helpText}>Email cannot be changed</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={userInfo.phone}
              onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
              placeholder="Enter your phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={userInfo.address}
              onChangeText={(text) => setUserInfo({ ...userInfo, address: text })}
              placeholder="Enter your address"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {user?.isAnonymous && (
            <View style={styles.warningBox}>
              <Icon name="info" size={20} color="#ff9500" />
              <Text style={styles.warningText}>
                You're using a guest account. Some features may be limited.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]} 
          onPress={handleCancel}
          disabled={saving}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.saveButton]} 
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#f9f9f9',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#222',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  changePhotoText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  formSection: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    paddingTop: 12,
  },
  helpText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff9e6',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9500',
    marginTop: 16,
  },
  warningText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#cc7a00',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#D4AF37',
    marginLeft: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ProfileEditScreen;
