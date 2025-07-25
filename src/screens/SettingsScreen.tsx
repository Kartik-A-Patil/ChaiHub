import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, List } from 'react-native-paper';

const SettingsScreen = () => {
  const [isDark, setIsDark] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Settings</Text>
      <List.Item
        title="Dark Mode"
        right={() => (
          <Switch value={isDark} onValueChange={setIsDark} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 16,
  },
});

export default SettingsScreen;
