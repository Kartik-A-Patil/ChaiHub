import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeRoute = () => <HomeScreen />;
const SettingsRoute = () => <SettingsScreen />;

const HomeTabs = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'settings', title: 'Settings', icon: 'cog' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    settings: SettingsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default HomeTabs;
