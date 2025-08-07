import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export const withTheme = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const { theme, isDarkMode } = useTheme();
    
    return (
      <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.background }]}>
        <Component {...props} theme={theme} isDarkMode={isDarkMode} />
      </View>
    );
  };
};

export const useThemedStyles = (createStyles: (theme: any) => any) => {
  const { theme } = useTheme();
  return React.useMemo(() => createStyles(theme), [theme]);
};
