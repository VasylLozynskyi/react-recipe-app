import { SET_CURRENT_USER_STATE } from "../Constants/constants";

let initialState = {
    user: {}
};

const currentUserReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case SET_CURRENT_USER_STATE:
            return {...state,
                user: action.user
            }
        default:
            return {...state}
    }
}

export default currentUserReducer;