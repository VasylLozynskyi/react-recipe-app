import {
  ADD_USER_FOLLOWER,
  GET_USER_FOLLOWINGS,
  SET_USERS_STATE,
} from "../Constants/constants";

let initialState = {
  users: [],
  userFollowings: [],
  userFollowers: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_STATE:
      return { ...state, users: [...action.users] };
    case GET_USER_FOLLOWINGS:
      let usersFoll = [];
      for (let user of state.users) {
        for (let id in action.userFollowings) {
          if (+action.userFollowings[id] === +user.idUrl) {
            usersFoll.push(user);
          }
        }
      }
      return { ...state, userFollowings: usersFoll };
    case ADD_USER_FOLLOWER:
      let tempUsers = [...state.users];
      const obj = { key: action.idUrl };
      obj[action.idUrl] = obj["key"];
      delete obj["key"];
      for (let user of tempUsers) {
        if (user.idUrl === action.idUser) {
          if (!user.usersFollowers) {
            user.usersFollowers = {};
            user.usersFollowers = Object.assign(user.usersFollowers, obj);
            user.followers = +user.followers + 1;
          } else {
            let temp = false;
            for (let id in user.usersFollowers) {
              if (id === action.idUrl) {
                temp = true;
                break;
              }
            }
            if (!temp) {
              user.followers = +user.followers + 1;
              user.usersFollowers = Object.assign(user.usersFollowers, obj);
            }
          }
        }
      }
      return { ...state, users: [...tempUsers] };
    default:
      return { ...state };
  }
};

export default usersReducer;
