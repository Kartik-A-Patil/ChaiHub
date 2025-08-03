import { StyleSheet } from 'react-native';

const ProductScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scroll: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 280,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    color: '#1a1a1a',
    letterSpacing: 0.5,
    fontFamily: 'Inter-Bold',
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 16,
    lineHeight: 24,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
    color: '#1a1a1a',
    paddingHorizontal: 20,
  },
  ingredients: {
    fontSize: 15,
    color: '#6c757d',
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 10,
  },
  optionBtn: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 5,
    backgroundColor: '#f8f9fa',
    marginRight: 4,
  },
  optionBtnActive: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  optionBtnText: {
    fontSize: 11,
    color: '#495057',
    fontWeight: '600',
  },
  optionBtnTextActive: {
    color: '#ffffff',
  },
  addToCartBtn: {
    // legacy style, not used for fixed button
  },
  addToCartBtnFixed: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 34,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  addToCartBtnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  quantityContainer: {
    marginTop: 20,
    marginBottom: 32,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  quantitySelectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityBtn: {
    width: 38,
    height: 38,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#e9ecef',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    marginHorizontal: 2,
  },
  quantityBtnText: {
    fontSize: 20,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  quantityValue: {
    fontSize: 20,
    fontWeight: '700',
    minWidth: 40,
    textAlign: 'center',
    color: '#1a1a1a',
  },
});

export default ProductScreenStyles;
