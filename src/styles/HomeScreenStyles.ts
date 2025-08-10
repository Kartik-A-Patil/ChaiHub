import { StyleSheet } from 'react-native';
import { globalStyles } from './globalStyles';

export const homeScreenStyles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    backgroundColor: '#fff',

  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 12,
    color: '#000000',
    marginHorizontal: 20,
  },
  featuredRow: {
    gap: 3,
    marginBottom: 5,
  },
  featuredItemContainer: {
    width: 250,
    flex: 1,
    overflow: 'hidden',
    marginRight: 0,
    marginLeft: 15,
  },
  featuredItem: {
    backgroundColor: '#ffffffff',
    borderRadius: 20,
  },
  featuredImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  featuredName: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    marginLeft: 4,
    marginBottom: 8,
    color: '#222',
  },
  offerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
    marginHorizontal: 20,
    borderColor: '#b4b4b4ff',
    borderWidth: 0.4,
    borderBottomWidth: 0.4,
    borderRadius: 12,
    padding: 5,
    paddingLeft: 12,
  },
  offerText: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  offerSubtitle: {
    fontSize: 14,
    color: '#8B857B',
    marginTop: 2,
  },
  offerImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  skeletonItem: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 12,
  },
});
('');
