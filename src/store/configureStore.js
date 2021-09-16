import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';

import CartReducer from './reducers/cart';
import MenuReducer from './reducers/menu';
import OrdersReducer from './reducers/order';
import AuthReducer from './reducers/auth';

// Só os states do carrinho (CartReducer) vão 'persistir' - serão armazenados no AsyncStorage
const cartPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const RootReducer = combineReducers({
  menu: MenuReducer,
  cart: persistReducer(cartPersistConfig, CartReducer),
  orders: OrdersReducer,
  auth: AuthReducer,
});

export const store = createStore(RootReducer, applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);
