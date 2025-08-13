import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HelpScreen = ({ navigation }: any) => {
  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@chaihub.com?subject=Support Request')
      .catch(() => {
        Alert.alert('Error', 'Could not open email app');
      });
  };

  const handleFAQ = () => {
    Alert.alert('FAQ', 'Frequently Asked Questions section will be available soon!');
  };

  const helpItems = [
    {
      title: 'Contact Support',
      subtitle: 'Get help from our team',
      icon: 'support-agent',
      onPress: handleEmailSupport,
    },
    {
      title: 'FAQ',
      subtitle: 'Common questions and answers',
      icon: 'help',
      onPress: handleFAQ,
    },
    {
      title: 'Order Issues',
      subtitle: 'Report problems with orders',
      icon: 'report-problem',
      onPress: () => Alert.alert('Order Issues', 'Please contact support for order-related issues.'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>How can we help you?</Text>
          <Text style={styles.headerSubtitle}>
            We're here to assist you with any questions or issues.
          </Text>
        </View>

        <View style={styles.section}>
          {helpItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.helpItem}
              onPress={item.onPress}
            >
              <View style={styles.helpIconContainer}>
                <Icon name={item.icon} size={24} color="#D4AF37" />
              </View>
              <View style={styles.helpContent}>
                <Text style={styles.helpTitle}>{item.title}</Text>
                <Text style={styles.helpSubtitle}>{item.subtitle}</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>App Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Version:</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Support Email:</Text>
            <Text style={styles.infoValue}>support@chaihub.com</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>+1 (234) 567-890</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  section: {
    padding: 16,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  helpIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  helpSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  infoSection: {
    margin: 16,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});

export default HelpScreen;
