import { SET_CURRENT_USER_STATE } from "../Constants/constants";

let initialState = {};

const currentUserReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case SET_CURRENT_USER_STATE:
            state = action.user;
            return state;
        default:
            return state;
    }
}

export default currentUserReducer;