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


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <ThemeProvider>
        <FirestoreProvider>
          <PaperProvider>
            <AppNavigator />
          </PaperProvider>
        </FirestoreProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
