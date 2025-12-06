import React from 'react';
import { View } from 'react-native';
import HomeScreen from './screens/HomeScreen.jsx';
import GameScreen from './screens/GameScreen.jsx';

const App = () => {
  const [navigationState, setNavigationState] = React.useState({ screen: 'Home' });

  const navigate = (screenName) => {
    setNavigationState({ screen: screenName });
  };

  return (
    <View style={{ flex: 1 }}>
      {navigationState.screen === 'Home' && (
        <HomeScreen navigation={{ navigate }} />
      )}
      {navigationState.screen === 'Game' && (
        <GameScreen />
      )}
    </View>
  );
};

export default App;
