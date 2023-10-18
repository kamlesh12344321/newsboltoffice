import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {useSelector} from 'react-redux';
import Orientation from 'react-native-orientation-locker';

// Local Imports
import AppNavigator from './navigation';
import {styles} from './themes';

const App = () => {
  const colors = useSelector(state => state.theme.theme);
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <View style={styles.flex}>
      <StatusBar
        barStyle={colors.dark === 'dark' ? 'light-content' : 'dark-content'}
      />
      <AppNavigator />
    </View>
  );
};

export default App;
