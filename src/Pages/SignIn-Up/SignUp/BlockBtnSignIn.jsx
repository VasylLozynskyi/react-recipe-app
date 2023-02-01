import React from "react";
import style from "./signup.module.scss"
import {Link} from 'react-router-dom';

const BlockBtnSignUp = () => {
    return (
        <div className={style.blockBtnSignIn}>
            <p>Already a member?</p>
            <div className={style.absolPosition}>
                <Link className={style.btn_Signin} to='/react-recipe-app/login'>Sign in</Link>
            </div>
        </div>
    )
}
export default BlockBtnSignUp;



