import { ADD_USER_RECIPE, FILTER_RECIPES, GET_USER_RECIPES, SET_STATE_RECIPES, UPDATE_RECIPE_RATING } from "../Constants/constants";

let initialState = {
  all: [],
  userRecipes: [],
  filterRecipes: [],
};

const recipesReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case SET_STATE_RECIPES:
            return { ...state,
              all: [...action.recipes],
              filterRecipes: [...action.recipes],
            }
        case ADD_USER_RECIPE:
            return { ...state,
              all: [...state.all, action.newRecipe],
              userRecipes: [...state.userRecipes, action.newRecipe],
              filterRecipes: [...state.all, action.newRecipe],
            }
        case GET_USER_RECIPES:
            return { ...state,
              userRecipes: [...state.all.filter(el => el.idUser === +action.idUser)],
            }
          case UPDATE_RECIPE_RATING:
            let mass = [...state.all];
            let userMass = [...state.userRecipes];
            let objInUser = userMass.findIndex((obj => obj.id === action.id));
            if (objInUser != -1){
              userMass[objInUser].rating.rate = ((+userMass[objInUser].rating.rate * +userMass[objInUser].rating.count) + +action.rate) / (+userMass[objInUser].rating.count + 1);
              userMass[objInUser].rating.count = +userMass[objInUser].rating.count + 1;
            }
            let objIndex = mass.findIndex((obj => obj.id === action.id));
            mass[objIndex].rating.rate = ((+mass[objIndex].rating.rate * +mass[objIndex].rating.count) + +action.rate) / (+mass[objIndex].rating.count + 1);
            mass[objIndex].rating.count = +mass[objIndex].rating.count + 1;
            return { ...state,
              all: mass,
              filterRecipes: mass,
              userRecipes: userMass
            }
        case FILTER_RECIPES:
          if (action.trigger === "All") {
            return {...state,
              filterRecipes: [...state.all]
            }
          } else { 
            return {...state,
              filterRecipes: [...state.all.filter(el => el.category === action.trigger)]
            }
          }
        default:
            return {...state}
    }
}
export default recipesReducer;