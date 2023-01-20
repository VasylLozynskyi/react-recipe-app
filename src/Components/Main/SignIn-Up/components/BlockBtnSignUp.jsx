import React from "react";
import style from "./forms.module.scss"
import {Link} from 'react-router-dom';

const BlockBtnSignUp = () => {
    return (
        <div className={style.blockBtnSignUp}>
            <p>Don’t have an account?</p>
            <div className={style.absolPosition}>
                <Link className={style.btn_Signup} to='/SignUp'>Sign up</Link>
            </div>
        </div>
    )
}
export default BlockBtnSignUp;



