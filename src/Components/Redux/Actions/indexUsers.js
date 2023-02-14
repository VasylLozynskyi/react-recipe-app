import { ADD_USER_FOLLOWER, GET_USER_FOLLOWINGS, SET_USERS_STATE } from "../Constants/constants"


export const setUsersAction = (users) => {
  return {
      type: SET_USERS_STATE,
      users
  }
}

export const getFollowingUsers = (userFollowings) => {
  return {
    type: GET_USER_FOLLOWINGS,
    userFollowings
  }
}

export const addUserFollower = (idUser, idUrl) => {
  return {
    type: ADD_USER_FOLLOWER,
    idUser,
    idUrl
  }
}