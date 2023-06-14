import { SET_USER, SET_SUBSCRIBE } from '../actions/types';

const initialUserState = {
    user: null,
    subscribe: 0,
};

const rootReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case SET_SUBSCRIBE:
            return {
                ...state,
                subscribe: action.subscribe
            }
        default:
            return state;
    }
}

export default rootReducer;