import { combineReducers } from 'redux';
import MenuReducer from './reducers/menu';

const RootReducer = combineReducers({
    menu: MenuReducer,
});

export default RootReducer;