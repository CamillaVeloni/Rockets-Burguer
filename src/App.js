import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import { store, persistor } from './store/configureStore';
import NavigationContainer from './navigation/NavigationContainer';

export default function App() {
  let [fontLoaded] = useFonts({
    'Mont-regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Mont-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Mont-italic': require('../assets/fonts/Montserrat-Italic.ttf'),
  });

  if (!fontLoaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer />
      </PersistGate>
    </Provider>
  );
}
