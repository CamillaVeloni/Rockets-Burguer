export const ADD_TO_CART = 'addToCart';
export const REMOVE_FROM_CART = 'removeFromCart';

export const addToCart = (food, totalItem, sum) => {
  return { type: ADD_TO_CART, payload: { food, totalItem, sum } };
};

export const removeFromCart = (id) => {
  return {type: REMOVE_FROM_CART, payload: id};
}