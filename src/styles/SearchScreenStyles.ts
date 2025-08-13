import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const searchScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    height: 52,
    marginBottom: 24,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontFamily: 'System',
    letterSpacing: 0.3,
  },
  clearButton: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 100,
    paddingTop: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  itemImageWrapper: {
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
  },
  itemInfoContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF8C00',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 20,
    opacity: 0.6,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888888',
  },
});
