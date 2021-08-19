export const ADD_ITEM = 'addItem';
export const DELETE_ITEM = 'deleteItem';
export const UPDATE_ITEM = 'editItem';

export const addItem = (title, imageUrl, description, price) => {
  return {
    type: ADD_ITEM,
    payload: {
      title,
      imageUrl,
      description,
      price,
    },
  };
};

export const editItem = () => {
    return {
        type: UPDATE_ITEM,
        payload: {
            id,
            title,
            imageUrl,
            description,
        }
    }
}

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id
  }
}