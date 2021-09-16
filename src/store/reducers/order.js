import Order from '../../models/order';
import { ADD_NEW_ORDER, SET_ORDERS } from '../actions/order';

const INITIAL_STATE = {
  userOrders: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        userOrders: action.payload,
      };

    case ADD_NEW_ORDER:
      const { id, userId, items, amount, date } = action.payload;
      const newOrder = new Order(id, userId, items, amount, date);

      return {
        ...state,
        userOrders: state.userOrders.concat(newOrder),
      };
    default:
      return state;
  }
};
