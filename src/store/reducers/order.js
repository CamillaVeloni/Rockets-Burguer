import Order from '../../models/order';
import { ADD_NEW_ORDER } from '../actions/order';

const INITIAL_STATE = {
  orders: [],
  userOrders: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_ORDER:
      const { userId, items, amount } = action.payload;
      const newOrder = new Order(
        new Date().toString(),
        userId,
        items,
        amount,
        new Date()
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder),
        userOrders: state.userOrders.concat(newOrder),
      };
    default:
      return state;
  }
};
