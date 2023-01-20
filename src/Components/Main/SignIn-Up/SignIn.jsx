import React from "react";
import BlockBtnSignUp from "./components/BlockBtnSignUp";
import FormSignIn from "./components/FormSignIn";
import HomeIndicator from "../../components/HomeIndicator/HomeIndicator"
import style from "./signin.module.scss"

const SignIn = () =>{
    return (
        <div className={style.wrapper_SignIn}>
            <div className={style.headerSignIn}>
                <h2>Hello,</h2>
                <p>Welcome Back!</p>
            </div>
            <FormSignIn />
            <BlockBtnSignUp />
            <HomeIndicator style = "black" />
        </div>
    )
}
export default SignIn;