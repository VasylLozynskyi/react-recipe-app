import React from "react";
import style from "./forms.module.scss"

const BlockBtnSignUp = () => {
    return (
        <div className={style.blockBtnSignUp}>
            <p>Don’t have an account?</p>
            <div className={style.absolPosition}>
                <a className={style.btn_Signup} href='/SignUp'>Sign up</a>
            </div>
        </div>
    )
}
export default BlockBtnSignUp;



