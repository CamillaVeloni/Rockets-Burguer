export const CREATE_ITEM = 'createItem';
export const UPDATE_ITEM = 'updateItem';
export const DELETE_ITEM = 'deleteItem';

export const createItem = (title, imageUrl, description, price) => {
  return {
    type: CREATE_ITEM,
    payload: {
      title,
      imageUrl,
      description,
      price,
    },
  };
};

export const updateItem = (id, title, imageUrl, description) => {
  return {
    type: UPDATE_ITEM,
    payload: {
      id,
      title,
      imageUrl,
      description,
    },
  };
};

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id,
  };
};