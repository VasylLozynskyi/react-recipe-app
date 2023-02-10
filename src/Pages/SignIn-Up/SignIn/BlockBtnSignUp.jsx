import React from "react";
import style from "./signin.module.scss"
import {Link} from 'react-router-dom';

const BlockBtnSignUp = () => {
    return (
        <div className={style.blockBtnSignUp}>
            <p>Don’t have an account?</p>
            <div className={style.absolPosition}>
                <Link className={style.btn_Signup} to='/react-recipe-app/SignUp'>Sign up</Link>
            </div>
        </div>
    )
}
export default BlockBtnSignUp;


