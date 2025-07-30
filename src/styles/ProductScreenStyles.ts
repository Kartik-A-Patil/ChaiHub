import { StyleSheet } from 'react-native';

const ProductScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  scroll: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 18,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#161412',
  },
  description: {
    fontSize: 16,
    color: '#81766a',
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 2,
    color: '#161412',
  },
  ingredients: {
    fontSize: 15,
    color: '#81766a',
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  optionBtn: {
    borderWidth: 0.5,
    borderColor: '#c5c5c5ff',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  optionBtnActive: {
    backgroundColor: '#000',
  },
  optionBtnText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  optionBtnTextActive: {
    color: '#fff',
  },
  addToCartBtn: {
    // legacy style, not used for fixed button
  },
  addToCartBtnFixed: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 24,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 16,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  addToCartBtnText: {
    color: '#161412',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  quantityContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  quantitySelectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  quantityBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#c5c5c5ff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 8,
  },
  quantityBtnText: {
    fontSize: 22,
    color: '#161412',
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 32,
    textAlign: 'center',
    color: '#161412',
  },
});

export default ProductScreenStyles;
