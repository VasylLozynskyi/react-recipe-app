import { ADD_REVIEW_RECIPE, SET_CURRENT_RECIPE_STATE, UPDATE_RECIPE_IMG, UPDATE_RECIPE_TITLE } from "../Constants/constants"

export const setCurrentRecipeAction = (recipe) => {
  return {
      type: SET_CURRENT_RECIPE_STATE,
      recipe
  }
}
export const  addReviewAction = (review) => {
  return {
      type: ADD_REVIEW_RECIPE,
      review
  }
}
export const updateRecipeImgAction = (url) => {
  return {
    type: UPDATE_RECIPE_IMG,
    url
  }
}
export const updateRecipeTitleAction = (title) => {
  return {
    type: UPDATE_RECIPE_TITLE,
    title
  }
}