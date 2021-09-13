import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import RootReducer from './store/';
import NavigationContainer from './navigation/NavigationContainer';

const store = createStore(RootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  let [fontLoaded] = useFonts({
    'Mont-regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Mont-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Mont-italic': require('../assets/fonts/Montserrat-Italic.ttf'),
  });

  if (!fontLoaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
