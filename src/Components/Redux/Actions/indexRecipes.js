import { ADD_USER_RECIPE, FILTER_RECIPES, GET_USER_RECIPES, SET_STATE_RECIPES, UPDATE_RECIPE_IMG_TO_ALL, UPDATE_RECIPE_RATING, UPDATE_RECIPE_TITLE_TO_ALL, UPDATE_USER_RECIPES_NAMEUSER } from "../Constants/constants"

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

export const addUserRecipeAction = (newRecipe) => {
  return {
      type: ADD_USER_RECIPE,
      newRecipe,
  }
}

export const updateRecipeRatingAction = (rate, id) => {
  return {
    type: UPDATE_RECIPE_RATING,
    rate,
    id
  }
}
export const updateUserRecipesNameuser = (name, idUser) => {
  return{
    type: UPDATE_USER_RECIPES_NAMEUSER,
    name,
    idUser
  }
  
}
export const updateRecipeImgToAll = (id, url) => {
  return {
    type: UPDATE_RECIPE_IMG_TO_ALL,
    id,
    url
  }
}
export const updateRecipeTitleToAll = (id, title) => {
  return {
    type: UPDATE_RECIPE_TITLE_TO_ALL,
    id,
    title
  }
}