import React, { useEffect, useState } from "react";
import style from "./main.module.scss"

import { Routes, Route} from "react-router-dom";
import FirstPage from "./FirstPage/FirstPage";
import {SignIn} from "./SignIn-Up/SignIn/SignIn";
import {SignUp} from "./SignIn-Up/SignUp/SignUp";
import { HomeRouter } from "./HomeRouter/HomeRouter";
import { getData } from "../Components/utills/api";
import store from "../Components/Redux/store/store";
import { setRecipesAction } from "../Components/Redux/Actions/indexRecipes";
import { setUsersAction } from "../Components/Redux/Actions/indexUsers";



const Main = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        getData("recipes").then(data => {
            store.dispatch(setRecipesAction(data))
        })
        getData("users").then(data => {
            store.dispatch(setUsersAction(data))
        })
    }, [])

    const handleUser = (user) => {
        setUser(user)
    }
    return (
    <div className={style.wrapper_body}>
        <div className={style.container}>
            <Routes>
            <Route path="/react-recipe-app" element={<FirstPage />}  />
            <Route path="/react-recipe-app/login" element={<SignIn handleUser={handleUser} />}  />
            <Route path="/react-recipe-app/SignUp" element={<SignUp handleUser={handleUser} />} />
            <Route path="/react-recipe-app/*" element={<HomeRouter user={user} />} />
            </Routes>
        </div>
    </div>
    )
}
export default Main;

