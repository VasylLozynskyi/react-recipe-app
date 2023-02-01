import React from "react";
import HomeIndicator from "../../../Components/components/HomeIndicator/HomeIndicator";
import BlockBtnSignIn from "./BlockBtnSignIn";
import {FormSignUp} from "./FormSignUp";
import style from "./signup.module.scss"

export const SignUp = (props) => {

    const handleUser = (user) => {
        props.handleUser(user);
    }
    return(
        <div className={style.wrapperSignUp}>
            <div className={style.headerSignUp}>
                <h2>Create an account</h2>
                <p>Let’s help you set up your account, it won’t take long.</p>
            </div>
            <FormSignUp handleUser={handleUser} />
            <BlockBtnSignIn />
            <HomeIndicator style = "black" />
        </div>
    )
}