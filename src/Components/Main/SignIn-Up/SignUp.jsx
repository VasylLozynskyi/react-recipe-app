import React from "react";
import HomeIndicator from "../../components/HomeIndicator/HomeIndicator";
import BlockBtnSignIn from "./components/BlockBtnSignIn";
import FormSignUp from "./components/FormSignUp";
import style from "./signup.module.scss"

const SignUp = () => {
    return(
        <div className={style.wrapperSignUp}>
            <div className={style.headerSignUp}>
                <h2>Create an account</h2>
                <p>Let’s help you set up your account, it won’t take long.</p>
            </div>
            <FormSignUp />
            <BlockBtnSignIn />
            <HomeIndicator style = "black" />
        </div>
    )
}
export default SignUp;