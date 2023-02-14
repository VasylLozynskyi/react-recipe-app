import { addFollower, deleteFollowingUser, updateUserParam } from "../../utills/functions";
import { ADD_CURRENT_USER_FOLLOW, DELETE_USER_FOLLOW, SET_STATE, UPDATE_ABOUT, UPDATE_AVATAR, UPDATE_COUNTRECIPES, UPDATE_NAME, UPDATE_POSITION, UPDATE_RATES, USER_LOGOUT } from "../Constants/constants";
import { signOut } from "firebase/auth";
import { auth } from "../../utills/firebase";

let initialState = {
    user: {},
    isAuth: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATE:
            return {
                ...state,
                user: {...state.user, ...action.user},
                isAuth: {...state.isAuth, isAuth: true}
            }
        case UPDATE_NAME:
            updateUserParam(state.user.idUrl, "name", action.text);
            return {
                ...state,
                user: {...state.user, name: action.text }                          
            }
        case UPDATE_ABOUT:
            updateUserParam(state.user.idUrl, "about", action.text);
            return {
                ...state,
                user: {...state.user, about: action.text }                          
            }
        case UPDATE_POSITION:
            updateUserParam(state.user.idUrl, "position", action.text);
            return {
                ...state,
                user: {...state.user, position: action.text }                          
            }
        case UPDATE_RATES:
            const obj={"key": action.rates};
            obj[action.id] = obj["key"]
            delete obj["key"]
            if (!state.user.rates) state.user.rates = {}
            let ar = Object.assign(state.user.rates, obj)
            return {
                ...state,
                user: {...state.user, rates: ar }                          
            }
        case UPDATE_COUNTRECIPES:
            updateUserParam(state.user.idUrl, "countRecipes", +state.user.countRecipes + 1)
            return {
                ...state,
                user: {...state.user, countRecipes: +state.user.countRecipes + 1 }                          
            } 
        case ADD_CURRENT_USER_FOLLOW:
                addFollower(action.idUser, "followers", state.user);
                let newUser = {...state.user};
                const objF={"key": action.idUser};
                objF[action.idUser] = objF["key"]
                delete objF["key"];
                let foll = {};
                let count = newUser.following;
                if (!newUser.usersFollowing) {
                    newUser.usersFollowing = {};
                    foll = Object.assign(newUser.usersFollowing, objF)
                    count = +count + 1
                } else {
                    let bool = false;
                    for (let el in newUser.usersFollowing){
                        if (el === action.idUser){
                            bool = true;
                            break;
                        }
                    }
                    if (bool) {
                        foll = newUser.usersFollowing;
                    } else {
                        foll = Object.assign(newUser.usersFollowing, objF)
                        count = +count + 1
                    }
                }
                return {
                    ...state,
                    user: {...state.user, 
                        usersFollowing: foll,
                        following: count}
                }
        case DELETE_USER_FOLLOW:
            deleteFollowingUser(action.userToDel, action.user)
            let deleteUser = {...state.user};
            delete deleteUser.usersFollowing[action.userToDel.idUrl];
            deleteUser.following = +deleteUser.following - 1;
            return {
                ...state,
                user: {...deleteUser}
            }
        case USER_LOGOUT:
            signOut(auth).then(() => {
                // Sign-out successful.
                console.log("Signed out successfully")
            }).catch((error) => {
            console.log(error);
            });
            return {...state,
                user: {...state.user, user: {}},
                isAuth: {...state.isAuth, isAuth: false}
            }
        case UPDATE_AVATAR:
            updateUserParam(state.user.idUrl, "iconAvatar", action.url);
            return {
                    ...state,
                    user: {...state.user, iconAvatar: action.url }                          
            }
        default:
            return {...state}
    }
}



export default userReducer;