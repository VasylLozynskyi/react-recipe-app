import React from "react";
import FirstPage from "./FirstPage";
import style from "./main.module.scss"
import SignIn from "./SignIn-Up/SignIn";
import { Routes, Route} from "react-router-dom";
import SignUp from "./SignIn-Up/SignUp";
import { UserHomePage } from "../UserHomePage/UserHomePage";
import Users from "../../data/Users";
import {Recipes} from "../../data/Recipes";


const Main = () => {
    return (
    <div className={style.wrapper_body}>
        <div className={style.container}>
            <Routes>
            <Route path="/*" element={<FirstPage />}  />
            <Route path="/login" element={<SignIn />}  />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/User/:id" element={<UserHomePage users = {Users} data = {Recipes} />} />
            <Route path="*" element={<FirstPage />}  />
            </Routes>
        </div>
    </div>
    )
}
export default Main;

