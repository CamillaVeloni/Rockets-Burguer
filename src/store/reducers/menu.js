import MENU from '../../data/dummy-data';
import Food from '../../models/Food';
import { FETCHING_MENU, CREATE_ITEM, DELETE_ITEM, UPDATE_ITEM } from '../actions/menu';

const INITIAL_STATE = {
  availableMenu: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_MENU: 
      return {
        ...state,
        availableMenu: action.payload,
      }
    case CREATE_ITEM:
      const { id, title, imageUrl, description, price } = action.payload;
      const newItem = new Food(
        id,
        title,
        imageUrl,
        description,
        price
      );
      return {
        ...state,
        availableMenu: state.availableMenu.concat(newItem),
      };
    case UPDATE_ITEM:
      const updatedMenu = [...state.availableMenu];
      const indexItem = updatedMenu.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedItem = new Food(
        action.payload.id,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        updatedMenu[indexItem].price,
      );
      updatedMenu[indexItem] = updatedItem;

      return {
        ...state,
        availableMenu: updatedMenu,
      }
    case DELETE_ITEM:
      return {
        ...state,
        availableMenu: state.availableMenu.filter(
          (item) => item.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
