import React from "react";
import BlockBtnSignUp from "./BlockBtnSignUp";
import {FormSignIn} from "./FormSignIn";
import HomeIndicator from "../../../Components/components/HomeIndicator/HomeIndicator"
import style from "./signin.module.scss"

export const SignIn = (props) =>{
    const handleUser = (user) => {
        props.handleUser(user);
    }
    return (
        <div className={style.wrapper_SignIn}>
            <div className={style.headerSignIn}>
                <h2>Hello,</h2>
                <p>Welcome Back!</p>
            </div>
            <FormSignIn handleUser={handleUser} />
            <BlockBtnSignUp />
            <HomeIndicator style = "black" />
        </div>
    )
}