import { StyleSheet } from 'react-native';

export const snackbarStyles = StyleSheet.create({
  base: {
    backgroundColor: '#212529',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  success: {
    borderLeftWidth: 4,
    borderLeftColor: '#2ed573',
  },
  error: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff4757',
  },
  warning: {
    borderLeftWidth: 4,
    borderLeftColor: '#ffa502',
  },
  info: {
    borderLeftWidth: 4,
    borderLeftColor: '#3742fa',
  },
});

export const snackbarTextStyle = {
  color: '#fff',
  fontSize: 14,
  fontWeight: '500' as const,
};

export const snackbarActionStyle = {
  color: '#f5c242',
  fontWeight: '600' as const,
};

export const getSnackbarStyle = (type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
  return [snackbarStyles.base, snackbarStyles[type]];
};
