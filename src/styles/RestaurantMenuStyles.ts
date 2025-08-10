import { StyleSheet } from 'react-native';

const RestaurantMenuStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  // Header
  headerImage: { width: '100%', height: 220 },
  headerDetailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 36,
    padding: 20,
    marginTop: -30, // Overlap the image    
    marginBottom: 16,
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#212529', marginBottom: 8 },
  address: { fontSize: 15, color: '#6c757d', marginBottom: 4 },
  details: { fontSize: 14, color: '#6c757d', marginBottom: 8 ,marginRight: 8},
  openHours: { fontSize: 14, color: '#28a745', fontWeight: 'bold' },

  // Section Title
  menuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    marginHorizontal: 20,
    color: '#343a40',
  },

  // Best Selling
  bestSellingList: { paddingLeft: 20, paddingVertical: 10 },
  bestSellingItem: {
    width: 210,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    height: 210,
  },
  bestSellingImage: { width: '100%', height: 130 },
  bestSellingInfo: { padding: 12 },
  bestSellingName: { fontWeight: 'bold', fontSize: 16, color: '#212529' },
  bestSellingDescription: { color: '#6c757d', fontSize: 12, marginTop: 4 },

  // Menu Item
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  menuImage: { width: 90, height: '100%', borderRadius: 12 },
  menuInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
    padding:10
  },
  menuName: { fontSize: 18, fontWeight: 'bold', color: '#212529' },
  menuDesc: { fontSize: 14, color: '#6c757d', marginVertical: 4, flexShrink: 1 },
  menuBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  menuPrice: { fontSize: 18, color: '#212529', fontWeight: 'bold' },

  // Add to Cart Button
  addToCartButton: {
    backgroundColor: '#f5c242',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButtonText: { color: '#212529', fontWeight: 'bold', fontSize: 14 },

  // Empty & Snackbar
  emptyList: { color: '#6c757d', textAlign: 'center', marginTop: 100 },
  snackbar: { backgroundColor: '#212529' },
});

export default RestaurantMenuStyles;
