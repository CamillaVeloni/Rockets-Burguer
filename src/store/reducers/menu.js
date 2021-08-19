import MENU from '../../data/dummy-data';
import Food from '../../models/Food';
import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../actions/menu';

const INITIAL_STATE = {
  availableMenu: MENU,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /*         case ADD_ITEM:
            const newItem = new Food(
                new Date().toString(),
                action.payload.title,
                action.payload.imageUrl,
                action.payload.description,
                action.payload.price,
            )

            return {
                ...state,
                availableMenu: state.availableMenu.concat(newItem),
            }
        case UPDATE_ITEM: 
            const indexItem = state.availableMenu.findIndex((item) => item.id === action.payload);

            const editedItem = new Food(
                action.payload,
                action.payload.title,
                action.payload.imageUrl,
                action.payload.description,
                state.availableMenu[indexItem].price
            )
            const updatedAvailableMenu = [...state.availableMenu];
            updatedAvailableMenu[action.payload] = editedItem;
            
            return {
                ...state,
                availableMenu: updatedAvailableMenu
            } */
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
