import {combineReducers, createStore} from "redux";
import currentUserReducer from "../Reducers/currentUserReducer";
import recipesReducer from "../Reducers/RecipesReducer";
import userReducer from "../Reducers/usersReducer";


//state как обьект, параметры состояния, редакс создаст обьект состояния как был state, у него будут свойства и методы, которые мы передадим
let reducers = combineReducers({
    recipes: recipesReducer,
    currentUserPage: currentUserReducer,
    userPage: userReducer,
});

let store = createStore(reducers);

export default store;