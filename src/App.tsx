/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';
import { FirestoreProvider } from './contexts/FirestoreContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import 'react-native-gesture-handler';
import { store } from './store/store';
import React from 'react';

const AppContent = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor="transparent" 
        translucent 
      />
      <AppNavigator />
    </>
  );
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <ThemeProvider>
        <FirestoreProvider>
          <PaperProvider>
            <AppContent />
          </PaperProvider>
        </FirestoreProvider>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
