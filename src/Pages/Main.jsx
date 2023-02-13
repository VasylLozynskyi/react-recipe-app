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

const Main = (props) => {
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
            <Route path="/" element={<FirstPage dataSite={props.dataSite.firstPage} />}  />
            <Route path="/login" element={<SignIn handleUser={handleUser} dataSite={props.dataSite.loginPage}/>}  />
            <Route path="/SignUp" element={<SignUp handleUser={handleUser} dataSite={props.dataSite.signUpPage}/>} />
            <Route path="/*" element={<HomeRouter user={user} dataSite={props.dataSite.home} />} />
            </Routes>
        </div>
    </div>
    )
}
export default Main;

