import React from 'react';
import {Provider} from 'react-redux';
import StackNavigation from './src/navigation/StackNavigation';
import store, {persister} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigation/RootNavigation';
import {StatusBar} from 'react-native';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <StatusBar backgroundColor="#005FAC" barStyle="light-content" />
          <NavigationContainer ref={navigationRef}>
            <StackNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
