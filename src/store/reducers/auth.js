import { STORING_USER } from "../actions/auth";

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
        default:    
            return state;
    }
}