import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import RootReducer from './store/';
import RootNavigation from './navigation/RootNavigation';

const store = createStore(RootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}