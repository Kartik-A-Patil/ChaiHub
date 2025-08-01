import { StyleSheet } from 'react-native';

export const searchScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 20,
    marginHorizontal: 20,
    borderWidth: 0.4,
    borderColor: 'gray',
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#000000',
    marginLeft: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
    marginHorizontal: 20,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 16,
  },
  itemInfoContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888888',
  },
});
