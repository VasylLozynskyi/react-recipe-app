import { ADD_CURRENT_USER_FOLLOW, DELETE_USER_FOLLOW, SET_STATE, UPDATE_ABOUT, UPDATE_AVATAR, UPDATE_COUNTRECIPES, UPDATE_NAME, UPDATE_POSITION, UPDATE_RATES, USER_LOGOUT } from "../Constants/constants"

export const updateNameAction = (text) => {
  return {
      type: UPDATE_NAME,
      text
  }
}
export const updateNewAvatarAction = (url) => {
  return {
      type: UPDATE_AVATAR,
      url
  }
}
export const setUserAction = (user) => {
  return {
      type: SET_STATE,
      user
  }
}
export const updateAboutUserAction = (text) => {
  return {
      type: UPDATE_ABOUT,
      text
  }
}
export const updateCountRecipesUserAction = () => {
  return {
      type: UPDATE_COUNTRECIPES,
  }
}

export const updatePositionUserAction = (text) => {
  return {
      type: UPDATE_POSITION,
      text
  }
}
export const userLogout = () => {
  return {
      type: USER_LOGOUT,
  }
}
export const updateRatesUserAction = (rates, id) => {
  return {
    type: UPDATE_RATES,
    rates,
    id
  }
}

export const addUserFollowAction = (idUser) => {
  return {
    type: ADD_CURRENT_USER_FOLLOW,
    idUser,
  }
}

export const deleteUserFollowAction = (userToDel, user) => {
  return {
    type: DELETE_USER_FOLLOW,
    userToDel,
    user
  }
}