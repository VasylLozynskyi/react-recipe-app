import { ADD_REVIEW_RECIPE, SET_CURRENT_RECIPE_STATE } from "../Constants/constants"

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