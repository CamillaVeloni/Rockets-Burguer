import CartItem from '../../models/cart-item';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { DELETE_ITEM } from '../actions/menu';
import { ADD_NEW_ORDER } from '../actions/order';

const INITIAL_STATE = {
    items: {},
    totalAmount: 0,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_TO_CART: 
            const { food, totalItem, sum } = action.payload;

            const itemExisted = !!state.items[food.id]; // pegando boolean se item já existe dentro do state
            newTotalAmount = itemExisted ? state.totalAmount - state.items[food.id].sum : state.totalAmount;
            // Se existir então: pega o preço total do carrinho e diminui com o item lá dentro, se não tiver só colocar o total
            // carrinho

            const newItemCart = new CartItem(
                food.title,
                food.imageUrl,
                food.price,
                totalItem,
                sum
            );
            return {
                ...state,
                items: { ...state.items, [food.id]: newItemCart},
                totalAmount: newTotalAmount + sum // ou o preço total do carrinho ou o preço total menos o item - diminuindo porque
                // um novo preço final do item veio
            };
        case REMOVE_FROM_CART: 
            const updatedCart = { ...state.items };
            const sumSelectedItem = updatedCart[action.payload].sum;
            delete updatedCart[action.payload];

            return {
                ...state,
                items: updatedCart,
                totalAmount: Math.abs(state.totalAmount - sumSelectedItem),
            }
        case ADD_NEW_ORDER: 
            return INITIAL_STATE;
        case DELETE_ITEM:
            if(!state.items[action.payload]){ // se não existir no carrinho
                return state;
            }
            const removedItemMenu = { ...state.items };
            const sumItem = removedItemMenu[action.payload].sum;
            delete removedItemMenu[action.payload];

            return {
                ...state,
                items: removedItemMenu,
                totalAmount: state.totalAmount - sumItem
            }
        default:
            return state;
    }
}