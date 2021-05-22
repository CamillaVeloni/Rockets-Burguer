import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import RootReducer from './store/';
import RootNavigation from './navigation/RootNavigation';

const store = createStore(RootReducer);

export default function App() {
  let [fontLoaded] = useFonts({
    'Mont-regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Mont-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Mont-italic': require('../assets/fonts/Montserrat-Italic.ttf'),
  });

  if (!fontLoaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
