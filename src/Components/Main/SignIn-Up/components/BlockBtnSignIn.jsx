import React from "react";
import style from "./formsignup.module.scss"

const BlockBtnSignUp = () => {
    return (
        <div className={style.blockBtnSignIn}>
            <p>Already a member?</p>
            <div className={style.absolPosition}>
                <a className={style.btn_Signin} href='/login'>Sign in</a>
            </div>
        </div>
    )
}
export default BlockBtnSignUp;



