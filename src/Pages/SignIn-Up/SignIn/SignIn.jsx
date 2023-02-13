import React from "react";
import BlockBtnSignUp from "./BlockBtnSignUp";
import HomeIndicator from "../../../Components/components/HomeIndicator/HomeIndicator"
import style from "./signin.module.scss"
import { FormSignInContainer } from "./FormsignInContainer";

export const SignIn = (props) =>{
    const data = props.dataSite;
    const handleUser = (user) => {
        props.handleUser(user);
    }
    return (
        <div className={style.wrapper_SignIn}>
            <div className={style.headerSignIn}>
                <h2>{data.title}</h2>
                <p>{data.subTitle}</p>
            </div>
            <FormSignInContainer handleUser={handleUser} data={data.formSignIn} />
            <BlockBtnSignUp data={data.blockbtn} />
            <HomeIndicator styleValue="black" />
        </div>
    )
}