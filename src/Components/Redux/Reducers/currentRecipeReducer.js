import { saveRecipeRespond } from "../../utills/functions";
import { ADD_REVIEW_RECIPE, SET_CURRENT_RECIPE_STATE } from "../Constants/constants";

let initialState = {
    recipe: {}
};

const currentRecipeReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case SET_CURRENT_RECIPE_STATE:
            return {...state,
                recipe: action.recipe
            }
        case ADD_REVIEW_RECIPE:
            saveRecipeRespond(state.recipe, action.review);
            let rec = {...state.recipe};
            if(!rec.responds) rec.responds = [];
            rec.responds.push(action.review)
            rec.reviews = +rec.reviews + 1;
            return {...state,
                 recipe: rec,   
            }
        default:
            return {...state}
    }
}

export default currentRecipeReducer;

