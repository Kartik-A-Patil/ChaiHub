import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  I18nManager,
} from 'react-native';
import { hapticActions } from '../utils/hapticUtils';

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
  const [containerWidth, setContainerWidth] = useState(0);
  const tabWidth = containerWidth / TABS.length;

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const activeIndex = TABS.findIndex(t => t.key === activeTab);
    Animated.spring(animation, {
      toValue: I18nManager.isRTL ? TABS.length - 1 - activeIndex : activeIndex,
      useNativeDriver: true,
    }).start();
  }, [activeTab, animation]);

  const translateX = animation.interpolate({
    inputRange: [0, TABS.length - 1],
    outputRange: [0, tabWidth * (TABS.length - 1)],
  });

  const onContainerLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer} onLayout={onContainerLayout}>
        {containerWidth > 0 && (
          <Animated.View
            style={[
              styles.activeTabPill,
              { width: tabWidth, transform: [{ translateX }] },
            ]}
          />
        )}
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => {
              hapticActions.tabSwitch();
              setActiveTab(tab.key);
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
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
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#e9ecef',
    borderRadius: 24,
    position: 'relative',
    height: 48,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabPill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#f5c242',
    borderRadius: 24,
  },
  tabText: {
    color: '#495057',
    fontWeight: '600',
    fontSize: 15,
  },
  activeTabText: {
    color: '#212529',
  },
});

export default StickyFilterBar;
