export const ADD_NEW_ORDER = 'addNewOrder';

export const addNewOrder = (userId, cartItems, totalAmount) => {
  return {
    type: ADD_NEW_ORDER,
    payload: { userId, items: cartItems, amount: totalAmount },
  };
};
