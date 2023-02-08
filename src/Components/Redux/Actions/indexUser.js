import { SET_STATE, UPDATE_ABOUT, UPDATE_AVATAR, UPDATE_NAME, UPDATE_POSITION, USER_LOGOUT } from "../Constants/constants"

export const updateNameAction = (text) => {
  return {
      type: UPDATE_NAME,
      text
  }
}
export const updateNewAvatarAction = (file) => {
  return {
      type: UPDATE_AVATAR,
      file: file
  }
}
export const setUserAction = (user) => {
  return {
      type: SET_STATE,
      user: user
  }
}
export const updateAboutUserAction = (text) => {
  return {
      type: UPDATE_ABOUT,
      text
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