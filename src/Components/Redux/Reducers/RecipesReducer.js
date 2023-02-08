import { ADD_RECIPE_TO_RECIPES, FILTER_RECIPES, GET_USER_RECIPES, SET_STATE_RECIPES } from "../Constants/constants";

let initialState = [];

const recipesReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case SET_STATE_RECIPES:
            state.recipes = action.recipes;
            state.all = action.recipes;
            state.userRecipes = [];
            return state;
        case ADD_RECIPE_TO_RECIPES:
           
           
            return state;
        case GET_USER_RECIPES:
            let copyStatet = [...state.all];
            state.userRecipes = copyStatet.filter(el => el.idUser === action.idUser)
            console.log(state.userRecipes);
            return state;
        case FILTER_RECIPES:
          if (action.trigger === "All") {
            state.recipes = state.all;
            return state
          } else { 
          let copyState = [...state.all];
           state.recipes = copyState.filter(el => el.category === action.trigger);
            return state
          }
        default:
            return state;
    }
}



export default recipesReducer;