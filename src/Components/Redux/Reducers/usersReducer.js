import { ADD_CURRENT_USER_FOLLOW, GET_USER_FOLLOWINGS, SET_USERS_STATE,} from "../Constants/constants";

let initialState = {
    users: [],
    userFollowings: [],
    userFollowers: [],
};

const usersReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case SET_USERS_STATE:
            return {...state, users: [...action.users]}
        case GET_USER_FOLLOWINGS:
            let usersFoll = [];
            for (let user of state.users){
                for (let id in action.userFollowings){
                    if (+action.userFollowings[id] === +user.idUrl){
                        usersFoll.push(user)
                    }
                }
            }
            
        return {...state, userFollowings: usersFoll}
        case ADD_CURRENT_USER_FOLLOW:
            // console.log(state.userFollowings);
            // let ar = [...state.users];
            // for (let el of ar){
            //     if (el.idUrl === action.idUser){
            //        el.userfollowers = 
            //     }
            // }
        //  let [following] = ar.filter(user => user.idUrl === action.idUser)
        //  console.log(following);
        //  +following.followers += 1;
        //   return {
        //     ...state, 
        //     users: [...state.users.filter(user => user.idUrl === action.idUser)[0].followers: action.idUrl]
        //   }
         // action.idUser  action.idUrl
           
         return {...state}
        default:
            return {...state}
    }
}

export default usersReducer;