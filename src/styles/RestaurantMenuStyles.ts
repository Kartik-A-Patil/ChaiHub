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

});

export default RestaurantMenuStyles;
