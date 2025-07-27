import { StyleSheet } from 'react-native';

const NearbyRestaurantsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000ff',
    marginBottom: 24,
    marginTop: 16,
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
  filterBtnText: {
    color: '#050505ff',
    fontSize: 14,
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
  openHours: {
    fontSize: 14,
    color: '#423939ff',
  },
});

export default NearbyRestaurantsStyles;
