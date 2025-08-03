import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TABS = [
  { key: 'tea', label: 'Chai' },
  { key: 'coffee', label: 'Coffee' },
  { key: 'snacks', label: 'Snacks' },
];

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StickyFilterBar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    paddingTop: 4,
    paddingBottom: 8,
    zIndex: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
  },
  tab: {
    marginRight: 18,
    paddingBottom: 4,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#222',
  },
  tabText: {
    color: '#888',
    fontWeight: 'normal',
    fontSize: 15,
  },
  activeTabText: {
    color: '#222',
    fontWeight: 'bold',
  },
});

export default StickyFilterBar;