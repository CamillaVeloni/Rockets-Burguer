import { combineReducers } from 'redux';

import CartReducer from './reducers/cart';
import MenuReducer from './reducers/menu';

const RootReducer = combineReducers({
    menu: MenuReducer,
    cart: CartReducer,
});

export default RootReducer;