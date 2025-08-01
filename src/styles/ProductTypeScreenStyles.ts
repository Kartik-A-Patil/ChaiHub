import { StyleSheet } from 'react-native';

export const productTypeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  restaurantImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  restaurantInfoContainer: {
    flex: 1,
  },
  restaurantNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  restaurantName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  restaurantDistance: {
    fontSize: 14,
    color: '#666666',
  },
  productItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 80,
    fontSize: 16,
    color: '#888888',
  },
});
