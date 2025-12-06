import React from 'react';
import { View } from 'react-native';
import HomeScreen from './screens/HomeScreen.jsx';
import GameScreen from './screens/GameScreen.jsx';

const App = () => {
  const [navigationState, setNavigationState] = React.useState({ screen: 'Home' });
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const navigate = (screenName, params = null) => {
    setNavigationState({ screen: screenName, params });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={{ flex: 1 }}>
      {navigationState.screen === 'Home' && (
        <HomeScreen navigation={{ navigate }} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      )}
      {navigationState.screen === 'Game' && (
        <GameScreen navigation={{ navigate }} route={{ params: navigationState.params }} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      )}
    </View>
  );
};

export default App;
