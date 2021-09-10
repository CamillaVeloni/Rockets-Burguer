import { firebaseConfig } from '../../config';
import Food from '../../models/Food';

export const FETCHING_MENU = 'fetchingMenu';
export const CREATE_ITEM = 'createItem';
export const UPDATE_ITEM = 'updateItem';
export const DELETE_ITEM = 'deleteItem';

export const fetchMenu = () => {
  return async (dispatch) => {
    const resp = await fetch(`${firebaseConfig.databaseURL}/menu.json`);
    
    if (!resp.ok) {
      throw new Error(
        'Algo deu errado no carregamento do cardápio, tente outra vez mais tarde.'
      );
    }

    const realResponse = await resp.json();

    // array transformation from object
    let arrayData = [];
    for (const key in realResponse) {
      arrayData.push(
        new Food(
          key,
          realResponse[key].title,
          realResponse[key].imageUrl,
          realResponse[key].description,
          realResponse[key].price
        )
      );
    }
    dispatch({ type: FETCHING_MENU, payload: arrayData });
  };
};

export const createItem = (title, imageUrl, description, price) => {
  return async (dispatch) => {
    const resp = await fetch(`${firebaseConfig.databaseURL}/menu.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        imageUrl,
        description,
        price,
      }),
    });

    if (!resp.ok) {
      throw new Error(
        'Não foi possível criar o item, tente outra vez mais tarde.'
      );
    }

    const realResponse = await resp.json();

    dispatch({
      type: CREATE_ITEM,
      payload: {
        id: realResponse.name,
        title,
        imageUrl,
        description,
        price,
      },
    });
  };
};

export const updateItem = (id, title, imageUrl, description) => {
  return async (dispatch) => {
    const resp = await fetch(`${firebaseConfig.databaseURL}/menu/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        imageUrl,
        description,
      }),
    });

    // obs: https://firebase.google.com/docs/reference/rest/database#section-error-conditions
    // !!!REFINAR!!!
    if (!resp.ok) {
      //const realErrorResponse = await resp.json();
      //console.log(realErrorResponse);
      throw new Error(
        'Não foi possível fazer a edição, tente outra vez mais tarde.'
      );
    }

    dispatch({
      type: UPDATE_ITEM,
      payload: {
        id,
        title,
        imageUrl,
        description,
      },
    });
  };
};

export const deleteItem = (id) => {
  return async (dispatch) => {
    const resp = await fetch(`${firebaseConfig.databaseURL}/menu/${id}.json`, {
      method: 'DELETE',
    });

    if (!resp.ok) {
      throw new Error('Não foi possível deletar, tente outra vez mais tarde.');
    }

    dispatch({
      type: DELETE_ITEM,
      payload: id,
    });
  };
};
