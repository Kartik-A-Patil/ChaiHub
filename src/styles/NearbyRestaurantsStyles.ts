import { StyleSheet } from 'react-native';

const NearbyRestaurantsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  
  // Header and sorting styles
  headerContainer: {
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  sortContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    gap: 6,
  },
  activeSortButton: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  activeSortButtonText: {
    color: '#ffffff',
  },
  sortIcon: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 5,
    marginBottom: 10,
    borderWidth: 0.4,
    borderColor: '#c9c9c9ff',
  },
  restaurantImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ratingIcon: {
    fontSize: 14,
    color: '#ffc107',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginRight: 4,
  },
  reviewText: {
    fontSize: 13,
    color: '#6c757d',
  },
  distanceContainer: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
  },
  openHours: {
    fontSize: 13,
    color: '#919191ff',
    fontWeight: '500',
  },

  filterRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: '#b1b1b1ff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  activeFilterBtn: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  filterBtnText: {
    color: '#050505ff',
    fontSize: 14,
  },
  activeFilterBtnText: {
    color: '#ffffff',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#7a7a7aff',
  },
  info: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222ff',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#5f5f5fff',
    marginBottom: 4,
  },
});

export default NearbyRestaurantsStyles;
