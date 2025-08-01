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
import 'react-native-gesture-handler';
import { store } from './store/store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <FirestoreProvider>
        <PaperProvider>
          <StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent />
          <AppNavigator />
        </PaperProvider>
      </FirestoreProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
