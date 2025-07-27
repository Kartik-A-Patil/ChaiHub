import { StyleSheet } from 'react-native';
import { globalStyles } from './globalStyles';

export const homeScreenStyles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
  },
  cartIcon: {
    fontSize: 28,
    color: '#222',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3F1',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 28,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#8B857B',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 12,
    color: '#000000',
  },
  featuredRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 24,
  },
  featuredItemContainer: {
    width: 250,
    flex: 1,
    overflow: 'hidden',
    marginRight: 18,
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
    width: 80,
    height: 60,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  quickMenuTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#222',
  },
  quickMenuGrid: {
    flexDirection: 'column',
    gap: 0,
  },
  quickMenuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  quickMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 12,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    width: '48%', // 2 per row with margin
    marginRight: 0,
    marginLeft: 0,
    backgroundColor: '#fff',
  },
  quickMenuImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
    resizeMode: 'cover',
  },
  quickMenuName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
  },
});
