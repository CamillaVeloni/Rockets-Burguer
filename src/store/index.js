import { combineReducers } from 'redux';

import CartReducer from './reducers/cart';
import MenuReducer from './reducers/menu';
import OrdersReducer from './reducers/order';
import AuthReducer from './reducers/auth';

const RootReducer = combineReducers({
    menu: MenuReducer,
    cart: CartReducer,
    orders: OrdersReducer,
    auth: AuthReducer
});

export default RootReducer;