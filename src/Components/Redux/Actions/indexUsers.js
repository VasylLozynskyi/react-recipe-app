import { ADD_CURRENT_USER_FOLLOW, GET_USER_FOLLOWINGS, SET_USERS_STATE } from "../Constants/constants"


export const setUsersAction = (users) => {
  return {
      type: SET_USERS_STATE,
      users
  }
}

export const addCurrentUserFollowAction = (idUser, idUrl) => {
  return {
    type: ADD_CURRENT_USER_FOLLOW,
    idUser,
    idUrl
  }
}
export const getFollowingUsers = (userFollowings) => {
  return {
    type: GET_USER_FOLLOWINGS,
    userFollowings
  }
}