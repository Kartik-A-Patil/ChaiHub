import { StyleSheet } from 'react-native';

const RestaurantMenuStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 180, borderRadius: 12, marginBottom: 12 },
  
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  address: { fontSize: 16, color: '#666', marginBottom: 2 },
  details: { fontSize: 14, color: '#888', marginBottom: 2 },
  openHours: { fontSize: 14, color: '#4caf50', marginBottom: 10 },
  menuTitle: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  menuItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    overflow: 'hidden',
  },
  menuImage: { width: 80, height: 80, borderRadius: 8 },
  menuInfo: { flex: 1, padding: 10, justifyContent: 'center' },
  menuName: { fontSize: 18, fontWeight: 'bold' },
  menuDesc: { fontSize: 14, color: '#666', marginVertical: 2 },
  menuPrice: { fontSize: 16, color: '#333', fontWeight: 'bold' },
  bestSellingTitle: { fontSize: 18, marginLeft: 0, marginTop: 0 },
  bestSellingList: { marginVertical: 8, marginLeft: 0 },
  bestSellingItem: {
    width: 140,
    marginRight: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 8,
  },
  bestSellingImage: { width: '100%', height: 70, borderRadius: 8 },
  bestSellingName: { fontWeight: 'bold', fontSize: 15, marginTop: 4 },
  bestSellingDescription: { color: '#888', fontSize: 12 },
  addToCartButton: {
    backgroundColor: '#222',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
    alignSelf: 'center',
  },
  addToCartButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  emptyList: { color: '#888', textAlign: 'center', marginTop: 24 },
  snackbar: { backgroundColor: '#222' },
});

export default RestaurantMenuStyles;
