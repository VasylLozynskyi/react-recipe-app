import { FILTER_RECIPES, GET_USER_RECIPES, SET_STATE_RECIPES } from "../Constants/constants"

export const setRecipesAction = (recipes) => {
  return {
      type: SET_STATE_RECIPES,
      recipes
  }
}

export const filterRecipesAction = (trigger) => {
  return {
      type: FILTER_RECIPES,
      trigger
  }
}

export const getUserRecipesAction = (idUser) => {
  return {
      type: GET_USER_RECIPES,
      idUser
  }
}