import MENU from '../../data/dummy-data';

const INITIAL_STATE = {
    availableMenu: MENU,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state;
    }
}