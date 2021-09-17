import { LOGOUT, STORING_USER } from "../actions/auth";

const INITIAL_STATE = {
    token: null,
    userId: null,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case STORING_USER: 
            return {
                token: action.token,
                userId: action.userId,
            }
        case LOGOUT:
            return INITIAL_STATE;
        default:    
            return state;
    }
}