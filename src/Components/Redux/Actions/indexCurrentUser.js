import { SET_CURRENT_USER_STATE } from "../Constants/constants"

export const setCurrentUserAction = (user) => {
  return {
      type: SET_CURRENT_USER_STATE,
      user
  }
}