import React from "react";
import HomeIndicator from "../../../Components/components/HomeIndicator/HomeIndicator";
import BlockBtnSignIn from "./BlockBtnSignIn";
import { FormSignUpContainer } from "./FormSignUpContainer";
import style from "./signup.module.scss"

export const SignUp = (props) => {
    const data = props.dataSite;
    const handleUser = (user) => {
        props.handleUser(user);
    }
    return(
        <div className={style.wrapperSignUp}>
            <div className={style.headerSignUp}>
                <h2>{data.title}</h2>
                <p>{data.subTitle}</p>
            </div>
            <FormSignUpContainer handleUser={handleUser} data={data.formSignUp}  />
            <BlockBtnSignIn data={data.blockbtn} />
            <HomeIndicator styleValue = "black" />
        </div>
    )
}