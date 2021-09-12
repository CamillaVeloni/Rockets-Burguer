import { firebaseConfig } from '../../config';
import Order from '../../models/order';

export const ADD_NEW_ORDER = 'addNewOrder';
export const SET_ORDERS = 'setOrders';

export const fetchOrders = () => {
  return async (dispatch) => {
    const resp = await fetch(`${firebaseConfig.databaseURL}/pedidos/u1.json`);

    if (!resp.ok) {
      throw new Error(
        'Algo deu errado na requisição, tente novamente mais tarde.'
      );
    }

    const realResponse = await resp.json();
    let arrayOrders = [];
    for (const key in realResponse) {
      arrayOrders.push(
        new Order(
          key,
          'u1',
          realResponse[key].cartItems,
          realResponse[key].totalAmount,
          new Date(realResponse[key].date)
        )
      );
    }

    dispatch({ type: SET_ORDERS, payload: arrayOrders });
  };
};

export const addNewOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();

    const resp = await fetch(`${firebaseConfig.databaseURL}/pedidos/u1.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString(),
      }),
    });

    if (!resp.ok) {
      throw new Error(
        'Não foi possível realizar o pedido, tente novamente mais tarde.'
      );
    }

    const realResponse = await resp.json();

    dispatch({
      type: ADD_NEW_ORDER,
      payload: {
        id: realResponse.name,
        userId: 'u1',
        items: cartItems,
        amount: totalAmount,
        date,
      },
    });
  };
};
