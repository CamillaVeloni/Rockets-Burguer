import { combineReducers } from 'redux';

import CartReducer from './reducers/cart';
import MenuReducer from './reducers/menu';
import OrdersReducer from './reducers/order';

const RootReducer = combineReducers({
    menu: MenuReducer,
    cart: CartReducer,
    orders: OrdersReducer
});

export default RootReducer;