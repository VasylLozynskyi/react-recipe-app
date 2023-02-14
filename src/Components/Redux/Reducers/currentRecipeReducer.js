import { saveRecipeRespond, updateRecipeParam } from "../../utills/functions";
import { ADD_REVIEW_RECIPE, SET_CURRENT_RECIPE_STATE, UPDATE_RECIPE_IMG, UPDATE_RECIPE_TITLE } from "../Constants/constants";

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
        case UPDATE_RECIPE_IMG:
            updateRecipeParam(state.recipe, "img", action.url)
            return {...state,
                recipe: {...state.recipe, img: action.url}
            }
        case UPDATE_RECIPE_TITLE:
            updateRecipeParam(state.recipe, "title", action.title)
            return {...state,
                recipe: {...state.recipe, title: action.title}
            }
        default:
            return {...state}
    }
}

export default currentRecipeReducer;

