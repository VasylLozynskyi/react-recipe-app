import {combineReducers, createStore} from "redux";
import currentRecipeReducer from "../Reducers/currentRecipeReducer";
import currentUserReducer from "../Reducers/currentUserReducer";
import recipesReducer from "../Reducers/RecipesReducer";
import userReducer from "../Reducers/userReducer";
import usersReducer from "../Reducers/usersReducer";


//state как обьект, параметры состояния, редакс создаст обьект состояния как был state, у него будут свойства и методы, которые мы передадим
let reducers = combineReducers({
    recipes: recipesReducer,
    recipePage: currentRecipeReducer,
    currentUserPage: currentUserReducer,
    userPage: userReducer,
    users: usersReducer
});

let store = createStore(reducers);

export default store;