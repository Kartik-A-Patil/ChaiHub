import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const ProfileSkeleton = () => {
  const shimmerOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const shimmerAnimation = () => {
      Animated.sequence([
        Animated.timing(shimmerOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerOpacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => shimmerAnimation());
    };

    shimmerAnimation();
  }, [shimmerOpacity]);

  const SkeletonBlock = ({ style }: { style: any }) => (
    <Animated.View
      style={[
        styles.skeletonBlock,
        style,
        { opacity: shimmerOpacity },
      ]}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SkeletonBlock style={styles.avatarSkeleton} />
        <SkeletonBlock style={styles.greetingSkeleton} />
        <SkeletonBlock style={styles.nameSkeleton} />
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <SkeletonBlock style={styles.statNumberSkeleton} />
            <SkeletonBlock style={styles.statLabelSkeleton} />
          </View>
          <View style={styles.statItem}>
            <SkeletonBlock style={styles.statNumberSkeleton} />
            <SkeletonBlock style={styles.statLabelSkeleton} />
          </View>
          <View style={styles.statItem}>
            <SkeletonBlock style={styles.statNumberSkeleton} />
            <SkeletonBlock style={styles.statLabelSkeleton} />
          </View>
        </View>
      </View>

      <SkeletonBlock style={styles.sectionTitleSkeleton} />
      
      {[1, 2, 3].map((index) => (
        <View key={index} style={styles.menuItemSkeleton}>
          <SkeletonBlock style={styles.menuIconSkeleton} />
          <SkeletonBlock style={styles.menuTextSkeleton} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 34,
  },
  skeletonBlock: {
    backgroundColor: '#E1E9EE',
    borderRadius: 8,
  },
  avatarSkeleton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
  },
  greetingSkeleton: {
    width: 120,
    height: 16,
    marginBottom: 4,
  },
  nameSkeleton: {
    width: 160,
    height: 22,
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumberSkeleton: {
    width: 30,
    height: 15,
    marginBottom: 4,
  },
  statLabelSkeleton: {
    width: 50,
    height: 12,
  },
  sectionTitleSkeleton: {
    width: 80,
    height: 16,
    marginLeft: 24,
    marginBottom: 8,
    marginTop: 16,
  },
  menuItemSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    marginHorizontal: 16,
  },
  menuIconSkeleton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 16,
  },
  menuTextSkeleton: {
    width: 120,
    height: 16,
  },
});

export default ProfileSkeleton;
